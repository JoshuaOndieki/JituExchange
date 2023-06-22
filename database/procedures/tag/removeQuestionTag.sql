CREATE OR ALTER PROCEDURE removeQuestionTag(
    @id VARCHAR(255)
)
AS
BEGIN
    DELETE FROM questionTags WHERE id=@id
END