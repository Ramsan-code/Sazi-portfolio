import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/lib/db";
import ProfileImage from "@/app/models/profileImg";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();

    // Upload to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(image, {
      folder: "portfolio",
    });

    // Save URL to MongoDB
    await dbConnect();
    await ProfileImage.findOneAndUpdate(
      {},
      { url: uploadRes.secure_url },
      { upsert: true, returnDocument: "after" }
    );

    return NextResponse.json({ url: uploadRes.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}