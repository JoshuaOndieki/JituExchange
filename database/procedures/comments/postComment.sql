CREATE OR ALTER PROCEDURE postComment(
    @id VARCHAR(255),
    @details TEXT,
    @commentFor VARCHAR(255),
    @commentBy VARCHAR(255),
    @target VARCHAR(10)
)
AS
BEGIN
    IF @target='question'
        BEGIN
            INSERT INTO questionComments (id, details, commentBy, commentFor)
            VALUES (@id, @details, @commentBy, @commentFor)
        END
    ELSE IF @target='answer'
        BEGIN
            INSERT INTO answerComments (id, details, commentBy, commentFor)
            VALUES (@id, @details, @commentBy, @commentFor)
        END
END