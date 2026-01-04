import dotenv from "dotenv";

dotenv.config();

const requiredEnv = ["PORT", "MONGO_URI"];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(` Missing required env variable: ${key}`);
    process.exit(1);
  }
});

const env = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV || "development"
};

export default env;
