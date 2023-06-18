#!/bin/bash

load_env() {
    while IFS= read -r line || [[ -n "$line" ]]; do
        # Skip comment lines
        if [[ "$line" =~ ^\s*# ]]; then
            continue
        fi

        if [[ "$line" =~ ^[[:alnum:]_]+= ]]; then
            variable="${line%%=*}"    # Extract the variable name
            value="${line#*=}"        # Extract the variable value

            # Trim leading whitespace
            value="${value#"${value%%[![:space:]]*}"}"

            # Trim trailing whitespace
            value="${value%"${value##*[![:space:]]}"}"

            export "$variable"="$value"  # Export the trimmed variable
        fi
    done < "$1"
}

load_env ".env"

# Enable nullglob option to expand patterns to empty string if no matches found
shopt -s nullglob

sqlcmd -S "$DB_SERVER" -U "$DB_USER" -P "$DB_PWD" -i ./init.sql && \
sqlcmd -S "$DB_SERVER" -U "$DB_USER" -P "$DB_PWD" -d "$DB_NAME" -i ./tables/drop.sql && \
for file in ./functions/*.sql; do \
sqlcmd -S "$DB_SERVER" -U "$DB_USER" -P "$DB_PWD" -d "$DB_NAME" -i "$file"; \
done && \
sqlcmd -S "$DB_SERVER" -U "$DB_USER" -P "$DB_PWD" -d "$DB_NAME" -i ./tables/create.sql && \
for file in ./procedures/**/*.sql; do \
    sqlcmd -S "$DB_SERVER" -U "$DB_USER" -P "$DB_PWD" -d "$DB_NAME" -i "$file"; \
done && \
for file in ./triggers/*.sql; do \
    sqlcmd -S "$DB_SERVER" -U "$DB_USER" -P "$DB_PWD" -d "$DB_NAME" -i "$file"; \
done && \
for file in ./dummy/*.sql; do \
    sqlcmd -S "$DB_SERVER" -U "$DB_USER" -P "$DB_PWD" -d "$DB_NAME" -i "$file"; \
done

# Disable nullglob option to restore the default behavior
shopt -u nullglob