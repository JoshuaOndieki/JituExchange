CREATE OR ALTER PROCEDURE getAnswerComments(
    @answerID VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM answerComments WHERE commentFor=@answerID
END