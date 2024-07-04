const express = require("express");
const verifyUser = require("../controllers/verifyUser.controllers");

const router = express.Router();

router.post("/", verifyUser);

module.exports = router;
