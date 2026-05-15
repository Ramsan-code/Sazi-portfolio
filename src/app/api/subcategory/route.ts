import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SubCategory from "@/app/models/Subcategory";

// GET /api/subcategories
// GET /api/subcategories?category_id=xxx
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category_id = searchParams.get("category_id");

    const filter: Record<string, string> = {};
    if (category_id) filter.category_id = category_id;

    const subcategories = await SubCategory.find(filter)
      .populate("category_id", "name slug")
      .sort({ name: 1 });

    return NextResponse.json({ success: true, data: subcategories }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch subcategories" },
      { status: 500 }
    );
  }
}

// POST /api/subcategories
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { category_id, name, slug } = body;

    if (!category_id || !name || !slug) {
      return NextResponse.json(
        { success: false, message: "category_id, name and slug are required" },
        { status: 400 }
      );
    }

    const existing = await SubCategory.findOne({ category_id, slug });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Subcategory with this slug already exists in this category" },
        { status: 409 }
      );
    }

    const subcategory = await SubCategory.create({ category_id, name, slug });

    return NextResponse.json({ success: true, data: subcategory }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create subcategory" },
      { status: 500 }
    );
  }
}