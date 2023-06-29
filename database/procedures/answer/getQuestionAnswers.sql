CREATE OR ALTER PROCEDURE getQuestionAnswers(
    @questionID VARCHAR(255),
    @voter VARCHAR(255)
)
AS
BEGIN
    SELECT a.*, u.username, 
    (SELECT COUNT(*) FROM answerVotes WHERE voteFor = a.id AND positive = 1) AS upvotes,
    (SELECT COUNT(*) FROM answerVotes WHERE voteFor = a.id AND positive = 0) AS downvotes,
    (SELECT positive FROM answerVotes WHERE voter = @voter AND voteFor = a.id ) AS userVote
    FROM answers a
    LEFT JOIN users u ON a.answeredBy = u.id
    WHERE a.answerFor = @questionID
END