const moment = require("moment");
const TransactionModel = require("../models/transaction.models");

// add transaction - POST - /
const addTransaction = async (req, res) => {
  const currentTime = moment();
  const { userId } = req;

  // preprocessing of timestamp object
  const timeStamp_obj = {
    day: currentTime.format("DD"),
    month: currentTime.format("MM"),
    year: currentTime.format("YYYY"),
    time: currentTime.format("HH:mm:ss"),
  };

  req.body.timeStamp = timeStamp_obj;
  req.body.userId = userId;

  const data = req.body;

  try {
    const trasactionDetails = await TransactionModel.create(data);
    res.status(200).json(trasactionDetails);
  } catch (error) {
    res.status(500).json({ message: "Error adding transaction", error });
  }
};

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
      "timeStamp.day": date_obj.day,
      "timeStamp.month": date_obj.month,
      "timeStamp.year": date_obj.year,
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
      "timeStamp.month": month_obj.month,
      "timeStamp.year": month_obj.year,
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

// delete transaction by id - DEL - /:transactionId
const deleteTransactionById = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const deletedTransaction = await TransactionModel.findByIdAndDelete(
      transactionId
    );

    res.status(200).json({
      message: "Transaction deleted successfully",
      deletedTransaction,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting transaction", error });
  }
};

// update transaction by id - PATCH - /:transactionId
const updateTransactionById = async (req, res) => {
  const { transactionId } = req.params;
  const data = req.body;
  try {
    const updatedTransaction = await TransactionModel.findByIdAndUpdate(
      transactionId,
      data,
      { new: true }
    );

    res.status(200).json({
      message: "Transaction updated successfully",
      updatedTransaction,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating transaction", error });
  }
};

// fetch recent transactions - /recent
const fetchRecentTransactions = async (req, res) => {
  const { userId } = req;

  try {
    const recentTransactions = await TransactionModel.find({ userId }).sort({
      "timeStamp.year": -1,
      "timeStamp.month": -1,
      "timeStamp.day": -1,
      "timeStamp.time": -1,
    });

    res.status(200).json({ recentTransactions });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  fetchTransactionsByDate,
  addTransaction,
  fetchTransactionsByMonth,
  deleteTransactionById,
  fetchRecentTransactions,
  updateTransactionById,
};
