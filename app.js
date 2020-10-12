const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));

module.exports = app;