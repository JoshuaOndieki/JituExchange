CREATE OR ALTER PROCEDURE acceptAnswer(
    @id VARCHAR(255),
    @questionID VARCHAR(255)
)
AS
BEGIN
    -- UPDATE answers SET accepted=0 WHERE answerFor=@questionID;
    UPDATE answers SET accepted=1 WHERE id=@id;
END