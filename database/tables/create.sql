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
    id VARCHAR(255) PRIMARY KEY,
    summary VARCHAR(255) NOT NULL,
    details TEXT NOT NULL,
    askedBy VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE,
    askedDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    editedDate datetimeoffset NULL,
    views INT DEFAULT 0
);

CREATE TABLE questionComments(
    id VARCHAR(255) PRIMARY KEY,
    commentFor VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES questions(id) ON DELETE CASCADE,
    details VARCHAR(255) NOT NULL,
    commentBy VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES users(id),
    editedDate datetimeoffset NULL,
    commentedDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET()
);

CREATE TABLE answers(
    id VARCHAR(255) PRIMARY KEY,
    details TEXT NOT NULL,
    answeredDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    editedDate datetimeoffset NULL,
    answeredBy VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES users(id),
    answerFor VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES questions(id) ON DELETE CASCADE,
    accepted BIT DEFAULT 0
);

CREATE TABLE answerComments(
    id VARCHAR(255) PRIMARY KEY,
    commentFor VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES answers(id) ON DELETE CASCADE,
    details VARCHAR(255) NOT NULL,
    commentBy VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES users(id),
    editedDate datetimeoffset NULL,
    commentedDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET()
);

CREATE TABLE tags(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    addedBy VARCHAR(255) FOREIGN KEY REFERENCES users(id) ON DELETE SET NULL,
    addedDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    description VARCHAR(255) NULL
);

CREATE TABLE questionTags(
    id VARCHAR(255) PRIMARY KEY,
    tagName VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES tags(name) ON DELETE CASCADE,
    questionID VARCHAR(255) FOREIGN KEY REFERENCES questions(id) ON DELETE CASCADE
);

CREATE TABLE questionVotes(
    id VARCHAR(255) PRIMARY KEY,
    voter VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES users(id),
    voteFor VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES questions(id) ON DELETE CASCADE,
    positive BIT NOT NULL
);

CREATE TABLE answerVotes(
    id VARCHAR(255) PRIMARY KEY,
    voter VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES users(id),
    voteFor VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES answers(id) ON DELETE CASCADE,
    positive BIT NOT NULL
);

CREATE TABLE badges(
    id VARCHAR(255) PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    addedBy VARCHAR(255) FOREIGN KEY REFERENCES users(id) ON DELETE SET NULL,
    addedDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET()
);

CREATE TABLE userBadges(
    id VARCHAR(255) PRIMARY KEY,
    userID VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE,
    badgeID VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES badges(id) ON DELETE CASCADE,
    earnedDate datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET()
);

CREATE TABLE welcomeEmails(
    id INT IDENTITY(1,1) PRIMARY KEY,
    targetUser VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE,
    targetEmail VARCHAR(255) NOT NULL,
    sentDate datetimeoffset NULL
);

CREATE TABLE passwordResetEmails(
    id INT IDENTITY(1,1) PRIMARY KEY,
    targetUser VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE,
    targetEmail VARCHAR(255) NOT NULL,
    sentDate datetimeoffset NULL
);

CREATE TABLE acceptedAnswerEmails(
    id INT IDENTITY(1,1) PRIMARY KEY,
    targetUser VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE,
    targetEmail VARCHAR(255) NOT NULL,
    answerID VARCHAR(255) NOT NULL,
    sentDate datetimeoffset NULL
);