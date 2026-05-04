import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

async function validate() {
  await mongoose.connect(MONGODB_URI);

  const users = await mongoose.connection.db
    .collection("users")
    .find()
    .toArray();

  let issues = 0;

  for (const user of users) {
    if (!user.email || !user.handle) {
      console.warn(`Missing required fields in user ${user._id}`);
      issues++;
    }

    try {
      JSON.parse(user.links);
    } catch {
      console.warn(`Invalid links format in user ${user._id}`);
      issues++;
    }
  }

  console.log(`Validation completed. Issues found: ${issues}`);
  process.exit(0);
}

validate().catch(console.error);
