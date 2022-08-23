const { axios } = require("axios");
const express = require("express");
const router = express.Router();
const { Forum } = require("../db.js");

router.post("/", async (req, res, next) => {
  try {
    const forum = req.body;
    const createForum = await Forum.create({
      title: forum.title,
      text: forum.text,
    });
    res.send(createForum);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let title = req.query.title;
    const forumData = await Forum.findAll();
    if (title) {
      const postBytitle = forumData.filter((e) => e.title.includes(title));
      res.status(200).send(postBytitle);
    } else {
      res.send(forumData);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const forumData = await Forum.findByPk(id);
    res.send(forumData);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const allBody = req.body;
  try {
    let forumData = await Forum.findByPk(id);
    await forumData.update({
      title: allBody.title,
      text: allBody.text,
      deleteFlag: allBody.deleteFlag,
      othersUsersLike: allBody.othersUsersLike,
      users_response: allBody.users_response,
    });
    res.json("Posteo editado correctamente");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
