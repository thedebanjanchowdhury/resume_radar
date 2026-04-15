import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Database Initialization
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("CosmosDB Connected");
  } catch (error) {
    console.error("CosmosDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
