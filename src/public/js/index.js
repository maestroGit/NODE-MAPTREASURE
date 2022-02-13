// Diferentes formas de obtener el ancho en pixels
let width = window.innerWidth;
//console.log("screen view: ",screen.width);
let widthClientInner = window.innerWidth;
console.log("innerWidth: ", widthClientInner);
let widthClientOuter = window.outerWidth;
//console.log("outerWidth: ",widthClientOuter);
let height = 500;
// Elementos del DOM
const map = document.getElementById("map");
const mainContent = document.getElementById("main-content");
const message = document.getElementById("message");
const distmsg = document.getElementById("distance");
const intentmsg = document.getElementById("intentos");
const closeBtn = document.getElementById("closedBtn");
const form = document.getElementById("nameForm");
const send = document.getElementById("send");


// Variables
let intentos = 1;
let numgame = window.localStorage.length;
let game = 0;
let mousecoords = true;
let loguin;

// Create objecte (tabla de hash) treasurePoint width random values
const treasurePoint = {
  Xcoord: numRandom(width),
  Ycoord: numRandom(height),
};
console.log(
  `Coordenadas del tesoro:${treasurePoint.Xcoord}:${treasurePoint.Ycoord}`
);

// Usser events
// clicked on map
map.addEventListener("click", detectClickPosition);
// mousemove on map
map.addEventListener("mousemove", showCoords);

// Submit form
form.addEventListener("submit", function (event) {
  event.preventDefault(); 
  // Tranformar formulario a objeto formData compuesto por pares clave-valor
  // create an empty FormData object
  const sendDataForm = new FormData(form);
  sendForm(sendDataForm);
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
});

// Closed modal
// closeBtn.addEventListener("click", function () {
//   const modal = document.getElementById("modal");
//   modal.style.visibility = "hidden";
// });

// Geolocation
// navigator.geolocation.getCurrentPosition(success, error);
