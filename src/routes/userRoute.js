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
      if (!userData) {
        await User.findOrCreate({
          where: {
            email: user.email,
            nickname: user.nickname,
          },
        });
      } else {
        await User.findOrCreate({
          where: {
            email: user.email,
            //1 1+123 1+123
            nickname: user.email,
          },
        });
      }
      res.send("user created");
    } else res.send("fail to create a user");
  } catch (error) {
    console.log(error);
  }
});

// get all users
router.get("/", async (req, res, next) => {
  try {
    let email = req.query.email;
    console.log(email);
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
  console.log(id, allBody);
  try {
    let userData = await User.findByPk(id);
    if (allBody.delete === false) {
      userData.favoriteGames.push(allBody.favoriteGames);
      // allBody.favoriteGames.flat(Infinity);
    } else if (allBody.delete === true) {
      allBody.favoriteGames = userData.favoriteGames.filter(
        (e) => !e.allBody.favoriteGames
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
