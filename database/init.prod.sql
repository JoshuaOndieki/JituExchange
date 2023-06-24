IF EXISTS (SELECT name FROM master.sys.databases WHERE name = 'production')
    BEGIN
        ALTER DATABASE production SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
        DROP DATABASE production;
    END

CREATE DATABASE production;
