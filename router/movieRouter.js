//inizalizzazione di express e impostazione router
const express = require("express");
const router = express.Router();

//dichiaro il controller
const movieController = require("../controllers/movieController");

//CRUD
router.get("/", movieController.index);

router.get("/:id", movieController.show);

module.exports = router;
