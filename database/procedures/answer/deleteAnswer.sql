CREATE OR ALTER PROCEDURE deleteAnswer(
    @id VARCHAR(255)
)
AS
BEGIN
    DELETE FROM answers WHERE id=@id
END