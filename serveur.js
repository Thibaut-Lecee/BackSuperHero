// Code source du serveur
const express = require("express");
const corsOptions = require("./src/config/corsOptions");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());

app.use("/assets", express.static(path.join(__dirname + "/public")));
app.use("/api/heros", require("./src/Routes/SuperGetRoutes"));
app.use("/api/heros", require("./src/Routes/SuperPostRoutes"));
app.use("/api/incidents", require("./src/Routes/IncidentGetRoutes"));
app.use("/api/interventions", require("./src/Routes/InterventionGetRoutes"));
app.use("/api/incidents", require("./src/Routes/IncidentPostRoutes"));
app.listen(port, () => {
  console.log(`Server is listening on port : ${port}`);
});
