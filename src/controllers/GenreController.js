const axios = require("axios");
require("dotenv").config();
const { API_KEY_GAMES } = process.env;
const { Genre } = require("../db");

async function getGenres() {
  let genreFromApi = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY_GAMES}`
  );
  genreFromApi = genreFromApi.data.results.map((r) => ({
    name: r.name,
    games: r.games,
  }));

  return genreFromApi;
}

async function saveAllGenresInDb() {
  try {
    const allGenres = await getGenres();
    allGenres.forEach((e) => {
      Genre.findOrCreate({
        where: {
          name: e.name,
          games: e.games,
        },
      });
    });
    console.log("all genres saved in data base");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getGenres,
  saveAllGenresInDb,
};
