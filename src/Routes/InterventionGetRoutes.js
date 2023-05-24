const express = require("express");
const router = express.Router();
const {
  getAllInterventions,
} = require("../Controllers/Interventions/Interventions");

router.route("/allInterventions").get(getAllInterventions);

module.exports = router;
