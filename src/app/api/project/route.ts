import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "@/app/models/Project";

// GET /api/project
// GET /api/project?category_id=xxx
// GET /api/project?subcategory_id=xxx
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category_id = searchParams.get("category_id");
    const subcategory_id = searchParams.get("subcategory_id");

    const filter: Record<string, any> = {};
    if (category_id) filter.category_id = category_id;
    if (subcategory_id) filter.subcategory_id = subcategory_id;

    const projects = await Project.find(filter)
      .populate("category_id", "name slug")
      .populate("subcategory_id", "name slug")
      .sort({ created_at: -1 });

    return NextResponse.json({ success: true, data: projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/project
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, category_id, subcategory_id, img, img_public_id, description, tools } = body;

    if (!name || !category_id || !img || !img_public_id || !description) {
      return NextResponse.json(
        { success: false, message: "name, category_id, img, img_public_id and description are required" },
        { status: 400 }
      );
    }

    const project = await Project.create({
      name,
      category_id,
      subcategory_id: subcategory_id || null,
      img,
      img_public_id,
      description,
      tools: tools || [],
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create project" },
      { status: 500 }
    );
  }
}