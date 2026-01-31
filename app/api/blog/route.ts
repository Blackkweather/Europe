import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { readPosts, savePosts, slugFromTitle, type BlogPost } from "@/lib/blog-data";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const posts = readPosts().sort((a, b) => (b.date > a.date ? 1 : -1));
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: Omit<BlogPost, "slug"> & { slug?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { title, excerpt, date, author, image, content, category } = body;
  if (!title || !excerpt || !date || !author || !content) {
    return NextResponse.json(
      { error: "Missing required fields: title, excerpt, date, author, content" },
      { status: 400 }
    );
  }
  const slug = body.slug?.trim() || slugFromTitle(title);
  const posts = readPosts();
  if (posts.some((p) => p.slug === slug)) {
    return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
  }
  const newPost: BlogPost = {
    slug,
    title: String(title).trim(),
    excerpt: String(excerpt).trim(),
    date: String(date).trim(),
    author: String(author).trim(),
    content: String(content).trim(),
    ...(image != null && String(image).trim() && { image: String(image).trim() }),
    ...(category != null && String(category).trim() && { category: String(category).trim() }),
  };
  posts.push(newPost);
  try {
    savePosts(posts);
  } catch (err) {
    console.error("Failed to save blog posts:", err);
    return NextResponse.json(
      { error: "Could not save post. Check that the server can write to the data folder." },
      { status: 500 }
    );
  }
  revalidatePath("/blog");
  revalidatePath("/");
  return NextResponse.json(newPost, { status: 201 });
}
