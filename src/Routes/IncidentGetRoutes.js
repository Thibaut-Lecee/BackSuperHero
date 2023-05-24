const express = require("express");
const router = express.Router();
const { getAllIncidents } = require("../Controllers/Incidents/Incident");

router.route("/allIncidents").get(getAllIncidents);

module.exports = router;
