CREATE OR ALTER PROCEDURE updateAnswer(
    @id VARCHAR(255),
    @details TEXT
)
AS
BEGIN
    UPDATE answers SET details=@details WHERE id=@id
END