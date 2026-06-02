import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/lib/db";
import ProfileImage, { PageKey } from "@/app/models/profileImg";
import { requireAdmin } from "@/lib/adminAuth";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const unauthorized = requireAdmin(req);
    if (unauthorized) return unauthorized;

    const { image, page = "home" } = await req.json();

    // Validate page value
    if (!["home", "about"].includes(page)) {
      return NextResponse.json({ error: "Invalid page value. Must be 'home' or 'about'." }, { status: 400 });
    }

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
      folder: `portfolio/${page}`,
    });

    // Save URL to MongoDB — upsert by page key
    await dbConnect();
    await ProfileImage.findOneAndUpdate(
      { page: page as PageKey },
      { url: uploadRes.secure_url, publicId: uploadRes.public_id },
      { upsert: true, new: true }
    );

    // Invalidate Next.js cache for the relevant public page
    revalidatePath(page === "home" ? "/" : "/about");

    return NextResponse.json({ url: uploadRes.secure_url, page });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

