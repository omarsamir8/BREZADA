import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/authMiddleware";
import fs from "fs";
import path from "path";

// 🟢 Create product
export const POST = async (req) => {
  await connectDB();
  const check = await verifyAdmin(req);
  if (check instanceof NextResponse) return check;

  const data = await req.formData();

  const name = data.get("name");
  const description = data.get("description");
  const price = Number(data.get("price"));
  const priceBeforeSale = data.get("priceBeforeSale") ? Number(data.get("priceBeforeSale")) : undefined;
  const brand = data.get("brand");
  const category = data.get("category");
  const imageFile = data.get("image"); // Blob

  let imagePath = "";
  if (imageFile && imageFile.size > 0) {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${imageFile.name}`;
    const filePath = path.join(uploadDir, fileName);

    const arrayBuffer = await imageFile.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(arrayBuffer));
    imagePath = `/uploads/${fileName}`;
  }

  const newProduct = await Product.create({
    name,
    description,
    price,
    priceBeforeSale,
    brand,
    category,
    image: imagePath,
  });

  return NextResponse.json({ message: "Product created", product: newProduct }, { status: 201 });
};

// 🟡 Get all products
export async function GET() {
  await connectDB();
  try {
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// 🟢 Get single, Update, Delete
export async function PUT(req, { params }) {
  await connectDB();
  const check = await verifyAdmin(req);
  if (check instanceof NextResponse) return check;

  const data = await req.json();
  const updated = await Product.findByIdAndUpdate(params.id, data, { new: true, runValidators: true });
  if (!updated) return NextResponse.json({ message: "Product not found" }, { status: 404 });

  return NextResponse.json({ message: "Updated successfully", product: updated });
}

export async function DELETE(req, { params }) {
  await connectDB();
  const check = await verifyAdmin(req);
  if (check instanceof NextResponse) return check;

  const deleted = await Product.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ message: "Product not found" }, { status: 404 });

  return NextResponse.json({ message: "Deleted successfully" });
}
