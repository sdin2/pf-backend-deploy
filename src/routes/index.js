require("dotenv").config();
const { Router } = require("express");
const { auth } = require("express-openid-connect");
const router = Router();

const newsRoute = require("./newsRoute");
const userRoute = require("./userRoute");
const genreRoute = require("./genreRoute");
const gamesRoute = require("./gamesRoute");
const forumRoute = require("./forumRoute");
const rewardRoute = require("./rewardRoute");

router.use("/news", newsRoute);
router.use("/users", userRoute);
router.use("/genre", genreRoute);
router.use("/games", gamesRoute);
router.use("/forum", forumRoute);
router.use("/reward", rewardRoute);

module.exports = router;
