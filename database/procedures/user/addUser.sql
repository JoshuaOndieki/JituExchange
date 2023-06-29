CREATE OR ALTER PROCEDURE addUser(
@id VARCHAR(255),
@email VARCHAR(255),
@username VARCHAR(50),
@password VARCHAR(255)
)
AS
BEGIN

INSERT INTO users (id, username, email, password)
VALUES (@id, @username, @email, @password)

END