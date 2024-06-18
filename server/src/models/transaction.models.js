const mongoose = require("mongoose");

const timeStampSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});
const transactionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: timeStampSchema,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("transaction", transactionSchema);
