const axios = require("axios");
require("dotenv").config();
const { API_KEY_GAMES } = process.env;
const { Genre } = require("../db");

async function getGenres() {
  let genreFromApi = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY_GAMES}`
  );
  let allGenre = genreFromApi.data.results.map((r) => ({
    name: r.name,
  }));

  return allGenre;
}

async function saveAllGenresInDb() {
  try {
    const allGenres = await getGenres();
    allGenres.forEach((e) => {
      Genre.findOrCreate({
        where: {
          name: e.name,
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
