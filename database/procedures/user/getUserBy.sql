CREATE OR ALTER PROCEDURE getUserBy(
    @filter_type VARCHAR(10),
    @filter_value VARCHAR(255),
    @deleted BIT = 0
    )
    AS
    BEGIN

    IF @filter_type='id'
        BEGIN
            SELECT * FROM users WHERE  id=@filter_value AND (isDeleted=0 OR isDeleted=@deleted)
        END
    ELSE IF @filter_type='email'
        BEGIN
            SELECT * FROM users WHERE  email=@filter_value AND (isDeleted=0 OR isDeleted=@deleted)
        END
    ELSE IF @filter_type='username'
        BEGIN
            SELECT * FROM users WHERE  username=@filter_value AND (isDeleted=0 OR isDeleted=@deleted)
        END

    END