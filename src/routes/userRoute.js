const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const { User } = require("../db.js");

// create user
router.post("/", async (req, res, next) => {
  const user = req.body;
  try {
    if (user.name) {
      const createUser = await User.findOrCreate({
        where: {
          email: user.name,
          nickname: user.nickname,
        },
      });
      res.send(createUser);
    } else res.status(400).send("user null");
  } catch (error) {
    next(error);
  }
});

// get all users
router.get("/", async (req, res, next) => {
  try {
    const userData = await User.findAll();
    res.send(userData);
  } catch (error) {
    next(error);
  }
});

// get a user
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  try {
    const userData = User.findByPk(id);
    res.send(userData);
  } catch (error) {
    next(error);
  }
});

// update a user
router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const allBody = req.body;
  try {
    let userData = await User.findByPk(id);
    await userData.update({
      nickname: allBody.nickname,
      email: allBody.email,
      img: allBody.img,
      deleteFlag: allBody.deleteFlag,
      bannedFlag: allBody.bannedFlag,
      password: allBody.password,
      matched_users: allBody.matched_users,
      coins: allBody.coins,
      favoriteGames: allBody.favoriteGames,
      servers: allBody.servers,
      missionCompleted: allBody.missionCompleted,
      isAdmin: allBody.isAdmin,
      rating: allBody.rating,
      plan: allBody.plan,
    });
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
