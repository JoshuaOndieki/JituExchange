CREATE OR ALTER PROCEDURE deleteComment(
    @id VARCHAR(255),
    @target VARCHAR(10)
)
AS
BEGIN
    IF @target='question'
        BEGIN
            DELETE FROM questionComments WHERE id=@id
        END
    ELSE IF @target='answer'
        BEGIN
            DELETE FROM answerComments WHERE id=@id
        END
END