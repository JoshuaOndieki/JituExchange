IF EXISTS (SELECT name FROM master.sys.databases WHERE name = 'development')
    BEGIN
        ALTER DATABASE development SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
        DROP DATABASE development;
    END

CREATE DATABASE development;
