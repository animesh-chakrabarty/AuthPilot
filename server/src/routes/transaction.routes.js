const express = require("express");
const {
  fetchTransactionsByDate,
  addTransaction,
  fetchTransactionsByMonth,
  deleteTransactionById,
  fetchRecentTransactions,
  updateTransactionById,
} = require("../controllers/transaction.controllers");

const router = express.Router();

router.get("/:date", fetchTransactionsByDate);
router.post("/:date", addTransaction);
router.get("/:month", fetchTransactionsByMonth);
router.delete("/:transactionId", deleteTransactionById);
router.get("/recent", fetchRecentTransactions);
router.patch("/:transactionId", updateTransactionById);

module.exports = router;
