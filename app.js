const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./utils/errorHandler");
const app = express();

app.use(bodyParser.json());

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));

app.use((err, req, res, next) => errorHandler(err, req, res));

module.exports = app;
