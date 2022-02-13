// numRamdom returns a random number between min (inclusive) and max (exclusive)
// Math.random() returns a Number between 0 (inclusive) and 1 (exclusive). So we have an interval like this: 1 -> Tamaño img
const numRandom = (size) => {
  return Math.floor(Math.random() * size);
};

// DDBB
// Como enviar datos del localStorage del frontend al backend y con node a la DDBB

// Detect click position
const detectClickPosition = (e) => {
  const UserPoint = { Xcoord: e.clientX, Ycoord: e.clientY };
  getDistance(UserPoint);
  drawImage(e);
  intentos++;
  showIntentos(intentos);
};

// Draw image when clicked
const imgClick = new Image();
const drawImage = (e) => {
  imgClick.src = "./img/pala-transpart.png";
  imgClick.id = "hole";
  imgClick.style.top = e.clientY + "px";
  imgClick.style.left = e.clientX + "px";
  document.body.appendChild(imgClick);
};

// Show number off times
const showIntentos = (intentos) => {
  if (intentmsg) {
    intentmsg.innerHTML = intentos;
  }
};

// Copy to clipBoard
const secretClipBoard = () => {
  let texto =
    "Si has llegado hasta aquí estás cerca de la recompensa \n 42.63169393537795, 0.6565823348016667 \n ¿Qué lugar marcan las coordenadas? \n envíame la respuesta y recibirás tu premio";
  document.oncopy = (event) => {
    event.preventDefault();
    event.clipboardData.setData("text/plain", texto);
  };
};

// Mesure distance between two points
const getDistance = (UserPoint) => {
  let difX = treasurePoint.Xcoord - UserPoint.Xcoord;
  let difY = treasurePoint.Ycoord - UserPoint.Ycoord;
  // Aplicar teorema de pitagoras para hayar distance (hipotenusa) que es igual a la suma de los cuadrados de los catetos (difX difY).
  let player = Math.sqrt(difX * difX + difY * difY);
  getMessage(player);
};

// Get distance advaice tempeture
const getMessage = (distance) => {
  if (distance < 40) {
    foundTresore(loguin);
    //deleteMessage();
    saveStorage(intentos);
    secretClipBoard();
    //setInterval(restart, 10000);
  } else if (distance < 50) {
    distmsg.innerHTML = Math.floor(distance);
    message.style.backgroundColor = "rgba(255, 0, 0, 1)";
    message.innerHTML = "REALLY HOT";
  } else if (distance < 70) {
    distmsg.innerHTML = Math.floor(distance);
    message.style.backgroundColor = "rgba(255, 111, 1, 0.8)";
    message.innerHTML = "HOT";
  } else if (distance < 100) {
    distmsg.innerHTML = Math.floor(distance);
    message.style.backgroundColor = "rgba(255, 67, 206, 0.8)";
    message.innerHTML = "WARM";
  } else if (distance < 200) {
    distmsg.innerHTML = Math.floor(distance);
    message.style.backgroundColor = "rgba(0, 57, 255, 0.6)";
    message.innerHTML = "COLD";
  } else if (distance > 201) {
    distmsg.innerHTML = Math.floor(distance);
    message.style.backgroundColor = "rgba(0, 57, 255, 0.8)";
    message.innerHTML = "VERY COLD";
  }
};

const showCoords = (event) => {
  if (mousecoords == true) {
    let x = event.clientX;
    let y = event.clientY;
    let coor = x + "/" + y;
    document.getElementById("coords").innerHTML = coor;
  }
};

// Show new Modal window
const foundTresore = (loguin) => {
  mainContent.innerHTML = `<div class=modal-text><p>${loguin}, copia el código:</p><p><span class ="text">jA@j7-aKOug</span></p><p> y pégalo en el Block Notas y verás como obtener tu recompensa.</p></div>`;
  const imgTresor = document.getElementById("map-img");
  imgTresor.src = "./img/chest-treasure.jpg";
  imgTresor.style.height = "350px";
  map.removeEventListener("click", detectClickPosition);
  map.removeEventListener("mousemove", showCoords);
  imgClick.style.visibility = "hidden";
  if (localStorage.length < 1) {
    const btnStart = document.createElement("div");
    btnStart.classList.add("main-content-msg");
    btnStart.innerHTML = `<button type="button" class="btn-start">START</button>`;
    document.body.appendChild(btnStart);
    btnStart.addEventListener("click", restart);
  }
};

// Saved in object player key/value pairs and set the values in localStorage from browser sessions
// localstore solo almacena strings - para serializar como un json usamos: JSON.stringify
const saveStorage = (intentos) => {
  console.log("sesion:",numgame);
  numgame++;
  console.log("sesion:",numgame);
  let player = {
    sesion: numgame,
    intentos: intentos,
  };
  // Creamos objeto formData y le añadimos clave : valor
  const playerdata = new FormData();
  playerdata.append("sesion", numgame);
  playerdata.append("score", intentos);
  // Envío a la api con POST
  sendStoresToserver(playerdata);
  // Guardamos en localStorege clave/valor que permanecerán intactos cuando la página se recarga.
  // Las claves y los valores siempre son string
  localStorage.setItem(numgame, JSON.stringify(player));
  returnArray(localStorage);
};

// Read localStorage
const returnArray = (localStorage) => {
  const listaGames = [];
  // Object.keys()acepta un objeto como argumento y devuelve una matriz de todas sus (propias) propiedades.
  // Objects.value Returns an array containing the values that correspond to all of a given object's own enumerable string properties.
  Object.keys(localStorage).forEach(function (key) {
    //console.log(localStorage.getItem(key));
    // Transform string to obj with JSON
    objets = JSON.parse(localStorage.getItem(key));
    //console.log(objets);
    //Saved objets on array
    listaGames.push(objets);
  });
  //console.log(listaGames);
  if (listaGames.length > 1) {
    // Shows all indexes, not just those with assigned values
    // listaGames.find(function (value, index) {
    //   console.log("Visited index ", index, " with value ", value);
    // });
    let games = listaGames.length;
    // Calculate the average
    let total = 0;
    for (i = 0; i < games; i++) {
      let j = listaGames[i].intentos;
      total = total + j;
    }
    let average = total / games;

    // Sort array
    sortGames(listaGames);

    // Render results players and create html table
    const storelocalDiv = document.createElement("div");
    storelocalDiv.id = "score";
    storelocalDiv.className = "main-content-table";
    storelocalDiv.innerHTML = `<table class ="content-table">
    <tr><th colspan ="4">SCORE ${loguin}:${intentos}</th></tr>
      <tr>
      <th>Games</th>
      <th>Best</th>
      <th>Worst</th>
      <th>Average</th>
      </tr>
      <tr>
      <td>${games}</td>
      <td>${listaGames[0].intentos}</td>
      <td>${listaGames[games - 1].intentos}</td>
      <td>${average.toFixed(1)}</td>
      </tr>
      <tr><th colspan ="4"><button class="btn-start" id="btnStart">START</button></th></tr>
      <tr>
      </table>`;
    document.body.appendChild(storelocalDiv);
    const btnStart = document.getElementById("btnStart");
    btnStart.addEventListener("click", restart);
  }
};

// Sort an array of objects by numbers and returns the sorted array. Sorts the arrayGames by intentos in ascending order:
const sortGames = (listaGames) => {
  listaGames.sort((a, b) => {
    return a.intentos - b.intentos;
  });
  listaGames.forEach((item) => {
    console.log(`score: ${item.intentos} and sesion ${item.sesion}`);
  });
};

// Send form data to server
// Example form loguin
const sendForm = (data) => {
  console.log(data);
  const player = data.get("namefield");
  console.log(typeof player);
  loguin = player;
  console.log(loguin);
  return loguin;
};

// Send localStorage to the server
const sendStoresToserver = (data) => {
  console.log("Sending localStorage to server");
  // Preparar datos para enviar
  const sesion = data.get("sesion");
  const score = data.get("score");
  const playerName = loguin;
  // Transformar formData a objeto para match con databases
  const sesionInt = parseInt(sesion, 10);
  const scoreInt = parseInt(score, 10);
  const obdata = { sesion: sesionInt, score: scoreInt, player: playerName };
  console.log(obdata);
  //  Enviar a la URL con por POST
  fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // mode: 'cors';
    },
    body: JSON.stringify(obdata),
  })
    .then((response) => {
      return response;
    })
    .then((text) => {
      console.log("hello response", text);
    })
    .catch((err) => {
      console.error(err);
    });
};

// Restar de game reloading de page
const restart = () => {
  location.reload();
};

// Geolocation
const success = (pos) => {
  const crd = pos.coords;
  console.log(
    `Your current position is Latitude : ${crd.latitude} and Longitude ${crd.longitude}`
  );
};
const error = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};
