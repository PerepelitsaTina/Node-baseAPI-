const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const isAuth = require("../middleware/isAuth");

router.use(isAuth);

router.post("/", user.createUser);
router.get("/list", user.getAllUsers);
router.get("/:id", user.getUser);
router.patch("/:id", user.updateUser);
router.delete("/:id", user.deleteUser);

module.exports = router;
