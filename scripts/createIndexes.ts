import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

async function createIndexes() {
  await mongoose.connect(MONGODB_URI);

  const db = mongoose.connection.db;

  await db.collection("users").createIndex({ email: 1 }, { unique: true });
  await db.collection("users").createIndex({ handle: 1 }, { unique: true });
  await db.collection("users").createIndex({ handle: 1 });

  console.log("Indexes created successfully.");

  process.exit(0);
}

createIndexes().catch(console.error);
