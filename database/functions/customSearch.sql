CREATE OR ALTER FUNCTION customSearch (@inputString NVARCHAR(MAX), @searchWords NVARCHAR(MAX))
RETURNS BIT
AS
BEGIN
    DECLARE @ret BIT = 0;
    DECLARE @word NVARCHAR(MAX);
    DECLARE @pos INT = 1;
    WHILE CHARINDEX(' ', @searchWords, @pos) > 0
    BEGIN
        SET @word = SUBSTRING(@searchWords, @pos, CHARINDEX(' ', @searchWords, @pos) - @pos);
        IF CHARINDEX(@word, @inputString) > 0
        BEGIN
            SET @ret = 1;
            BREAK;
        END;
        SET @pos = CHARINDEX(' ', @searchWords, @pos) + 1;
    END;
    SET @word = SUBSTRING(@searchWords, @pos, LEN(@searchWords) - @pos + 1);
    IF CHARINDEX(@word, @inputString) > 0
    BEGIN
        SET @ret = 1;
    END;
    RETURN @ret;
END