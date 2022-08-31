const axios = require("axios");
const { Router } = require("express");
require("dotenv").config();
const { API_KEY_GAMES } = process.env;
const { Genre } = require("../db");

const router = Router();

router.get("/:id", async (req, res, next) => {
  try {
    let genres = await Genre.findByPk(id);
    res.send(genres);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let genres = await Genre.findAll();
    res.send(genres);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
