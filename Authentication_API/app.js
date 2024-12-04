const express = require("express");
const connectDB = require("./DB/connectDB");
const router = require("./Routes/User");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// using Middleware
app.use(express.json());

app.use("/", router);

const connectApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`App is running successfully at PORT ${PORT}`);
    });
  } catch (error) {}
};
connectApp();
