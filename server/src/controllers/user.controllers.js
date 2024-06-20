const userModel = require("../models/user.models");
const OTPModel = require("../models/OTP.models");
const generateJWT = require("../utils/generateJWT");
const generateOTP = require("../utils/generateOTP");
const sendMail = require("../utils/sendMail");

const handleUserSignup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    // add user credentials to db
    const user = await userModel.signupUser(email, password, name);
    // generate token
    const token = generateJWT(user._id);
    // generate OTP
    const OTP = generateOTP();
    // save OTP to DB
    const OTPDetails = await OTPModel.create({
      OTP,
      userId: user._id,
      expiresIn: "24H",
    });
    // send mail
    const info = await sendMail(email, OTP);
    res.status(200).json({
      email,
      token,
      message: `We've sent an email with an OTP to ${email}. Enter the OTP below to verify `,
    });
  } catch (error) {
    console.error("Signup error: ", error.message);
    res.status(400).json({ Error: error.message });
  }
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // find existing user in DB & match password
    const user = await userModel.loginUser(email, password);
    // generate token
    const token = generateJWT(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

module.exports = { handleUserSignup, handleUserLogin };
