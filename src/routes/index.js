require("dotenv").config();
const { Router } = require("express");
const router = Router();
const newsRoute = require("./newsRoute");
const userRoute = require("./userRoute");

router.use("/news", newsRoute);
router.use("/users", userRoute);

module.exports = router;
