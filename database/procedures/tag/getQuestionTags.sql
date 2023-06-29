CREATE OR ALTER PROCEDURE getQuestionTags(
    @questionID VARCHAR(255)
)
AS
BEGIN
    SELECT tagName, id FROM questionTags WHERE questionID=@questionID
END