CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    firstname VARCHAR(100) NULL,
    lastname VARCHAR(100) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(30) NOT NULL UNIQUE,
    location VARCHAR(255) NULL,
    joinedDate datetimeoffset NOT NULL DEFAULT SWITCHOFFSET(GETDATE(), dbo.GetLocalTimeZoneOffset()),
    website VARCHAR(255) NULL,
    github VARCHAR(255) NULL,
    avatar VARCHAR(2000) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    password VARCHAR(255) NOT NULL,
    isDeleted BIT DEFAULT 0
);