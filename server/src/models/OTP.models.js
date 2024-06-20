const mongoose = require("mongoose");

const OTPSchema = mongoose.Schema({
  OTP: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  expiresIn: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("otp", OTPSchema);
