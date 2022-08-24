const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const { User, Forum } = require("../db.js");

// create user
router.post("/", async (req, res, next) => {
  const user = req.body;
  try {
    const userData = await User.findOne({
      where: { nickname: user.nickname },
    });
    if (user.email) {
      if (!userData) {
        const createUser = await User.findOrCreate({
          where: {
            email: user.email,
            nickname: user.nickname,
          },
        });
      } else {
        const createUser = await User.findOrCreate({
          where: {
            email: user.email,
            //1 1+123 1+123
            nickname: user.email,
          },
        });
      }
      res.send("user created");
    } else res.status(200).send("no se pudo crear el usuario");
  } catch (error) {
    next(error);
  }
});

// get all users
router.get("/", async (req, res, next) => {
  try {
    let email = req.query.email;
    const userData = await User.findAll({
      include: {
        model: Forum,
        attributes: ["id", "title", "deleteFlag"],
      },
    });
    if (email) {
      const userByEmail = userData.filter((e) => e.email === email);
      res.status(200).send(userByEmail);
    } else {
      res.send(userData);
    }
  } catch (error) {
    next(error);
  }
});

// get a user
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    const userData = await User.findByPk(id);
    console.log(userData);
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
