const axios = require("axios");
const { Router } = require("express");
require("dotenv").config();
const { API_KEY_GAMES } = process.env;
const { Genre } = require("../db");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    let allGenres = await Genre.findAll();
    if (!allGenres.length) {
      let genreFromApi = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY_GAMES}`
      );
      allGenres = await genreFromApi.data.results.map((r) => ({
        name: r.name,
      }));
      await Genre.bulkCreate(allGenres);
      allGenres = await Genre.findAll();
    }
    res.send(allGenres);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
