const express = require("express");
const {
  handleUserSignup,
  handleUserLogin,
} = require("../controllers/user.controllers");

const router = express.Router();

router.post("/user-signup", handleUserSignup);
router.post("/user-login", handleUserLogin);

module.exports = router;
