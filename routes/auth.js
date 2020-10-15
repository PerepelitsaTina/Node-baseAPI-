const express = require("express");
const auth = require("../controllers/auth");

const router = express.Router();

router.post("/register", auth.registration);
router.post("/login", auth.login);
// router.get("/me", auth.me);

module.exports = router;
