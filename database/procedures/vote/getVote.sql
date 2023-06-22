CREATE OR ALTER PROCEDURE getVote(
    @voter VARCHAR(255),
    @voteFor VARCHAR(255),
    @target VARCHAR(10)
    )
AS
BEGIN

    IF @target='question'
        BEGIN
            SELECT * FROM questionVotes WHERE voter=@voter AND voteFor=@voteFor
        END
    ELSE IF @target='answer'
        BEGIN
            SELECT * FROM answerVotes WHERE voter=@voter AND voteFor=@voteFor
        END
END