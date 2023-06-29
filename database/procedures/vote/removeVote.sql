CREATE OR ALTER PROCEDURE removeVote(
    @id VARCHAR(255),
    @target VARCHAR(10)
    )
AS
BEGIN

    IF @target='question'
        BEGIN
            DELETE FROM questionVotes WHERE id=@id
        END
    ELSE IF @target='answer'
        BEGIN
            DELETE FROM answerVotes WHERE id=@id
        END
END