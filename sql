ALTER TABLE scores ADD times TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE scores AUTO_INCREMENT=0;
-- AUTO_INCREMENT attribute to a column of a table to generate a unique identity for the new row.
-- By default, the starting value for AUTO_INCREMENT is 1, and it will increment by 1 for each new record. To let the AUTO_INCREMENT sequence start with another value, use the following SQL statement
-- reset the auto-increment value of the ID column.
ALTER TABLE table_name AUTO_INCREMENT = value;
-- You specify the table name after the ALTER TABLE clause and the value which you want to reset to in the expression AUTO_INCREMENT=value.
-- Notice that the value must be greater than or equal to the current maximum value of the auto-increment column.
-- The TRUNCATE TABLE statement removes all the data from a table and resets the auto-increment value to zero.
TRUNCATE TABLE scores;