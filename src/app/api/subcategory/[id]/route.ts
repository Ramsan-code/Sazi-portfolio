import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SubCategory from "@/app/models/Subcategory";
import { requireAdmin } from "@/lib/adminAuth";
import { getErrorMessage } from "@/lib/errors";

// GET /api/subcategories/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const subcategory = await SubCategory.findById(id).populate(
      "category_id",
      "name slug"
    );

    if (!subcategory) {
      return NextResponse.json(
        { success: false, message: "Subcategory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: subcategory }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch subcategory" },
      { status: 500 }
    );
  }
}

// PUT /api/subcategories/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unauthorized = requireAdmin(req);
    if (unauthorized) return unauthorized;

    await dbConnect();
    const { id } = await params;

    const body = await req.json();
    const { name, slug, category_id } = body;

    const subcategory = await SubCategory.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(category_id && { category_id }),
      },
      { new: true, runValidators: true }
    ).populate("category_id", "name slug");

    if (!subcategory) {
      return NextResponse.json(
        { success: false, message: "Subcategory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: subcategory }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: getErrorMessage(error, "Failed to update subcategory") },
      { status: 500 }
    );
  }
}

// DELETE /api/subcategories/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unauthorized = requireAdmin(req);
    if (unauthorized) return unauthorized;

    await dbConnect();
    const { id } = await params;

    const subcategory = await SubCategory.findByIdAndDelete(id);

    if (!subcategory) {
      return NextResponse.json(
        { success: false, message: "Subcategory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Subcategory deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to delete subcategory" },
      { status: 500 }
    );
  }
}
