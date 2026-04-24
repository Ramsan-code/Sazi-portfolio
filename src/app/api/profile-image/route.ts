import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ProfileImage from "@/app/models/profileImg";

export async function GET() {
  try {
    await dbConnect();
    const image = await ProfileImage.findOne().sort({ createdAt: -1 });

    if (!image) {
      return NextResponse.json({ url: "" });
    }

    return NextResponse.json({ url: image.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}