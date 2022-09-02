const { axios } = require("axios");
const express = require("express");
const router = express.Router();
const { Answer, Forum, User } = require("../db.js");

router.post("/", async (req, res, next) => {
  const idForum = req.body.idForum ? req.body.idForum : req.query.idForum;
  const idUser = req.body.idUser ? req.body.idUser : req.query.idUser;
  const forum = req.body;
  try {
    await Answer.create({
      comment: forum.comment,
      forumId: idForum,
      userId: idUser,
    });
    res.send("Comment posted!");
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let id = req.query.id ? req.query.id : req.body.id;
    let forumData;
    if (id) {
      forumData = await Answer.findByPk(id, {
        include: [
          {
            model: Forum,
            attributes: ["id", "title", "deleteFlag"],
          },
          {
            model: User,
            attributes: [
              "id",
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
        ],
      });
    } else {
      forumData = await Answer.findAll({
        include: [
          {
            model: Forum,
            attributes: ["id", "title", "deleteFlag"],
          },
          {
            model: User,
            attributes: [
              "id",
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
        ],
      });
    }
    res.send(forumData);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const forumData = await Answer.findByPk(id, {
      include: [
        {
          model: Forum,
          attributes: ["id", "title", "deleteFlag"],
        },
        {
          model: User,
          attributes: [
            "id",
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
    let forumData = await Answer.findByPk(id);
    await forumData.update({
      comment: allBody.comment,
      like: [...forumData.like, allBody.like],
      deleteFlag: allBody.deleteFlag,
    });
    res.json("Commentario editado correctamente");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
