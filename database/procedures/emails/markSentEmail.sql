CREATE OR ALTER PROCEDURE markSentEmail
    @table VARCHAR(20),
    @id INT
AS
BEGIN
    DECLARE @sql NVARCHAR(MAX)

    SET @sql = N'UPDATE ' + QUOTENAME(@table) + N' SET sentDate = SYSDATETIMEOFFSET() WHERE id = @id'

    EXEC sp_executesql @sql, N'@id INT', @id
END
