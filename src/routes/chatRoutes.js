const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const { Chat, User } = require("../db.js");

router.post("/", async (req, res, next) => {
  const chat = req.body;
  let idRoom = [chat.user1Id, chat.user2Id].sort().join("_");
  try {
    await Chat.findOrCreate({
      where: { id: idRoom },
    });
    let user1 = await User.findByPk(chat.user1Id);
    let user2 = await User.findByPk(chat.user2Id);
    let chatRoom = await Chat.findByPk(idRoom);
    await chatRoom.addUser(user1);
    await chatRoom.addUser(user2);
    res.send("chat creado correctamente");
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let chats = await Chat.findAll();
    res.send(chats);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  let id = req.params.id ? req.params.id : req.body.id;
  try {
    let chats = await Chat.findByPk(id);
    res.send(chats);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const id = req.params.id ? req.params.id : req.body.id;
  const allBody = req.body;
  try {
    let chatData = await Chat.findByPk(id);
    console.log(chatData)
    let userChat = [
      {
        userId: allBody.userId,
        messages: allBody.messages,
      },
    ];
    let chat = [...chatData.messages, userChat];
    await chatData.update({
      messages: chat,
      deleteFlag: allBody.deleteFlag,
    });
    res.status(200).json("messege modified");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
