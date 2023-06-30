CREATE OR ALTER PROCEDURE resetAcceptedAnswer(
    @questionID VARCHAR(255)
)
AS
BEGIN
    UPDATE answers SET accepted=0 WHERE answerFor=@questionID;
END