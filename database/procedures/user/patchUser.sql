CREATE OR ALTER PROCEDURE patchUser (
    @id VARCHAR(255),
    @firstname VARCHAR(100) = '?OPTIONAL',
    @lastname VARCHAR(100) = '?OPTIONAL',
    @location VARCHAR(255) = '?OPTIONAL',
    @website VARCHAR(255) = '?OPTIONAL',
    @github VARCHAR(255) = '?OPTIONAL',
    @avatar VARCHAR(2000) = '?OPTIONAL'
)
AS
BEGIN
    UPDATE users SET 
        firstname = CASE WHEN @firstname != '?OPTIONAL' THEN @firstname 
                        ELSE CASE WHEN @firstname IS NULL THEN NULL ELSE firstname END END,
        lastname = CASE WHEN @lastname != '?OPTIONAL' THEN @lastname 
                       ELSE CASE WHEN @lastname IS NULL THEN NULL ELSE lastname END END,
        location = CASE WHEN @location != '?OPTIONAL' THEN @location 
                       ELSE CASE WHEN @location IS NULL THEN NULL ELSE location END END,
        website = CASE WHEN @website != '?OPTIONAL' THEN @website 
                      ELSE CASE WHEN @website IS NULL THEN NULL ELSE website END END,
        github = CASE WHEN @github != '?OPTIONAL' THEN @github 
                     ELSE CASE WHEN @github IS NULL THEN NULL ELSE github END END,
        avatar = CASE WHEN @avatar != '?OPTIONAL' THEN @avatar 
                     ELSE CASE WHEN @avatar IS NULL THEN NULL ELSE avatar END END
    WHERE id = @id
END
