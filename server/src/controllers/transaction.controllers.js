const fetchTransactionsByDate = async (req, res) => {
  const data = req.body;
  return res.status(200).json(data);
};
const addTransaction = async (req, res) => {
  const data = req.body;
  return res.status(200).json(data);
};
const fetchTransactionsByMonth = async () => {};
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
