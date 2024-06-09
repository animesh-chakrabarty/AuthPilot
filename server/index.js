const express = require("express");
const connectDB = require("./src/db");
const router = require("./src/routes/record.routes");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use("/api/records", router);

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
