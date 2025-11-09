const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://fanendrachoudhary51_db_user:5bzb7XWDILn3ATer@cluster0.ohh3j56.mongodb.net/"
    );
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

// fanendrachoudhary51_db_user;

// 5bzb7XWDILn3ATer
