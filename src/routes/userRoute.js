const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const { User, Forum } = require("../db.js");

// create user
router.post("/", async (req, res, next) => {
  const user = req.body;
  try {
    if (user.nickname) {
      const userData = await User.findOne({
        where: { nickname: user.nickname },
      });
      await User.findOrCreate({
        where: {
          email: user.email,
          nickname: !userData ? user.nickname : user.email,
        },
      });
      res.send("user created");
    } else res.send("fail to create a user");
  } catch (error) {
    console.log(error);
  }
});

// get all users
router.get("/", async (req, res, next) => {
  try {
    let email = req.query.email ? req.query.email : req.body.email;
    let nickname = req.query.nickname ? req.query.nickname : req.body.nickname;
    const userData = await User.findAll({
      include: {
        model: Forum,
        attributes: ["id", "title", "deleteFlag"],
      },
    });
    if (email) {
      const userByEmail = userData.filter((e) => e.email === email);
      res.status(200).send(userByEmail);
    } else if (nickname) {
      const userByEmail = userData.filter((e) => e.email === email);
      res.status(200).send(userByEmail);
    } else res.send(userData);
  } catch (error) {
    next(error);
  }
});

// get a user
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const userData = await User.findByPk(id);
    res.send(userData);
  } catch (error) {
    next(error);
  }
});

// update a user
router.put("/:id", async (req, res, next) => {
  const id = req.params.id ? req.params.id : req.body.id;
  const allBody = req.body;
  try {
    let userData = await User.findByPk(id);
    if (allBody.delete === false) {
      userData.favoriteGames = [...userData.favoriteGames, allBody.favorite];
    } else if (allBody.delete === true) {
      userData.favoriteGames = userData.favoriteGames.filter(
        (e) => e !== allBody.favorite
      );
    }
    await userData.update({
      nickname: allBody.nickname,
      email: allBody.email,
      img: allBody.img,
      deleteFlag: allBody.deleteFlag,
      bannedFlag: allBody.bannedFlag,
      password: allBody.password,
      matched_users: allBody.matched_users,
      coins: allBody.coins,
      favoriteGames: userData.favoriteGames,
      servers: allBody.servers,
      missionCompleted: allBody.missionCompleted,
      isAdmin: allBody.isAdmin,
      rating: allBody.rating,
      plan: allBody.plan,
    });

    res.status(200).json("user updated");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
