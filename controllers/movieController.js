const connection = require("../connection.js");

//index
function index(req, res) {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    //creo un array contenente le immagini associate ai risultati
    const updatedResults = results.map((movie) => {
      //formatto il titolo per essere tutto in minuscolo e avere underscore al posto degli spazi
      const imagePath = `/${movie.title.toLowerCase().replace(/ /, "_")}.jpg`;
      return {
        ...movie,
        image: imagePath,
      };
    });

    res.json(updatedResults);
    console.log("Index eseguito con successo!");
  });
}

function show(req, res) {
  const id = req.params.id;

  const sql = "SELECT * FROM movies WHERE id = ?";

  if (id && !isNaN(id)) {
    connection.query(sql, [id], (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });

      if (results.length === 0) {
        return res.status(404).json({ error: "Post not found" });
      }

      const movie = results[0];
      movie.image = `/${movie.title.toLowerCase().replace(/ /, "_")}.jpg`;

      const reviewsSql =
        "SELECT reviews.name,reviews.vote,reviews.text FROM reviews JOIN movies ON movies.id = reviews.movie_id WHERE movies.id = ?";

      connection.query(reviewsSql, [id], (err, reviewsResults) => {
        movie.reviews = reviewsResults;

        res.json(movie);
        console.log("Show eseguito con successo: ");
      });
    });
  } else {
    const err = new Error("Inserted ID is not valid ");
    err.code = 400;
    throw err;
  }
}

module.exports = { index, show };
