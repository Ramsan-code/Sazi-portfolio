import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import ProfileImage from "../../models/profileImg";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { image } = await req.json();

    const result = await cloudinary.uploader.upload(image, {
      folder: "profile",
    });

    const saved = await ProfileImage.create({
      url: result.secure_url,
    });

    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}