export const runtime = "nodejs";
import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import User from "@/models/User";

// 🟢 تعديل يوزر
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params; // id من URL
    const body = await req.json(); // البيانات الجديدة

    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// 🔴 مسح يوزر
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
