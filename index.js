const express = require("express");
const connectDB = require("./src/db");
require("dotenv").config();

const userRouter = require("./src/routes/user.routes");
const transactionRouter = require("./src/routes/transaction.routes");
const verifyUserRouter = require("./src/routes/verifyUser.routes");
const logRequest = require("./src/middlewares/log");
const requireAuth = require("./src/middlewares/requireAuth");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(logRequest);
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/verify", requireAuth, verifyUserRouter);
app.use("/api/users/transactions", requireAuth, transactionRouter);

// connect mongoDB
connectDB()
  .then(() => {
    // if db connection successfull listen to port
    app.listen(PORT, () => {
      console.log(`listening to port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("CONNECTION FAILED!!! \n", error.message);
    process.exit(1);
  });
