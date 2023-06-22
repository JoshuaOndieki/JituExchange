CREATE OR ALTER PROCEDURE updateQuestion (
    @id VARCHAR(255),
    @summary VARCHAR(255),
    @details TEXT
)
AS
BEGIN
    UPDATE questions SET
        summary=@summary, details=@details, editedDate=SYSDATETIMEOFFSET()
    WHERE
        id=@id
END