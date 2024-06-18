const TransactionModel = require("../models/transaction.models");

// fetch transactions by date - GET - date/:date
const fetchTransactionsByDate = async (req, res) => {
  const { date } = req.params;
  const { userId } = req;

  const [day, month, year] = date.split("-");
  const date_obj = {
    day,
    month,
    year,
  };
  try {
    const listOfTransactions = await TransactionModel.find({
      userId,
      "date.day": date_obj.day,
      "date.month": date_obj.month,
      "date.year": date_obj.year,
    });
    // if user have no transactions
    if (!listOfTransactions.length) {
      return res.status(200).json({
        message: `User has no transaction on ${date_obj.day}/${date_obj.month}/${date_obj.year}`,
      });
    }
    res.status(200).json(listOfTransactions);
  } catch (error) {
    res.status(500).json({ message: "error retriving transactions", error });
  }
};

// add transaction - POST - date/:date
const addTransaction = async (req, res) => {
  const { date } = req.params;
  const { userId } = req;
  // preprocessing of date
  const [day, month, year] = date.split("-");
  const date_obj = {
    day,
    month,
    year,
  };

  req.body.date = date_obj;
  req.body.userId = userId;
  const data = req.body;
  const trasactionDetails = await TransactionModel.create(data);
  res.status(200).json(trasactionDetails);
};

// fetch transaction by month - GET  - month/:month
const fetchTransactionsByMonth = async (req, res) => {
  const { userId } = req;
  const { month: monthFromParam } = req.params;
  const [month, year] = monthFromParam.split("-");
  const month_obj = {
    month,
    year,
  };

  try {
    const listOfTransactionsByMonth = await TransactionModel.find({
      userId,
      "date.month": month_obj.month,
      "date.year": month_obj.year,
    });

    if (!listOfTransactionsByMonth.length) {
      return res.status(200).json({
        msg: `User has no transaction on month ${month_obj.month}/${month_obj.year}`,
      });
    }
    res.status(200).json(listOfTransactionsByMonth);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving transactions", err });
  }
};

const deleteTransactionById = async () => {};
const fetchRecentTransactions = async () => {};
const updateTransactionById = async () => {};

module.exports = {
  fetchTransactionsByDate,
  addTransaction,
  fetchTransactionsByMonth,
  deleteTransactionById,
  fetchRecentTransactions,
  updateTransactionById,
};
