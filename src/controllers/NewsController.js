const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { New } = require("../db");

async function getNewsApi() {
  const newsApi = await axios.get(
    `https://www.mmobomb.com/api1/latestnews?key=${API_KEY}`
  );
  const array = newsApi.data.map((e) => {
    return {
      id: e._id,
      title: e.title,
      short_description: e.short_description,
      main_image: e.main_image,
      article_content: e.article_content,
    };
  });
  return array;
}

async function getNewsDB() {
  let newsDB = await New.findAll();
  return newsDB;
}

async function getAllNews() {
  const apiNews = await getNewsApi();
  const DBNews = await getNewsDB();
  const allNews = apiNews.concat(DBNews);
  return allNews;
}

module.exports = {
  getNewsApi,
  getNewsDB,
  getAllNews,
};
