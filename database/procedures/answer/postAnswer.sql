CREATE OR ALTER PROCEDURE postAnswer(
    @id VARCHAR(255),
    @details NVARCHAR(MAX),
    @answerFor VARCHAR(255),
    @answeredBy VARCHAR(255)
)
AS
BEGIN
    INSERT INTO answers (id, details, answeredBy, answerFor)
    VALUES (@id, @details, @answeredBy, @answerFor)
END