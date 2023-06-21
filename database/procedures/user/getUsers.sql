CREATE OR ALTER PROCEDURE getUsers(
    @offset INT,
    @limit INT,
    @sortBy VARCHAR(100),
    @order VARCHAR(50)
)
AS
BEGIN
    DECLARE @sql NVARCHAR(MAX);
    SET @sql = N'
        SELECT *
        FROM users
        WHERE isDeleted = 0
        ORDER BY ' + QUOTENAME(@sortBy) + ' ' + @order + '
        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
    ';

    EXEC sp_executesql @sql, N'@offset INT, @limit INT', @offset, @limit;
END
