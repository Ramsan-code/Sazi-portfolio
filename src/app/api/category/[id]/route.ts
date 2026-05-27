import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Category from "@/app/models/Category";
import SubCategory from "@/app/models/Subcategory";
import { requireAdmin } from "@/lib/adminAuth";
import { getErrorMessage } from "@/lib/errors";

// GET /api/categories/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    // Also return subcategories that belong to this category
    const subcategories = await SubCategory.find({ category_id: id });

    return NextResponse.json(
      { success: true, data: { ...category.toObject(), subcategories } },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

// PUT /api/categories/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unauthorized = requireAdmin(req);
    if (unauthorized) return unauthorized;

    await connectDB();
    const { id } = await params;

    const body = await req.json();
    const { name, slug } = body;

    const category = await Category.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(slug && { slug }),
      },
      { new: true, runValidators: true }
    );

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: category }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: getErrorMessage(error, "Failed to update category") },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unauthorized = requireAdmin(req);
    if (unauthorized) return unauthorized;

    await connectDB();
    const { id } = await params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    // Delete all subcategories that belong to this category
    await SubCategory.deleteMany({ category_id: id });

    return NextResponse.json(
      { success: true, message: "Category and its subcategories deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to delete category" },
      { status: 500 }
    );
  }
}
