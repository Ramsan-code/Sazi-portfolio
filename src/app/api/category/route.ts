import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Category from "@/app/models/Category";
import { requireAdmin } from "@/lib/adminAuth";
import { getErrorMessage } from "@/lib/errors";

// GET /api/categories
export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find().sort({ name: 1 });

    return NextResponse.json({ success: true, data: categories }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST /api/categories
export async function POST(req: NextRequest) {
  try {
    const unauthorized = requireAdmin(req);
    if (unauthorized) return unauthorized;

    await dbConnect();

    const body = await req.json();
    const { name, slug } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, message: "name and slug are required" },
        { status: 400 }
      );
    }

    const existing = await Category.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Category with this slug already exists" },
        { status: 409 }
      );
    }

    const category = await Category.create({ name, slug });

    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: getErrorMessage(error, "Failed to create category") },
      { status: 500 }
    );
  }
}
