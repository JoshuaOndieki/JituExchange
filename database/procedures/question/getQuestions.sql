CREATE OR ALTER PROCEDURE getQuestions
(
    @offset INT,
    @limit INT,
    @sortBy VARCHAR(100),
    @order VARCHAR(50),
    @askedBy VARCHAR(255) = null,
    @searchQuery VARCHAR(2000) = null
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
        WHERE q.askedBy = ISNULL(@askedBy, q.askedBy) AND dbo.customSearch(CONCAT(q.summary, q.details), ISNULL(@searchQuery, CONCAT(q.summary, q.details))) = 1
        ORDER BY ' + QUOTENAME(@sortBy) + ' ' + @order + '
        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
    ';

    EXEC sp_executesql @sql, N'@offset INT, @limit INT, @askedBy VARCHAR(255), @searchQuery VARCHAR(2000)', @offset, @limit, @askedBy, @searchQuery;
END

