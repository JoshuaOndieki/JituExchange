CREATE OR ALTER PROCEDURE getQuestion(
    @id VARCHAR(255)
)
AS
BEGIN
    UPDATE questions SET views = views + 1 WHERE id=@id;

    SELECT q.*, u.username, 
    (SELECT COUNT(*) FROM questionVotes WHERE voteFor = q.id AND positive = 1) AS upvotes,
    (SELECT COUNT(*) FROM questionVotes WHERE voteFor = q.id AND positive = 0) AS downvotes,
    (SELECT COUNT(*) FROM answers WHERE answerFor = q.id) AS answersCount
    FROM questions q
    LEFT JOIN users u ON q.askedBy = u.id
END