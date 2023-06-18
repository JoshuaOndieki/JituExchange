CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    firstname VARCHAR(100) NULL,
    lastname VARCHAR(100) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(30) NOT NULL UNIQUE,
    location VARCHAR(255) NULL,
    joinedDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    website VARCHAR(255) NULL,
    github VARCHAR(255) NULL,
    avatar VARCHAR(2000) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    password VARCHAR(255) NOT NULL,
    isDeleted BIT DEFAULT 0
);

CREATE TABLE questions(
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    summary VARCHAR(255) NOT NULL,
    details TEXT NOT NULL,
    askedBy VARCHAR(255) FOREIGN KEY REFERENCES users(id),
    askedDate datetimeoffset NOT NULL DEFAULT SWITCHOFFSET(GETDATE(), dbo.GetLocalTimeZoneOffset()),
    editedDate datetimeoffset NULL
);

CREATE TABLE questionComments(
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    commentFor VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES questions(id),
    details VARCHAR(255) NOT NULL,
    commentBy VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES users(id),
    editedDate datetimeoffset NULL,
    commentedDate datetimeoffset NOT NULL DEFAULT SWITCHOFFSET(GETDATE(), dbo.GetLocalTimeZoneOffset())
);

CREATE TABLE answers(
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    details NVARCHAR(255) NOT NULL,
    answeredDate datetimeoffset NOT NULL DEFAULT SWITCHOFFSET(GETDATE(), dbo.GetLocalTimeZoneOffset()),
    editedDate datetimeoffset NULL,
    answeredBy VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES users(id),
    answerFor VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES questions(id)
);

CREATE TABLE answerComments(
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    commentFor VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES answers(id),
    details VARCHAR(255) NOT NULL,
    commentBy VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES users(id),
    editedDate datetimeoffset NULL,
    commentedDate datetimeoffset NOT NULL DEFAULT SWITCHOFFSET(GETDATE(), dbo.GetLocalTimeZoneOffset())
);

CREATE TABLE tags(
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    addedBy VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES users(id),
    addedDate datetimeoffset NOT NULL DEFAULT SWITCHOFFSET(GETDATE(), dbo.GetLocalTimeZoneOffset()),
    description VARCHAR(255) NULL
);

CREATE TABLE questionTags(
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    tagName VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES tags(name),
    questionID VARCHAR(255) FOREIGN KEY REFERENCES questions(id)
);

CREATE TABLE badges(
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE userBadges(
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    userID VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES users(id),
    badgeID VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES badges(id),
    earnedDate datetimeoffset NOT NULL DEFAULT SWITCHOFFSET(GETDATE(), dbo.GetLocalTimeZoneOffset())
);