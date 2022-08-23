require("dotenv").config();
const { Router } = require("express");
const router = Router();
const newsRoute = require("./newsRoute");
const userRoute = require("./userRoute");
const genreRoute = require("./genreRoute");
const gamesRoute = require("./gamesRoute");

router.use("/news", newsRoute);
router.use("/users", userRoute);
router.use("/genre", genreRoute);
router.use("/games", gamesRoute);

module.exports = router;
