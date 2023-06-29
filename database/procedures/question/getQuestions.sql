CREATE OR ALTER PROCEDURE getQuestions
(
    @offset INT,
    @limit INT,
    @sortBy VARCHAR(100),
    @order VARCHAR(50),
    @askedBy VARCHAR(255) = null
)
AS
BEGIN
    DECLARE @sql NVARCHAR(MAX);

    SET @sql = N'
        SELECT q.*, u.username, 
            (SELECT COUNT(*) FROM questionVotes WHERE voteFor = q.id AND positive = 1) AS upvotes,
            (SELECT COUNT(*) FROM questionVotes WHERE voteFor = q.id AND positive = 0) AS downvotes,
            (SELECT COUNT(*) FROM answers WHERE answerFor = q.id) AS answersCount
        FROM questions q
        LEFT JOIN users u ON q.askedBy = u.id
        WHERE q.askedBy = ISNULL(@askedBy, q.askedBy)
        ORDER BY ' + QUOTENAME(@sortBy) + ' ' + @order + '
        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
    ';

    EXEC sp_executesql @sql, N'@offset INT, @limit INT, @askedBy VARCHAR(255)', @offset, @limit, @askedBy;
END

