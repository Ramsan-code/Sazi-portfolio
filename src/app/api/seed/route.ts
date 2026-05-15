import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Category from "@/app/models/Category";
import SubCategory from "@/app/models/Subcategory";

const categories = [
  { name: "Graphics Design", slug: "graphics-design" },
  { name: "Logo Design", slug: "logo-design" },
  { name: "Poster Design", slug: "poster-design" },
  { name: "Social Media", slug: "social-media" },
];

const subcategories = [
  { name: "Instagram Post", slug: "instagram-post" },
  { name: "Facebook Post", slug: "facebook-post" },
  { name: "LinkedIn Post", slug: "linkedin-post" },
  { name: "YouTube Thumbnail", slug: "youtube-thumbnail" },
];

// GET /api/seed
export async function GET() {
  try {
    await dbConnect();

    // Clear existing data
    await Category.deleteMany({});
    await SubCategory.deleteMany({});

    // Insert categories
    const insertedCategories = await Category.insertMany(categories);

    // Find Social Media category
    const socialMedia = insertedCategories.find(
      (c) => c.slug === "social-media"
    );

    if (!socialMedia) {
      return NextResponse.json(
        { success: false, message: "Social Media category not found" },
        { status: 500 }
      );
    }

    // Insert subcategories under Social Media
    const subDocs = subcategories.map((sub) => ({
      ...sub,
      category_id: socialMedia._id,
    }));

    const insertedSubcategories = await SubCategory.insertMany(subDocs);

    return NextResponse.json(
      {
        success: true,
        message: "Seeded successfully",
        data: {
          categories: insertedCategories,
          subcategories: insertedSubcategories,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Seed failed" },
      { status: 500 }
    );
  }
}