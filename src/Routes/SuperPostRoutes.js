const express = require("express");
const router = express.Router();
const { createSuperHero } = require("../Controllers/SuperHero/SuperPost");

router.route("/createHero").post(createSuperHero);

module.exports = router;
