const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
    },
    transactionType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("record", recordSchema);
