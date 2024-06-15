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

router.get("/date/:date", fetchTransactionsByDate);
router.post("/date/:date", addTransaction);
router.get("/month/:month", fetchTransactionsByMonth);
router.delete("/:transactionId", deleteTransactionById);
router.patch("/:transactionId", updateTransactionById);
router.get("/recent", fetchRecentTransactions);

module.exports = router;
