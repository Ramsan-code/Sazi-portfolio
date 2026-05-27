import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "@/lib/adminAuth";
import { getErrorMessage } from "@/lib/errors";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST /api/project/upload
// Body: { image: "data:image/...;base64,..." }
export async function POST(req: NextRequest) {
  try {
    const unauthorized = requireAdmin(req);
    if (unauthorized) return unauthorized;

    const { image } = await req.json();

    if (!image) {
      return NextResponse.json(
        { success: false, message: "No image provided" },
        { status: 400 }
      );
    }

    if (
      typeof image !== "string" ||
      !/^data:image\/(png|jpe?g|webp|gif);base64,/i.test(image)
    ) {
      return NextResponse.json(
        { success: false, message: "Only png, jpg, webp, or gif images are allowed" },
        { status: 400 }
      );
    }

    const sizeInBytes = Math.ceil((image.split(",")[1]?.length || 0) * 0.75);
    if (sizeInBytes > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "Image must be smaller than 5MB" },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "portfolio/projects",
      resource_type: "image",
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          url: result.secure_url,
          public_id: result.public_id,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: getErrorMessage(error, "Upload failed") },
      { status: 500 }
    );
  }
}
