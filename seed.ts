import mongoose from "mongoose";
import bcrypt from "bcrypt";

const MONGO_URI = "mongodb://lajee001_db_user:YMB3c21sZ2iftqaD@ac-uqpiaq2-shard-00-00.0skyeub.mongodb.net:27017,ac-uqpiaq2-shard-00-01.0skyeub.mongodb.net:27017,ac-uqpiaq2-shard-00-02.0skyeub.mongodb.net:27017/?ssl=true&replicaSet=atlas-pg9kjk-shard-0&authSource=admin&appName=Cluster0";

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("✓ Connected to MongoDB");

  const UserSchema = new mongoose.Schema({
    name:     { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  }, { timestamps: true });

  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  const exists = await User.findOne({ email: "admin@example.com" });
  if (exists) {
    console.log("⚠️  Admin already exists. Skipping.");
    await mongoose.disconnect();
    return;
  }

  await User.create({
    name: "Super Admin",
    email: "admin@example.com",
    password: await bcrypt.hash("Admin@1234", 10),
    isActive: true,
  });

  console.log("✓ Admin seeded: admin@example.com / Admin@1234");
  await mongoose.disconnect();
}

seed().catch(console.error);