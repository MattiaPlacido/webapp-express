//INIZIALIZZAZIONE EXPRESS
const express = require("express");

const app = express();

//routing
const movieRouter = require("./router/movieRouter");
app.use("/", movieRouter);

//ASCOLTO
const port = 3000;
app.listen(port, () => {
  console.log("Il server sta ascoltando sulla porta " + port);
});
