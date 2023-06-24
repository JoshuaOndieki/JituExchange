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

while getopts ":dpt-" opt; do
  case $opt in
    d )
      ENV="dev"
      ;;
    p )
      ENV="prod"
      ;;
    t )
      ENV="test"
      ;;
    i )
      INIT=true
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done

shift $((OPTIND-1))

if [ "$ENV" == "prod" ]; then
  initFile="./init.prod.sql"
  DB_NAME=${DB_NAME:-production}
elif [ "$ENV" == "test" ]; then
  initFile="./init.test.sql"
  DB_NAME=${DB_NAME:-testing}
else
  initFile="./init.dev.sql"
  DB_NAME=${DB_NAME:-development}
fi

# Enable nullglob option to expand patterns to empty string if no matches found
shopt -s nullglob

if [ "$1" == "patch" ]; then
    for file in ./procedures/**/*.sql; do \
        sqlcmd -S "$DB_SERVER" -U "$DB_USER" -P "$DB_PWD" -d "$DB_NAME" -i "$file"; \
    done
else
    if [INIT] then;
      # in Azure creating db with current init sqls creates a database with default 'wrong' configs. only using the i flag for local mssql server.
      sqlcmd -S "$DB_SERVER" -U "$DB_USER" -P "$DB_PWD" -i "$initFile" && \
    fi
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
fi

# Disable nullglob option to restore the default behavior
shopt -u nullglob