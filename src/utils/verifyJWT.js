const JWT = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (token) => {
  return JWT.verify(token, process.env.SECRET);
};

module.exports = verifyJWT;
