const { response } = require("express");
const express = require("express");
// https://ull-esit-dsi-1617.github.io/estudiar-las-rutas-en-expressjs-alejandro-raul-35l2/rutasexpressjs.html#basic-routing
// El direccionamiento básico hace referencia a cómo responde una aplicación a una solicitud de cliente en un punto final en concreto, que viene a ser un URI (o una zona de acceso) y un método de soliticitud HTTP (GET,POST,PUT,etc).
// Hay muchas rutas y cada una puede tener una o varias funciones a tratar.
const app = express();
// app es una instancia de express
// app.METHOD(PATH,HANDLER)
// METHOD es un método de solicitud HTTP
// PATH sería por donde accede al servidor
// HANDLER es la función que se ejecuta
// objeto pra crear tutas en el servidor
const path = require("path");

// Settings
// Las variables de entorno son variables externas a nuestra aplicación que residen en el sistema operativo o en el contenedor de la aplicación que se está ejecutando. Una variable de entorno es simplemente un nombre asignado a un valor
// la librería dotenv nos permitiría leer estas variables desde un archivo llamado .env, para posteriormente cargar las variables de entorno en la variable process.env.
// process.env.PORT || 3000 means: whatever is in the environment variable PORT, or 3000 if there’s nothing there
app.set("port", process.env.PORT || 3000);

// Middlewares
// funciones que se ejecutan para interactuar con otros elementos
// Para que el servidor lea los datos en JSON, express cuenta con bodyParser por defecto
//app.use(express.json());

// The app.use() function is used to mount the specified middleware function (are the functions that have access to the request object and response object,
// at the path which is being specified. The middleware function is executed when the base of the requested path matches the path.
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/data", express.static(path.join(__dirname, "data")));

// Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option.
// https://www.youtube.com/watch?v=Kw5tC5nQMRY
app.use(express.json({ limit: "1mb" }));

// ddbb
const mysqlConnection = require("./routes/database.js");

// SELECT
mysqlConnection.query("SELECT * FROM scores", (error, results) => {
  if (error) throw error;
  console.log(results);
});

// Routes
// ** URL para la comunicación del navegador y servidor
// Se utiliza la clase express.Router para crear controladores de rutas. Una instancia Router es un sistema de middleware y direccionamiento completo por eso se le conoce como "miniapps".

// objeto para crear routes en nuestro servidor
const router = express.Router();

// GET consulta a la bases de datos
router.get("/viewdata", (req, res) => {
  mysqlConnection.query("SELECT * FROM scores", (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// RequestMethods HTTP -
// An HTTP request is made by a client, to a sesiond host, which is located on a server. The aim of the request is to access a resource on the server.

// To make the request, the client uses components of a URL (Uniform Resource Locator), which includes the information needed to access the resource. The components of a URL explains URLs.
// A correctly composed HTTP request contains the following elements:
// A request line The method is a one-word command that tells the server what it should do with the resource
// A series of HTTP headers, or header fields.
// A message body, if needed.

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

// POST ruta para crear un dato - send data for procesing. Message with body, send data to server
// INSERT An Employee
router.post("/api", (req, res) => {
  try {
    console.log(req.body);
    const data = req.body;
    //res.send("POST request it has been recived on /api page");
    let sesion = data.sesion;
    let score = data.score;
    let player = data.player;
    mysqlConnection.query(
      `INSERT INTO scores (id, sesion, score, player) VALUES (NULL,${sesion}, ${score}, "${player}")`,
      (err, rows, fields) => {
        if (!err) {
          res.json({ status: "Data Saved" });
        } else {
          console.log(err);
        }
      }
    );
  } catch (err) {
    // 👇️ This runs
    console.log("Error: ", err.message);
  }
});

// Put: deposit data on server - inverse of get
router.put("/:id", (req, res) => {
  const { sesion, score, player } = req.body;
  const { id } = req.params;
  console.log(id, sesion, score, player);
  mysqlConnection.query(
    `UPDATE scores SET sesion="${sesion}", score="${score}" WHERE id=${id}`
  );
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
        res.json({ status: "id deleted" });
      } else {
        console.log(err);
      }
    }
  );
});

app.use(router);

// Start server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
  //Para detener la ejecución de la aplicación Express, en el terminal: Ctrl+C
});
