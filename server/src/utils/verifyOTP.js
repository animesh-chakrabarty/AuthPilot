const OTPModel = require("../models/OTP.models");

const verifyOTP = async (OTP, userId) => {
  const { OTP: OTPRetrieved } = await OTPModel.findOne({ userId }).select(
    "OTP"
  );

  return OTP == OTPRetrieved;
};

module.exports = verifyOTP;
