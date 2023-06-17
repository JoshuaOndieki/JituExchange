FROM mcr.microsoft.com/mssql/server:2022-latest

ARG DB_PASSWORD

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=${DB_PASSWORD:-MyStrong@Passw0rd}

EXPOSE 1433

# Copy the SQL scripts
COPY init.sql /init.sql
COPY functions /functions
COPY tables/drop.sql /tables/drop.sql
COPY tables/create.sql /tables/create.sql
COPY procedures /procedures
COPY triggers /triggers
COPY dummy /dummy

# Health check command to verify SQL Server readiness
HEALTHCHECK --interval=10s --timeout=5s CMD /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -Q "SELECT 1" || exit 1


# Run the SQL scripts during container initialization
CMD /bin/bash -c '/opt/mssql/bin/sqlservr && \
    /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d JituExchange -i /init.sql && \
    /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d JituExchange -i /tables/drop.sql && \
    for file in /functions/*.sql; do \
    /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d JituExchange -i "$file"; \
    done && \
    /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d JituExchange -i /tables/create.sql && \
    for file in /procedures/**/*.sql; do \
        /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d JituExchange -i "$file"; \
    done && \
    for file in /triggers/*.sql; do \
        /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d JituExchange -i "$file"; \
    done && \
    for file in /dummy/*.sql; do \
        /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d JituExchange -i "$file"; \
    done && \
    tail -f /dev/null'





