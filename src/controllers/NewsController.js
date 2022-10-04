const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { New } = require("../db");

async function getNewsApi() {
  try {
    const newsApi = await axios.get(
      `https://www.mmobomb.com/api1/latestnews?key=${API_KEY}`
    );
    const array = newsApi.data.map((e) => {
      return {
        id: e.id,
        title: e.title,
        short_description: e.short_description,
        main_image: e.main_image,
        article_content: e.article_content,
      };
    });
    return array;
    
  } catch (error) {
    console.log(error)
  }
}

async function getNewsDB() {
  try {
    let newsDB = await New.findAll();
    return newsDB;
    
  } catch (error) {
    console.log(error)
  }
}

async function getAllNews() {
  try {
    const apiNews = await getNewsApi();
    const DBNews = await getNewsDB();
    const allNews = apiNews.concat(DBNews);
    return allNews;
    
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getNewsApi,
  getNewsDB,
  getAllNews,
};
