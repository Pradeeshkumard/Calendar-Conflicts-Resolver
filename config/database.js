const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDatabase = async () => {
  try {
    const connectDB = await mongoose.connect(process.env.Mongo_URI);
    console.log("Database connected sucessfully");
  } catch (err) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
