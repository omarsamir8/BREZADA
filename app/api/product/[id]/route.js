import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/authMiddleware";

export async function GET(req, context) {
  await connectDB();
  const params = await context.params;
  const { id } = params;

  try {
    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req, context) {
  await connectDB();
  const params = await context.params;
  const { id } = params;

  const check = await verifyAdmin(req);
  if (check instanceof NextResponse) return check;

  try {
    const data = await req.json();
    const updated = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!updated) return NextResponse.json({ message: "Product not found" }, { status: 404 });
    return NextResponse.json({ message: "Updated successfully", product: updated });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(req, context) {
  await connectDB();
  const params = await context.params;
  const { id } = params;

  const check = await verifyAdmin(req);
  if (check instanceof NextResponse) return check;

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ message: "Product not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
