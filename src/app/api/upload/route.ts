import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/lib/db";
import ProfileImage from "@/app/models/profileImg";
import { requireAdmin } from "@/lib/adminAuth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const unauthorized = requireAdmin(req);
    if (unauthorized) return unauthorized;

    const { image } = await req.json();

    if (
      typeof image !== "string" ||
      !/^data:image\/(png|jpe?g|webp|gif);base64,/i.test(image)
    ) {
      return NextResponse.json({ error: "Invalid image type" }, { status: 400 });
    }

    const sizeInBytes = Math.ceil((image.split(",")[1]?.length || 0) * 0.75);
    if (sizeInBytes > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be smaller than 5MB" }, { status: 400 });
    }

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
