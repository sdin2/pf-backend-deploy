const { axios } = require("axios");
const express = require("express");
const router = express.Router();
const { Answer, Forum, User } = require("../db.js");

router.post("/", async (req, res, next) => {
  const idForo = req.body.idForo ? req.body.idForo : req.query.idForo;
  const idUser = req.body.idUser ? req.body.idUser : req.query.idUser;
  const forum = req.body;
  try {
    await Answer.create({
      comment: forum.comment,
      forumId: idForo,
      userId: idUser,
    });
    res.send("Comment posted!");
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const forumData = await Answer.findAll({
      include: {
        model: Forum,
        attributes: ["id", "title", "deleteFlag"],
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
      like: allBody.like,
      deleteFlag: allBody.deleteFlag,
    });
    res.json("Commentario editado correctamente");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
