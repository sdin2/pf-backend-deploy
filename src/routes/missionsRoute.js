const axios = require("axios");
const express = require("express");
const router = express.Router();
const { Mission, User } = require("../db.js");

router.post("/", async (req, res, next) => {
  const { name, description, coinsRewards } = req.body;
  try {
    let userDb = await User.findOne({
      where: { nickname: forum.nickname },
    });
    Mission.create({
      name,
      description,
      coinsRewards,
      userId: userDb.dataValues.id,
    });
    res.status(200).json("Mission created succesfuly!");
  } catch (error) {}
});

router.get("/", async (req, res, next) => {
  try {
    let name = req.query.name;
    const missionData = await Mission.findAll({
      include: {
        model: User,
        attributes: [
          "nickname",
          "img",
          "deleteFlag",
          "bannedFlag",
          "missionCompleted",
        ],
      },
    });
    if (name) {
      const getMissionsByName = missionData.filter((e) =>
        e.name.includes(name)
      );
      res.status(200).send(getMissionsByName);
    } else {
      res.send(missionData);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const missionData = await Mission.findByPk(id);
    res.send(missionData);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const allBody = req.body;
  try {
    let missionData = await Forum.findByPk(id);
    await missionData.update({
      name: allBody.name,
      description: allBody.description,
      coinsRewards: allBody.coinsRewards,
    });
    res.json("Mission updated succesfuly!");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
