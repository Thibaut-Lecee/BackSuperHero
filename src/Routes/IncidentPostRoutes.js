const express = require("express");
const router = express.Router();

const { incidentPost } = require("../Controllers/Incidents/IncidentPost");

router.route("/createIncident").post(incidentPost);

module.exports = router;
