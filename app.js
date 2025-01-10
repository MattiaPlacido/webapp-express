//INIZIALIZZAZIONE EXPRESS
const express = require("express");
const app = express();


const port = 3000;
//ASCOLTO
app.listen(port, () => {
    console.log("Il server sta ascoltando sulla porta " + port);
  });
  