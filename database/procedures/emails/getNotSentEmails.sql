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
    ELSE IF @table='acceptedAnswerEmails'
        BEGIN
            SELECT aae.*, u.username, q.summary as questionSummary, q.id as questionID, CASE WHEN LEN(a.details) > 300 THEN LEFT(a.details, 300) + '...' ELSE a.details END AS answerSnippet
            FROM acceptedAnswerEmails aae
            LEFT JOIN users u
            ON u.id=aae.targetUser
            LEFT JOIN answers a
            ON a.id=aae.answerID
            LEFT JOIN questions q
            ON q.id=a.answerFor
            WHERE aae.sentDate IS NULL
        END
    ELSE IF @table='passwordResetEmails'
        BEGIN
            SELECT * FROM acceptedAnswerEmails
        END
END