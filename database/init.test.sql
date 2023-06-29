IF EXISTS (SELECT name FROM master.sys.databases WHERE name = 'testing')
    BEGIN
        ALTER DATABASE testing SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
        DROP DATABASE testing;
    END

CREATE DATABASE testing;
