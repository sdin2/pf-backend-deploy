const { axios } = require("axios");
const express = require("express");
const router = express.Router();
const { Forum, User, Answer } = require("../db.js");

router.post("/", async (req, res, next) => {
  const userId = req.body.userId ? req.body.userId : req.query.userId;
  const genreId = req.body.userId ? req.body.userId : req.query.userId;
  const forum = req.body;
  try {
    await Forum.create({
      title: forum.title,
      text: forum.text,
      userId: userId,
      genre: forum.genre,
    });
    res.send("Posteo completado");
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let title = req.query.title ? req.query.title : req.body.title;
    const forumData = await Forum.findAll({
      include: [
        {
          model: User,
          attributes: [
            "nickname",
            "email",
            "img",
            "deleteFlag",
            "bannedFlag",
            "matched_users",
            "favoriteGames",
            "servers",
            "isAdmin",
            "rating",
            "plan",
          ],
        },
        {
          model: Answer,
          attributes: [
            "id",
            "comment",
            "like",
            "deleteFlag",
            "userId",
            "createdAt",
          ],
          include: {
            model: User,
            attributes: [
              "nickname",
              "email",
              "img",
              "deleteFlag",
              "bannedFlag",
              "isAdmin",
              "rating",
              "plan",
            ],
          },
        },
      ],
    });
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
    const forumData = await Forum.findByPk(id, {
      include: [
        {
          model: User,
          attributes: [
            "nickname",
            "email",
            "img",
            "deleteFlag",
            "bannedFlag",
            "matched_users",
            "favoriteGames",
            "servers",
            "isAdmin",
            "rating",
            "plan",
          ],
        },
        {
          model: Answer,
          attributes: [
            "id",
            "comment",
            "like",
            "deleteFlag",
            "userId",
            "createdAt",
          ],
          include: {
            model: User,
            attributes: [
              "nickname",
              "email",
              "img",
              "deleteFlag",
              "bannedFlag",
              "isAdmin",
              "rating",
              "plan",
            ],
          },
        },
      ],
    });
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
      othersUsersLike: [...othersUsersLike, allBody.othersUsersLike],
      users_response: allBody.users_response,
    });
    res.json("Posteo editado correctamente");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
