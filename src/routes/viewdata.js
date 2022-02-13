// https://www.youtube.com/watch?v=p8CoR-wymQg
const express = require('express');
// https://ull-esit-dsi-1617.github.io/estudiar-las-rutas-en-expressjs-alejandro-raul-35l2/rutasexpressjs.html#basic-routing
// El direccionamiento básico hace referencia a cómo responde una aplicación a una solicitud de cliente en un punto final en concreto, que viene a ser un URI (o una zona de acceso) y un método de soliticitud HTTP (GET,POST,PUT,etc).
// Hay muchas rutas y cada una puede tener una o varias funciones a tratar.
// app es una instancia de express
// app.METHOD(PATH,HANDLER)
// METHOD es un método de solicitud HTTP
// PATH sería por donde accede al servidor
// HANDLER es la función que se ejecuta
// objeto pra crear tutas en el servidor

// Se utiliza la clase express.Router para crear controladores de rutas. Una instancia Router es un sistema de middleware y direccionamiento completo por eso se le conoce como "miniapps".
// objeto para crear routes en nuestro servidor
const router = express.Router();
const mysqlConnection = require("./database.js");
console.log(mysqlConnection);
mysqlConnection.query('SELECT * FROM scores', function(error,results,fields){
  if(error)throw error;
  console.log(results);
});

// GET consulta a la bases de datos
router.get("/", (req, res) => {
  mysqlConnection.query("SELECT * FROM scores", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
      console.log(rows);
    } else {
      console.log(err);
    }
  });
});

// Get para un id pasado por parámetro en url
// GET An Employee
router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  mysqlConnection.query(
    `SELECT * FROM scores WHERE id= ?`,
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );
});

//POST ruta para crear un dato
// INSERT An Employee
router.post("/", (req, res) => {
  const { id, sesion, score } = req.body; 
  console.log(id, sesion, score);
  const query = `
 
    CALL employeeAddOrEdit(?, ?, ?);
  `;
  mysqlConnection.query(query, [id, sesion, score], (err, rows, fields) => {
    if (!err) {
      res.json({ status: "Employeed Saved" });
    } else {
      console.log(err);
    }
  });
});

// Delete
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  mysqlConnection.query(
    `DELETE FROM scores WHERE id= ?`,
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Employeed deleted" });
      } else {
        console.log(err);
      }
    }
  );
});

// Put the
router.put("/:id", (req, res) => {
  const { sesion, score } = req.body;
  const { id } = req.params;
  console.log(id,sesion,score);
  mysqlConnection.query(`UPDATE scores SET sesion="${sesion}", score="${score}" WHERE id=${id}`);
});

// cliente res que utilizamos postman

module.exports = router;