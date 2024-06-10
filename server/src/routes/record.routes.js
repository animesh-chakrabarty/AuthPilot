const express = require("express");
const {
  fetchRecords,
  addRecord,
} = require("../controllers/record.controllers");

const router = express.Router();

router.get("/:userId/:date", fetchRecords);
router.post("/:userId/:date", addRecord);

module.exports = router;
