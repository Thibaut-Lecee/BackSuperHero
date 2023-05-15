// Code source du serveur
const express = require("express");
const corsOptions = require('./src/config/corsOptions')
const port = process.env.PORT || 3000;
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/heros', require("./src/Routes/SuperGetRoutes"));

app.listen(port, () => {
    console.log(`Server is listening on port : ${port}`);
});
    