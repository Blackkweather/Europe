"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { BlogPostForm, type BlogPostFormValues } from "@/components/BlogPostForm";
import type { BlogPost } from "@/lib/blog-data";
import { ArrowLeft } from "lucide-react";

export default function DashboardBlogEditPage() {
  const router = useRouter();
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    fetch(`/api/blog/${encodeURIComponent(slug)}`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setPost)
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  async function handleSubmit(data: BlogPostFormValues) {
    const res = await fetch(`/api/blog/${encodeURIComponent(slug)}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        author: data.author,
        image: data.image || undefined,
        category: data.category || undefined,
        content: data.content,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error ?? "Failed to update post");
    }
    router.push("/dashboard/blog");
    router.refresh();
  }

  if (loading) {
    return (
      <>
        <PageHeader title="Edit post" breadcrumbs={[{ label: "Dashboard" }, { label: "Blog" }, { label: "Edit" }]} variant="default" />
        <section className="py-section bg-stone-50/80">
          <SectionContainer>
            <p className="text-neutral-500">Loading…</p>
          </SectionContainer>
        </section>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <PageHeader title="Not found" breadcrumbs={[{ label: "Dashboard" }, { label: "Blog" }]} variant="default" />
        <section className="py-section bg-stone-50/80">
          <SectionContainer>
            <p className="text-neutral-600 mb-4">Post not found.</p>
            <Link href="/dashboard/blog" className="text-primary font-medium hover:underline">
              Back to Blog
            </Link>
          </SectionContainer>
        </section>
      </>
    );
  }

  const defaultValues: BlogPostFormValues = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    date: post.date,
    author: post.author,
    image: post.image ?? "",
    category: post.category ?? "",
    content: post.content,
  };

  return (
    <>
      <PageHeader
        title="Edit post"
        description={post.title}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Blog", href: "/dashboard/blog" },
          { label: "Edit" },
        ]}
        variant="default"
      />
      <section className="py-section sm:py-section-lg bg-stone-50/80">
        <SectionContainer>
          <Link
            href="/dashboard/blog"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary font-medium mb-8 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-none"
          >
            <ArrowLeft size={18} aria-hidden />
            Back to Blog
          </Link>
          <div className="border border-neutral-200 bg-white p-8 sm:p-10">
            <BlogPostForm
              defaultValues={defaultValues}
              isEdit={true}
              onSubmit={handleSubmit}
              onCancel={() => router.push("/dashboard/blog")}
              submitLabel="Save changes"
            />
          </div>
        </SectionContainer>
      </section>
    </>
  );
}
