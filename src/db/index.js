const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

// connect DB
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(MONGO_URI);
    console.log(connectionInstance.connection.host);
  } catch (error) {
    console.log("MONGODB CONNECTION FAILED!!! \n", error.message);
    throw Error(error);
  }
};

module.exports = connectDB;
