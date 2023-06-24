CREATE OR ALTER TRIGGER trgOnUserCreation
ON users
AFTER INSERT
AS
BEGIN
    INSERT INTO welcomeEmails (targetUser, targetEmail)
    SELECT id, email
    FROM inserted
END
