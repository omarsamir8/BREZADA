import { NextResponse } from "next/server";
import News from "@/models/News";
import { connectDB } from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/authMiddleware";
import fs from "fs";
import path from "path";

// 🟢 تعديل خبر (PUT)
export async function PUT(req, context) {
  await connectDB();
  const { params } = context;
  const { id: newsId } = await params; // ✅ فك الـ params

  const check = await verifyAdmin(req);
  if (check instanceof NextResponse) return check;

  // دعم multipart/form-data
  const data = await req.formData();
  const author = data.get("author");
  const description = data.get("description");
  const imageFile = data.get("image");

  const updateData = { author, description };

  if (imageFile && imageFile.size > 0) {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${imageFile.name}`;
    const filePath = path.join(uploadDir, fileName);

    const arrayBuffer = await imageFile.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(arrayBuffer));
    updateData.image = `/uploads/${fileName}`;
  }

  const updated = await News.findByIdAndUpdate(newsId, updateData, { new: true, runValidators: true });
  if (!updated) return NextResponse.json({ message: "News not found" }, { status: 404 });

  return NextResponse.json({ message: "Updated successfully", news: updated });
}

// 🟢 مسح خبر (DELETE)
export async function DELETE(req, context) {
  await connectDB();
  const { params } = context;
  const { id: newsId } = await params;

  const check = await verifyAdmin(req);
  if (check instanceof NextResponse) return check;

  const deleted = await News.findByIdAndDelete(newsId);
  if (!deleted) return NextResponse.json({ message: "News not found" }, { status: 404 });

  return NextResponse.json({ message: "Deleted successfully" });
}

// 🟢 عرض خبر واحد (GET)
export async function GET(req, context) {
  await connectDB();
  const { params } = context;
  const { id: newsId } = await params;

  const news = await News.findById(newsId);
  if (!news) return NextResponse.json({ message: "News not found" }, { status: 404 });

  return NextResponse.json({ news });
}
