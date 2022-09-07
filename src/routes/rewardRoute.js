const axios = require("axios");
const { Router } = require("express");
require("dotenv").config();
const { Reward } = require("../db");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    let getAllRewards = await Reward.findAll();
    res.send(getAllRewards);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let getRewardById = await Reward.findByPk(id);
    res.send(getRewardById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { title, price, image, recompenseType, available } = req.body;
  try {
    await Reward.create({
      title,
      price,
      image,
      recompenseType,
      available,
    });
    res.status(200).send("Recompense created successfully!");
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const dataPut = req.body;
  try {
    const findReward = await Reward.findByPk(id);
    await findReward.update({
      title: dataPut.title,
      price: dataPut.price,
      image: dataPut.image,
      recompenseType: dataPut.recompenseType,
      available: dataPut.available,
      deleteFlag: dataPut.deleteFlag,
    });
    res.status(200).json("Recompense update successfully!");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
