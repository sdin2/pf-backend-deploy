const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

router.get("/:nickname", async (res, req) => {
  const nickname = req.params.nickname;
  const nicknameAvailable = await User.finOne({
    where: { nickname: nickname },
  });

  if (nicknameAvailable === null) {
    res.send(true);
  } else {
    res.send(false);
  }
});

module.exports = router;
