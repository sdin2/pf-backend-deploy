const axios = require("axios");
const { Router } = require("express");
const { New } = require("../db");
const { getAllNews } = require("../controllers/NewsController");
require("dotenv").config();
const { API_KEY } = process.env;

const router = Router();

router.get("/", async (req, res, next) => {
  const id = req.params.id;
  const title = req.query.title;

  let allNews = await getAllNews();
  if (id) {
    let newId = allNews.filter((e) => e.id === id);
    res.status(200).send(newId);
  } else if (title) {
    let newsTitle = allNews.filter((el) =>
      el.title.toLowerCase().includes(title.toLowerCase())
    );
    newsTitle.length
      ? res.status(200).json(newsTitle)
      : res.status(500).json("No se encontraron resultados");
  } else res.status(200).json(allNews);
});

router.post("/", async (req, res, next) => {
  const { title, short_description, main_image, article_content } = req.body;
  try {
    let newPost = await New.create({
      title,
      short_description,
      main_image,
      article_content,
    });
    res.send(newPost);
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  const { id } = req.params;
  const newsData = req.body;
  try {
    let newData = await New.findByPk(id);
    await newData.update({
      deleteFlag: newsData.deleteFlag,
      short_description: newsData.short_description,
      main_image: newsData.main_image,
      title: newsData.title,
      article_content: newsData.article_content,
    });
    res.status(200).send("Update correctly");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
