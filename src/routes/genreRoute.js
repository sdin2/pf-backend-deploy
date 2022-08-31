const axios = require("axios");
const { Router } = require("express");
require("dotenv").config();
const { API_KEY_GAMES } = process.env;
const { Genre } = require("../db");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    let name = req.query.name ? req.query.name : req.body.name;
    let genreFromApi = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY_GAMES}`
    );
    allGenres = genreFromApi.data.results.map((r) => ({
      id: r.id,
      name: r.name,
      games: r.games,
    }));
    if (name) {
      allGenres = allGenres.filter(
        (e) => e.name.toLowerCase() === name.toLowerCase()
      );
    }
    res.send(allGenres);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
