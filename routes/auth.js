const express = require("express");
const auth = require("../controllers/auth");
const isAuth = require("../middleware/isAuth");
const isValid = require("../middleware/isValid");
const schemes = require("../utils/schemes");

const router = express.Router();

router.post("/register", isValid({shape: schemes.addAndUpdate}), auth.registration);
router.post("/login", isValid({shape: schemes.login}), auth.login);
router.get("/me", isAuth, auth.me);

module.exports = router;
