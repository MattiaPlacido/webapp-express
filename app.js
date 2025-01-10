//INIZIALIZZAZIONE EXPRESS
const express = require("express");

const app = express();

//routing
const movieRouter = require("./router/movieRouter");
app.use("/", movieRouter);

//middlewares
app.use("/public", express.static("public"));
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
app.use(notFound);
app.use(errorHandler);

//ASCOLTO
const port = 3000;
app.listen(port, () => {
  console.log("Il server sta ascoltando sulla porta " + port);
});
