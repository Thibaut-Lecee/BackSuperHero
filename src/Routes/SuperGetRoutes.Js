const express = require("express");
const router = express.Router();
const { getAllHeros, getHeroByName } = require("../Controllers/SuperHero/SuperGet");

router.route("/allHeros").get(getAllHeros);
router.route("/oneHero").get(getHeroByName);


module.exports = router;