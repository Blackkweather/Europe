"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { BlogPostForm, type BlogPostFormValues } from "@/components/BlogPostForm";
import { ArrowLeft } from "lucide-react";

export default function DashboardBlogNewPage() {
  const router = useRouter();

  async function handleSubmit(data: BlogPostFormValues) {
    const res = await fetch("/api/blog", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        slug: (data.slug && data.slug.trim()) ? data.slug.trim() : undefined,
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
      throw new Error(err.error ?? "Failed to create post");
    }
    router.push("/dashboard/blog");
    router.refresh();
  }

  return (
    <>
      <PageHeader
        title="New post"
        description="Create a new blog post"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Blog", href: "/dashboard/blog" },
          { label: "New post" },
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
              defaultValues={{
                title: "",
                slug: "",
                excerpt: "",
                date: new Date().toISOString().slice(0, 10),
                author: "European Era Team",
                image: "",
                category: "",
                content: "",
              }}
              isEdit={false}
              onSubmit={handleSubmit}
              onCancel={() => router.push("/dashboard/blog")}
              submitLabel="Create post"
            />
          </div>
        </SectionContainer>
      </section>
    </>
  );
}
