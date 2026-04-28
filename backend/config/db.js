import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error("Please check if your MONGODB_URI is correct in the .env file and your IP is whitelisted in MongoDB Atlas.");
    process.exit(1);
  }
};


export default connectDB;

