import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

async function migrate() {
  await mongoose.connect(MONGODB_URI);

  const users = await mongoose.connection.db
    .collection("users")
    .find()
    .toArray();

  for (const user of users) {
    if (typeof user.links === "string") {
      try {
        const parsed = JSON.parse(user.links);

        await mongoose.connection.db
          .collection("users")
          .updateOne({ _id: user._id }, { $set: { links: parsed } });

        console.log(`Migrated user ${user._id}`);
      } catch {
        console.warn(`Failed migration for user ${user._id}`);
      }
    }
  }

  process.exit(0);
}

migrate().catch(console.error);
