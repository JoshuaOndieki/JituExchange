CREATE TRIGGER deleteUserRelatedRecords
ON users
AFTER UPDATE
AS
BEGIN
    IF UPDATE(isDeleted)
    BEGIN
        IF (SELECT isDeleted FROM inserted) = 1
        BEGIN
            DELETE FROM questions WHERE askedBy IN (SELECT id FROM deleted);
            DELETE FROM answers WHERE answeredBy IN (SELECT id FROM deleted);
            DELETE FROM userBadges WHERE userID IN (SELECT id FROM deleted);
        END
    END
END;
