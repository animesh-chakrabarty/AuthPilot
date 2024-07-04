const JWT = require("jsonwebtoken");
require("dotenv").config();

const generateJWT = (payload) => {
  const token = JWT.sign({ payload }, process.env.SECRET, { expiresIn: "30d" });

  return token;
};

module.exports = generateJWT;
