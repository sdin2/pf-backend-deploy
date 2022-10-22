const axios = require("axios");
require("dotenv").config();
const { API_KEY_GAMES } = process.env;
const { Game } = require("../db");

async function getAllGames() {
  try {
    let gamesAPI;
    let url;
    let array = [];
    gamesAPI = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY_GAMES}`
    );
    let gamesFilter = gamesAPI.data.results.map((e) => {
      return {
        id: e.id,
        name: e.name,
        img: e.background_image,
      };
    });
    array = [...array, ...gamesFilter];
    for (let i = 1; i < 20; i++) {
      url = gamesAPI.data.next;
      gamesAPI = await axios.get(url);
      let gamesFilter = gamesAPI.data.results.map((e) => {
        return {
          id: e.id,
          name: e.name,
          img: e.background_image,
        };
      });
      array = [...array, ...gamesFilter];
    }
    return array;
    
  } catch (error) {
    console.log(error)
  }
}

async function getGamesDB() {
  try {
    let gamesDB = await Game.findAll();
    return gamesDB;
    
  } catch (error) {
    console.log(error)
  }
}

// async function getAllGames() {
//   let gamesAPI = await getGamesApi();
//   // let gamesDb = await getGamesDB();
//   // let allGames = gamesAPI.concat(gamesDb);
//   return gamesAPI;
// }

async function saveAllGamesInDb() {
  try {
    const allGames = await getAllGames();
    await Game.destroy({
      where:{}
    })
    allGames.forEach((e) => {
      Game.findOrCreate({
        where: {
          id: e.id,
          name: e.name,
          img: e.img,
        },
      });
    });
    console.log("all games saved in data base");
    
  } catch (error) {
    console.log(error)
    
  }
}

module.exports = {
  // getGamesApi,
  getGamesDB,
  getAllGames,
  saveAllGamesInDb,
};
