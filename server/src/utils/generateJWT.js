const JWT = require("jsonwebtoken");
require("dotenv").config();

const generateJWT = (id) => {
  const token = JWT.sign({ id }, process.env.SECRET, { expiresIn: "30d" });

  return token;
};

module.exports = generateJWT;
