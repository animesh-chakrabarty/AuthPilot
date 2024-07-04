const verifyJWT = require("../utils/verifyJWT");
const UserModel = require("../models/user.models");

const requireAuth = async (req, res, next) => {
  // extract the token from req header
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).json({ Error: "Authorization Header required" });
  }
  const token = authorization.split(" ")[1];
  try {
    // verify token - extract userId from payload
    const { payload: id } = verifyJWT(token);
    // find the user details from DB using userId
    const { _id } = await UserModel.findOne({ _id: id }).select("_id");
    // attach userId to req
    req.userId = _id;

    next();
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

module.exports = requireAuth;
