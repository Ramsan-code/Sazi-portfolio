import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/db";
import { User } from "@/app/models/user";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    await dbConnect();

    // DEBUG — remove after fixing
    const allUsers = await User.find({});
    console.log("ALL USERS IN DB:", JSON.stringify(allUsers, null, 2));
    console.log("LOOKING FOR EMAIL:", email);

    const user = await User.findOne({ email, isActive: true });
    console.log("FOUND USER:", user);

    if (!user) {
      return NextResponse.json({ message: "Access denied." }, { status: 403 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    }

    const token = signToken(user._id.toString());

    const res = NextResponse.json({
      message: "Login successful.",
      admin: { id: user._id, name: user.name, email: user.email },
    });

    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/",
    });

    return res;
  } catch (err) {
    console.log("ERROR:", err);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}