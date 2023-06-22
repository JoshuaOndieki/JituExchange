CREATE OR ALTER PROCEDURE removeVote(
    @voter VARCHAR(255),
    @voteFor VARCHAR(255),
    @target VARCHAR(10)
    )
AS
BEGIN

    IF @target='question'
        BEGIN
            DELETE FROM questionVotes WHERE voter=@voter AND voteFor=@voteFor
        END
    ELSE IF @target='answer'
        BEGIN
            DELETE FROM answerVotes WHERE voter=@voter AND voteFor=@voteFor
        END
END