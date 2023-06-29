CREATE OR ALTER PROCEDURE addQuestionTag(
    @id VARCHAR(255),
    @tagName VARCHAR(255),
    @questionID VARCHAR(255)
)
AS
BEGIN
    INSERT INTO questionTags (id, tagName, questionID)
    VALUES (@id, @tagName, @questionID)
END