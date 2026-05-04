import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  handle: String,
  password: String,
  links: String,
});

const User = mongoose.model("User", userSchema);

function generateMockUser(index: number) {
  return {
    name: `Test User ${index}`,
    email: `user${index}@example.com`,
    handle: `user${index}`,
    password: "mocked_password_hash",
    links: JSON.stringify([
      {
        name: "github",
        url: `https://github.com/user${index}`,
        enabled: true,
        id: 1,
      },
    ]),
  };
}

async function seedMockData() {
  await mongoose.connect(MONGODB_URI);

  const users = Array.from({ length: 10 }, (_, i) => generateMockUser(i + 1));

  await User.insertMany(users);

  console.log("Mock data inserted.");
  process.exit(0);
}

seedMockData().catch(console.error);
