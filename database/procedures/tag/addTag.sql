CREATE OR ALTER PROCEDURE addTag(
    @id VARCHAR(255),
    @name VARCHAR(255),
    @addedBy VARCHAR(255)
)
AS
BEGIN
    INSERT INTO tags (id, name, addedBy)
    VALUES (@id, @name, @addedBy)
END