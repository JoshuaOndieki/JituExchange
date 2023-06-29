CREATE OR ALTER PROCEDURE allUsersCount
AS
BEGIN
    SELECT COUNT(*) AS recordCount
    FROM users
    WHERE isDeleted=0
END
