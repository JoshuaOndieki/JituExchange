CREATE OR ALTER PROCEDURE getAnswerComments(
    @answerID VARCHAR(255)
)
AS
BEGIN
    SELECT ac.*, u.username FROM answerComments ac
    LEFT JOIN users u ON ac.commentBy=u.id
    WHERE commentFor=@answerID
    ORDER BY ac.commentedDate
END