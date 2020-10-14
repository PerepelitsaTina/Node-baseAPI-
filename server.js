const app = require("./app");
const port = require("./config/index");

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log("Server is running on port: ", port);
});
