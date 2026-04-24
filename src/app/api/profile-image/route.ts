import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ProfileImage from "../../models/profileImg";

export async function GET() {
  await dbConnect();

  const image = await ProfileImage.findOne().sort({ createdAt: -1 });

  return NextResponse.json({
    url: image?.url || "",
  });
}