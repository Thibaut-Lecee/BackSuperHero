const express = require("express");
const router = express.Router();
const {
  createSuperHero,
  loginSuperHero,
} = require("../Controllers/SuperHero/SuperPost");

router.route("/createHero").post(createSuperHero);
router.route("/loginHero").post(loginSuperHero);

module.exports = router;
