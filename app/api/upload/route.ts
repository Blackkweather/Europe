import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { authOptions } from "@/lib/auth";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "blog");
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_EXT = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

function safeName(original: string): string {
  const ext = path.extname(original).toLowerCase();
  const safeExt = ALLOWED_EXT.includes(ext) ? ext : ".jpg";
  const base = Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  return base + safeExt;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  // Server receives Blob, not File (Next.js/Node FormData)
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const fileType = (file as Blob & { name?: string }).type;
  const fileName = (file as Blob & { name?: string }).name ?? "upload.jpg";
  if (fileType && !ALLOWED_TYPES.includes(fileType)) {
    return NextResponse.json(
      { error: "Invalid file type. Use JPEG, PNG, GIF, or WebP." },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 5 MB." },
      { status: 400 }
    );
  }

  if (file.size === 0) {
    return NextResponse.json({ error: "File is empty" }, { status: 400 });
  }

  const filename = safeName(fileName);
  const filepath = path.join(UPLOAD_DIR, filename);

  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Failed to save file. Check server permissions." },
      { status: 500 }
    );
  }

  const url = `/uploads/blog/${filename}`;
  return NextResponse.json({ url });
}
