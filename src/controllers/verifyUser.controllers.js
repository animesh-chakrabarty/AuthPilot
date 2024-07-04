const verifyOTP = require("../utils/verifyOTP");
const OTPModel = require("../models/OTP.models")

const verifyUser = async (req, res) => {
  const { userId } = req;
  const { OTP } = req.body;

  try {
    const isVerified = await verifyOTP(OTP, userId);

    if (!isVerified) {
      // delete OTP data from DB
      return res.status(400).json({ message: "OTP is incorrect" });
    }

    res.status(200).json({ message: "user is verified successfully" });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

module.exports = verifyUser;
