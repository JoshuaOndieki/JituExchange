CREATE OR ALTER PROCEDURE removeQuestionTag(
    @id
)
AS
BEGIN
    DELETE FROM questionTags WHERE id=@id
END