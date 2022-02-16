const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const auth = require("./auth")();

app.use(bodyParser.json());
app.use(auth.initialize());

module.exports = app;
