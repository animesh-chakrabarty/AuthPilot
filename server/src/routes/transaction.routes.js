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
router.get("/recent", fetchRecentTransactions);
router.delete("/:transactionId", deleteTransactionById);
router.patch("/:transactionId", updateTransactionById);

module.exports = router;
