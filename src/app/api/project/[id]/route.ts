import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "@/app/models/Project";
import cloudinary from "@/lib/cloudinary";

// GET /api/projects/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const project = await Project.findById(id)
      .populate("category_id", "name slug")
      .populate("subcategory_id", "name slug");

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const body = await req.json();
    const { name, category_id, subcategory_id, img, img_public_id, description, tools } = body;

    const existing = await Project.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    // If a new image is uploaded, delete the old one from Cloudinary
    if (img_public_id && img_public_id !== existing.img_public_id) {
      await cloudinary.uploader.destroy(existing.img_public_id);
    }

    const project = await Project.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(category_id && { category_id }),
        ...(subcategory_id !== undefined && { subcategory_id: subcategory_id || null }),
        ...(img && { img }),
        ...(img_public_id && { img_public_id }),
        ...(description && { description }),
        ...(tools && { tools }),
      },
      { new: true, runValidators: true }
    )
      .populate("category_id", "name slug")
      .populate("subcategory_id", "name slug");

    return NextResponse.json({ success: true, data: project }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    // Delete image from Cloudinary
    if (project.img_public_id) {
      await cloudinary.uploader.destroy(project.img_public_id);
    }

    return NextResponse.json(
      { success: true, message: "Project and image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete project" },
      { status: 500 }
    );
  }
}