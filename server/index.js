const express = require("express");
const connectDB = require("./src/db");
require("dotenv").config();

const userRouter = require("./src/routes/user.routes");
const transactionRouter = require("./src/routes/transaction.routes");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api", userRouter);
app.use("/api/transactions/:userId", transactionRouter);

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
