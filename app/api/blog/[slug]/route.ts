import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { readPosts, savePosts, slugFromTitle, type BlogPost } from "@/lib/blog-data";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const posts = readPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(request: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  let body: Partial<BlogPost>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const posts = readPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const current = posts[index];
  const newSlug = body.slug?.trim() ?? current.slug;
  if (newSlug !== slug && posts.some((p) => p.slug === newSlug)) {
    return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
  }
  const updated: BlogPost = {
    slug: newSlug,
    title: body.title != null ? String(body.title).trim() : current.title,
    excerpt: body.excerpt != null ? String(body.excerpt).trim() : current.excerpt,
    date: body.date != null ? String(body.date).trim() : current.date,
    author: body.author != null ? String(body.author).trim() : current.author,
    content: body.content != null ? String(body.content).trim() : current.content,
    image: body.image != null ? (body.image === "" ? undefined : String(body.image).trim()) : current.image,
    category: body.category != null ? (body.category === "" ? undefined : String(body.category).trim()) : current.category,
  };
  posts[index] = updated;
  savePosts(posts);
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  if (updated.slug !== slug) revalidatePath(`/blog/${updated.slug}`);
  revalidatePath("/");
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const posts = readPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  posts.splice(index, 1);
  savePosts(posts);
  revalidatePath("/blog");
  revalidatePath("/");
  return new NextResponse(null, { status: 204 });
}
