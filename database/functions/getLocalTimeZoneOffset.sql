CREATE FUNCTION dbo.GetLocalTimeZoneOffset()
RETURNS NVARCHAR(6)
AS
BEGIN
    DECLARE @TimeZoneOffset NVARCHAR(6)
    SELECT @TimeZoneOffset = CURRENT_TIMEZONE()

    RETURN @TimeZoneOffset
END;