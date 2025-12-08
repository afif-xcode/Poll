const mongoose = require("mongoose");
// FIX: You must call .config() as a function with parentheses
require("dotenv").config();

const URI = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    // It's good practice to check if the URI exists before connecting
    if (!URI) {
      throw new Error("MONGO_URI is missing from environment variables");
    }
    await mongoose.connect(URI);
    console.log("Connected to MongoDB database server");
  } catch (error) {
    // IMPROVEMENT: Log the actual error object to see *why* it failed
    console.error(
      "Error connecting to MongoDB database server:",
      error.message
    );

    // Optional: Exit process with failure if DB connection is vital for the app
    process.exit(1);
  }
};

module.exports = connectDB;
