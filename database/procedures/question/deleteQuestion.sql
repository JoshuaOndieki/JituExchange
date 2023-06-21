CREATE OR ALTER PROCEDURE deleteQuestion(
    @id VARCHAR(255)
)
AS
BEGIN
    DELETE FROM questions WHERE id=@id
END