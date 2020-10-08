const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const db = require('./models/index');

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

app.get('/test', async (req, res) => {
  const isEmailExist = await db.User.findOne({
    where: {
      name: 'asdfasdf'
    }
  });

  if (isEmailExist) {
    console.log('this email is busy');
  } else {
    console.log('this email is free');
  }
})

app.post("/register", urlencodedParser, async (req, res) => {
  if (!req.body) {
   return res.status(400).send("Пустые поля");
  };
  const { fullname, email, birthday, password } = req.body;
  try {
    
    await db.User.create({
      fullname,
      email,
      birthday,
      password
    });
    res.json({
      message: "Регистрация прошла успешно"
    });
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
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (!user) {
      res.send("Указанный email не зарегистрирован");
    }
    if (password !== user.password) {
      res.json({
        message: "Неверный пароль!"
      })
    }
    
    res.send("Вы успешно авторизованы"); 
  } catch (err) {
    console.log(err);
  }
});


// db.User.create({
//   name: '',
//   email: 'example@example.com',
//   password: '123123',
//   birthday: '2020-10-08T16:39:16.474Z'
// })


app.listen(3000);

