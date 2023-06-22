CREATE OR ALTER PROCEDURE getComment(
    @id VARCHAR(255),
    @target VARCHAR(10)
)
AS
BEGIN
    IF @target='question'
        BEGIN
            SELECT * FROM questionComments WHERE id=@id
        END
    ELSE IF @target='answer'
        BEGIN
            SELECT * FROM answerComments WHERE id=@id
        END
END