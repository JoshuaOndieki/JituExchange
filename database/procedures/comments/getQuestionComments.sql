CREATE OR ALTER PROCEDURE getQuestionComments(
    @questionID VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM questionComments WHERE commentFor=@questionID
END