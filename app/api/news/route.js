import { NextResponse } from "next/server";
import News from "@/models/News";
import { connectDB } from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/authMiddleware";
import fs from "fs";
import path from "path";

// 🟢 Create News
export const POST = async (req) => {
  await connectDB();
  const check = await verifyAdmin(req);
  if (check instanceof NextResponse) return check;

  const data = await req.formData();

  const author = data.get("author");
  const description = data.get("description");
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

  const newNews = await News.create({
    author,
    description,
    image: imagePath,
  });

  return NextResponse.json({ message: "News created", news: newNews }, { status: 201 });
};

// 🟡 Get all news
export async function GET() {
  await connectDB();
  try {
    const news = await News.find();
    return NextResponse.json({ news });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
