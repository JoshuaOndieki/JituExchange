CREATE OR ALTER PROCEDURE getNotSentEmails(
    @table VARCHAR(20)
)
AS
BEGIN
    IF @table='welcomeEmails'
        BEGIN
            SELECT w.*, u.username
            FROM welcomeEmails w
            LEFT JOIN users u
            ON u.id=w.targetUser
            WHERE w.sentDate IS NULL
        END
    ELSE IF @table='passwordResetEmails'
        BEGIN
            SELECT * FROM passwordResetEmails
        END
    ELSE IF @table='acceptedAnswerEmails'
        BEGIN
            SELECT * FROM acceptedAnswerEmails
        END
END
