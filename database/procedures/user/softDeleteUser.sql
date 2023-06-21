CREATE OR ALTER PROCEDURE softDeleteUser(@id VARCHAR(200))
AS
BEGIN

UPDATE users SET isDeleted=1 WHERE id=@id AND isDeleted=0

END