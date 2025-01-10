const connection = require("../connection.js");

//index
function index(req, res) {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
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

      const movies = results[0];

      const reviewsSql =
        "SELECT * FROM reviews JOIN movies ON movies.id = reviews.movie_id WHERE movies.id = ?";

      connection.query(reviewsSql, [id], (err, reviewsResults) => {
        movies.reviews = reviewsResults;

        res.json(movies);
        console.log("Show eseguito con successo: ", movies);
      });
    });
  } else {
    const err = new Error("Inserted ID is not valid ");
    err.code = 400;
    throw err;
  }
}
