//INIZIALIZZAZIONE EXPRESS
const express = require("express");

const app = express();
var cors = require("cors");
app.use(cors());

//body parser
app.use(express.json());

//ROUTING
const movieRouter = require("./router/movieRouter");
app.use("/movies", movieRouter);
//.env files
require("dotenv").config();

//MIDDLEWARES
app.use("/public", express.static("public"));
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
//pagina non trovata / indirizzo non trovato
app.use(notFound);
//gestione degli errori
app.use(errorHandler);

//ASCOLTO
const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log("Il server sta ascoltando sulla porta " + port);
});
