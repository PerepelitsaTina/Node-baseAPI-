const express = require("express");
const auth = require("../controllers/auth");
const isAuth = require("../middleware/isAuth");

const router = express.Router();


router.post("/register", auth.registration);
router.post("/login", auth.login);
router.get("/me", isAuth, auth.me);

module.exports = router;
