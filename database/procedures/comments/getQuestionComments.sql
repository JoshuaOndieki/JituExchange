CREATE OR ALTER PROCEDURE getQuestionComments(
    @questionID VARCHAR(255)
)
AS
BEGIN
    SELECT qc.*, u.username FROM questionComments qc
    LEFT JOIN users u ON qc.commentBy=u.id
    WHERE commentFor=@questionID
    ORDER BY qc.commentedDate
END