const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const authMiddleware = require("../middleware/auth");

router.post("/create-user", authMiddleware, user.createUser);

router.get("/get-user/:id", authMiddleware, user.getUser);

router.get("/get-all", authMiddleware, user.getAllUsers);

router.patch("/update-user/:id", authMiddleware, user.updateUser);

router.delete("/delete-user/:id", authMiddleware, user.deleteUser);

module.exports = router;