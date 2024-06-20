const userModel = require("../models/user.models");
const generateJWT = require("../utils/generateJWT");

const handleUserSignup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    // add user credentials to db
    const user = await userModel.signupUser(email, password, name);
    // generate token
    const token = generateJWT(user._id);
    res.status(200).json({ email, token });
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
