const fs = require("fs");

const logRequest = (req, res, next) => {
  fs.appendFile(
    "./log.txt",
    `REQ Method: ${req.method} || REQ path: ${req.path} || REQ IP : ${req.ip}\n`,
    (error, data) => {
      !error && next();
    }
  );
};

module.exports = logRequest;
