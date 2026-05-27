import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/db";
import { User } from "@/app/models/user";
import { ADMIN_COOKIE_NAME, signToken } from "@/lib/auth";
import { getErrorMessage } from "@/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    await dbConnect();

    const user = await User.findOne({ email, isActive: true });

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

    res.cookies.delete("admin_token");
    res.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/",
    });

    return res;
  } catch (err: unknown) {
    const message = getErrorMessage(err, "Server error.");
    const isMongoConnectionError =
      message.includes("Could not connect to any servers") ||
      message.includes("MONGODB_URI");

    return NextResponse.json(
      {
        message:
          process.env.NODE_ENV !== "production" && isMongoConnectionError
            ? "Database connection failed. Check MongoDB Atlas Network Access and MONGODB_URI."
            : "Server error.",
      },
      { status: 500 }
    );
  }
}
