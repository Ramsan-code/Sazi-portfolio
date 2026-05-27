import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";

const MONGO_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "sazi-portfolio";
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;

async function seed() {
  if (!MONGO_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error(
      "MONGODB_URI, SEED_ADMIN_EMAIL, and SEED_ADMIN_PASSWORD are required"
    );
  }

  await mongoose.connect(MONGO_URI, { dbName: MONGODB_DB });
  console.log("✓ Connected to MongoDB");

  const UserSchema = new mongoose.Schema({
    name:     { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  }, { timestamps: true });

  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  const exists = await User.findOne({ email: ADMIN_EMAIL });
  if (exists) {
    console.log("⚠️  Admin already exists. Skipping.");
    await mongoose.disconnect();
    return;
  }

  await User.create({
    name: "Super Admin",
    email: ADMIN_EMAIL,
    password: await bcrypt.hash(ADMIN_PASSWORD, 10),
    isActive: true,
  });

  console.log(`✓ Admin seeded: ${ADMIN_EMAIL}`);
  await mongoose.disconnect();
}

seed().catch(console.error);
