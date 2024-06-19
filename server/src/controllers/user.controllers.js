const userModel = require("../models/user.models");

const handleUserSignup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await userModel.signupUser(email, password, name);
    res.status(200).json({ user });
  } catch (error) {
    console.error("Signup error: ", error.message);
    res.status(400).json({ Error: error.message });
  }
};

const handleUserLogin = async () => {};

module.exports = { handleUserSignup, handleUserLogin };
