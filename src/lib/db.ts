import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

export default async function dbConnect() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }
    cachedConnection = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB || "sazi-portfolio",
    });
    console.log("MongoDB Connected");
    return cachedConnection;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
}
