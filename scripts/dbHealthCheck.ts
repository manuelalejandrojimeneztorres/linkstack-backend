import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

async function healthCheck() {
  try {
    const start = Date.now();

    await mongoose.connect(MONGODB_URI);

    const ping = await mongoose.connection.db.admin().ping();

    const duration = Date.now() - start;

    console.log("Database reachable:", ping.ok === 1);
    console.log(`Response time: ${duration}ms`);

    process.exit(0);
  } catch (error) {
    console.error("Database health check failed:", error);
    process.exit(1);
  }
}

healthCheck();
