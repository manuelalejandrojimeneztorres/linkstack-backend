import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

async function resetDatabase() {
  await mongoose.connect(MONGODB_URI);

  const mode = process.argv[2];

  if (mode === "--full") {
    await mongoose.connection.db.dropDatabase();
    console.log("Database dropped completely.");
  } else {
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
      await collection.deleteMany({});
    }

    console.log("All collections cleared.");
  }

  process.exit(0);
}

resetDatabase().catch(console.error);
