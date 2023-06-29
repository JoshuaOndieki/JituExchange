CREATE OR ALTER PROCEDURE vote(
    @id VARCHAR(255),
    @voter VARCHAR(255),
    @voteFor VARCHAR(255),
    @positive BIT,
    @target VARCHAR(10)
)
AS
BEGIN
    IF @target='question'
        BEGIN
            INSERT INTO questionVotes (id, voter, voteFor, positive)
            VALUES (@id, @voter, @voteFor, @positive)
        END
    ELSE IF @target='answer'
        BEGIN
            INSERT INTO answerVotes (id, voter, voteFor, positive)
            VALUES (@id, @voter, @voteFor, @positive)
        END
END