🗺️ MAP-TREASURE

🌐 Challenge: Built the same project two versions. Firstly fronend and finallly backend version with Node JS and REST API from Express framework

🧰 Toolbox: Vanilla JS, Node Js, Express. 

### First version frontend project deployed in vercel
🏄 https://mapa-tesoro.vercel.app/
> [Mapa-Tesoro Repositorio](https://github.com/maestroGit/Mapa-Tesoro)

![Península Iberica](https://mapa-tesoro.vercel.app/img/Peninsula-Iberica.jpg)

###### Insperied
🏄
> [Fatz](https://www.youtube.com/watch?v=Aau2fYpDPIU&t=837s)
 
🏄 https://github.com/FaztWeb/find-the-treasure-javascript 



Comandos sql básicos:
```
mysql -u db_user -p
CREATE DATABASE users;

CREATE table scores2(
id INT NOT NULL AUTO_INCREMENT,
sesion INT NULL,
scores INT NULL,
player VARCHAR(20) NULL,
PRIMARY KEY (id)
);

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

```

Comandos de Git básicos son:
```
git status
git add
git commit
git push origin master
```

