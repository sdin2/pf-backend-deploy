const axios = require("axios");
const express = require("express");
const router = express.Router();
const { Mission, User } = require("../db.js");

router.post("/", async (req, res, next) => {
  const { name, description, coinsRewards, icon } = req.body;
  try {
    Mission.create({
      name,
      description,
      coinsRewards,
      icon,
    });
    res.status(200).json("Mission created succesfuly!");
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let name = req.query.name ? req.query.name : req.query.body;
    let missionData = await Mission.findAll({
      include: {
        model: User,
        attributes: [
          "nickname",
          "img",
          "deleteFlag",
          "bannedFlag",
        ],
      },
    });
    if (name) {
      missionData = missionData.filter((e) => e.name.includes(name));
    }
    res.send(missionData);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const missionData = await Mission.findByPk(id, {
      include: {
        model: User,
        attributes: [
          "nickname",
          "img",
          "deleteFlag",
          "bannedFlag",
        ],
      },
    });
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
