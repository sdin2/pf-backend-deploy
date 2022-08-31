const axios = require("axios");
require("dotenv").config();
const { API_KEY_GAMES } = process.env;

async function getGenres() {
  let genreFromApi = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY_GAMES}`
  );
  allGenres = genreFromApi.data.results.map((r) => ({
    name: r.name,
    games: r.games,
  }));

  return genreFromApi;
}

async function saveAllGenresInDb() {
  const allGames = await getGenres();
  allGames.forEach((e) => {
    Game.findOrCreate({
      where: {
        name: e.name,
        games: e.games,
      },
    });
  });
  console.log("all genres saved in data base");
}

module.exports = {
  saveAllGenresInDb,
};
