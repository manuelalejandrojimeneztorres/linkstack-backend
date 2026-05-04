import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

async function cleanup() {
  await mongoose.connect(MONGODB_URI);

  const users = await mongoose.connection.db
    .collection("users")
    .find()
    .toArray();

  let removed = 0;

  for (const user of users) {
    if (!user.email || !user.handle) {
      await mongoose.connection.db
        .collection("users")
        .deleteOne({ _id: user._id });
      removed++;
    }
  }

  console.log(`Orphan records removed: ${removed}`);
  process.exit(0);
}

cleanup().catch(console.error);
