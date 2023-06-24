CREATE OR ALTER PROCEDURE postQuestion(
    @id VARCHAR(255),
    @summary VARCHAR(255),
    @details NVARCHAR(MAX),
    @askedBy VARCHAR(255)
)
AS
BEGIN
    INSERT INTO questions (id, summary, details, askedBy)
    VALUES (@id, @summary, @details, @askedBy)
END