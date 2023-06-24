CREATE TRIGGER trgOnAcceptAnswer
ON answers
AFTER UPDATE
AS
BEGIN
    IF UPDATE(accepted)
    BEGIN
        IF (SELECT accepted FROM inserted) = 1
        BEGIN
            INSERT INTO acceptedAnswerEmails (targetUser, targetEmail, answerID)
            SELECT i.answeredBy, u.email, i.id
            FROM inserted i
            INNER JOIN
            users u ON u.id=i.answeredBy
        END
    END
END;
