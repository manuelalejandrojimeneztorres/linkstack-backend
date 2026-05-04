import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

interface IUser {
  name: string;
  email: string;
  handle: string;
  password: string;
  role: "admin" | "user";
}

const userSchema = new mongoose.Schema<IUser>({
  name: String,
  email: { type: String, unique: true },
  handle: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
});

const User = mongoose.model<IUser>("User", userSchema);

async function seedAdmin() {
  await mongoose.connect(MONGODB_URI);

  const existingAdmin = await User.findOne({ role: "admin" });

  if (existingAdmin) {
    console.log("Admin user already exists. Skipping seed.");
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash("Admin123!", 12);

  const admin = new User({
    name: "System Administrator",
    email: "admin@linkstack.io",
    handle: "admin",
    password: passwordHash,
    role: "admin",
  });

  await admin.save();

  console.log("Admin user created successfully.");
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error("Error seeding admin:", err);
  process.exit(1);
});
