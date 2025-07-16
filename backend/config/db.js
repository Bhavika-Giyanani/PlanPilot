const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.log("Error Connecting Database", error);
  }
};
module.exports = connectDB;
