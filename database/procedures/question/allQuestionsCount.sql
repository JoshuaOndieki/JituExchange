CREATE OR ALTER PROCEDURE allQuestionsCount
AS
BEGIN
    SELECT COUNT(*) AS recordCount
    FROM questions
END
