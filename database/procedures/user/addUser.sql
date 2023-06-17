CREATE OR ALTER PROCEDURE addUser(
@id VARCHAR(255),
@firstname VARCHAR(100),
@lastname VARCHAR(100),
@email VARCHAR(255),
@password VARCHAR(255)
)
AS
BEGIN

INSERT INTO users (id, firstname, lastname, email, password)
VALUES (@id, @firstname, @lastname, @email, @password)

END