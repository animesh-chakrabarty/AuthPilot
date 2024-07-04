const verifyOTP = require("../utils/verifyOTP");
const OTPModel = require("../models/OTP.models");

const verifyUser = async (req, res) => {
  const { userId } = req;
  const { OTP } = req.body;

  try {
    const isVerified = await verifyOTP(OTP, userId);

    if (!isVerified) {
      return res.status(400).json({ message: "OTP is incorrect" });
    }

    // delete OTP data from DB
    const OTPDelConfirmation = await OTPModel.findOneAndDelete({ userId });
    
    res.status(200).json({ message: "user is verified successfully" });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

module.exports = verifyUser;
