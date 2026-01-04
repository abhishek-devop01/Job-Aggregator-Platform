import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log(" MongoDB connected successfully");
  } catch (error) {
    console.error(" MongoDB connection failed");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
