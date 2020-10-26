const express = require("express");
const router = express.Router();

const user = require("../controllers/user");
const isAuth = require("../middleware/isAuth");
const isValid = require("../middleware/isValid");
const schemes = require("../utils/schemes");

router.use(isAuth);

router.post("/", isValid({shape: schemes.registerValidator}), user.createUser);
router.get("/list", user.getAllUsers);
router.get("/:id", user.getUser);
router.patch("/:id", isValid({shape: schemes.updateValidator}), user.updateUser);
router.delete("/:id", user.deleteUser);

module.exports = router;
