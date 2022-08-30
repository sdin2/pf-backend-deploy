const axios = require("axios");
const { Router } = require("express");
// const { Game } = require("../db");
const { getAllGames, getGamesDB } = require("../controllers/GamesController");
require("dotenv").config();
const { API_KEY_GAMES } = process.env;

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const name = req.query.name ? req.query.name : req.body.name;
    if (name) {
      let videogameByName = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY_GAMES}&search=${name}`
      );
      videogameByName = videogameByName.data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          img: game.background_image,
        };
      });
      videogameByName.length
        ? res.status(200).send(videogameByName)
        : res.status(200).send("Games not found");
    } else {
      let videogames = await getGamesDB();
      res.status(200).send(videogames);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    let videogameById = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY_GAMES}`
    );
    videogameById = videogameById.data;
    videogameById = {
      id: videogameById.id,
      name: videogameById.name,
      image: videogameById.background_image,
      description: videogameById.description,
    };
    videogameById
      ? res.status(200).send(videogameById)
      : res.status(400).send("Id invalidate");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
