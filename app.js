const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const jsonParser = express.json();

app.use(jsonParser);

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));

app.listen(3000, () => {
  console.log("Server is running");
});

