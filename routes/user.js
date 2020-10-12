const express = require("express");
const router = express.Router();
const user = require("../controllers/user");

router.post("/create-user", user.createUser);

router.get("/get-user/:id", user.getUser);

router.get("/get-all", user.getAllUsers);

router.patch("/update-user/:id", user.updateUser);

router.delete("/delete-user/:id", user.deleteUser);

module.exports = router;