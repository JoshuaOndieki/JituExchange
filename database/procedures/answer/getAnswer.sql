CREATE OR ALTER PROCEDURE getAnswer(
    @id VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM answers WHERE id=@id
END