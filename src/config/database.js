const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

console.log("🔍 MONGODB_URI:", process.env.MONGODB_URI); // Debugging Line

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("❌ MONGODB_URI is not defined in .env file!");
    }

    console.log("🔄 Connecting to MongoDB...");

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Increase timeout
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.error(`❌ Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
