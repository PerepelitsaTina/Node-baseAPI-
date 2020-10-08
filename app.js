const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});

// const User = sequelize.define("user", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     allowNull: false
//   },
//   fullname: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   birthday: {
//     type: Sequelize.DATE,
//     allowNull: false
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

// sequelize.sync().then(result => console.log(result))
// .catch(error => console.log(error));

// app.get("/register", (req, res) => {
//   res.sendFile(__dirname + "/public/register.html")
// });

app.post("/register", urlencodedParser, async (req, res) => {
  if (!req.body) {
   return res.status(400).send("Пустые поля");
  };
  const { fullname, email, birthday, password } = req.body;
  try {
    await User.create({
      fullname,
      email,
      birthday,
      password
    });
    res.send("Регистрация прошла успешно");
  } catch (error) {
    console.log(error);
  }
});

app.post("/authorization", urlencodedParser, async (req, res) => {
  if (!req.body) {
    res.status(400).send("Пустые поля")
  };
  const { email, password } = req.body;
  try {
    const user = await User.findOne({where: {email}});
    if (!user) {
      res.send("Указанный email не зарегистрирован");
    }
    if (password == user.password) {
      res.send("Вы успешно авторизованы");
    } else {
      res.send("Неверный пароль")
    }
  } catch (err) {
    console.log(err);
  }
});



app.listen(3000);

