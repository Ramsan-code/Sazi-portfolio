import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ProfileImage from "@/app/models/profileImg";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") ?? "home";

    await dbConnect();
    const image = await ProfileImage.findOne({ page }).sort({ createdAt: -1 });

    if (!image) {
      return NextResponse.json({ url: "" });
    }

    return NextResponse.json({ url: image.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}