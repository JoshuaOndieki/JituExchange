IF EXISTS (SELECT name FROM master.sys.databases WHERE name = 'JituExchange')
    BEGIN
        ALTER DATABASE JituExchange SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
        DROP DATABASE JituExchange;
    END

CREATE DATABASE JituExchange;
