const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const { User, Mission} = require("../db.js");

router.put("/:id", async (req, res, next) => {
    const id = req.params.id;
    const allBody = req.body;
    try {
      let userData = await User.findByPk(id);
      let missionData= await Mission.findByPk(allBody.missionId)
      
      await missionData.addUser(userData);  
      
      res.json("Mission added to user succesfuly!");
    } catch (error) {
      next(error);
    }
  });

  module.exports = router;
