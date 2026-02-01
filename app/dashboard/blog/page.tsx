"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionContainer } from "@/components/ui/SectionContainer";
import type { BlogPost } from "@/lib/blog-data";
import { PenLine, Trash2, Plus, ArrowLeft, FileText } from "lucide-react";

export default function DashboardBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/blog", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(slug: string) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setDeleting(slug);
    try {
      const res = await fetch(`/api/blog/${encodeURIComponent(slug)}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Delete failed");
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    } catch {
      alert("Failed to delete post.");
    } finally {
      setDeleting(null);
    }
  }

  function formatDate(dateStr: string) {
    try {
      return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  }

  return (
    <>
      <PageHeader
        title="Blog"
        description="Create, edit, and delete blog posts"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Blog" }]}
        variant="default"
      />
      <section className="py-section sm:py-section-lg bg-[var(--color-bg-soft)]">
        <SectionContainer>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-white/70 hover:text-[var(--color-accent)] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none"
            >
              <ArrowLeft size={18} aria-hidden />
              Back to Dashboard
            </Link>
            <Link
              href="/dashboard/blog/new"
              className="btn-primary inline-flex items-center gap-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Plus size={18} aria-hidden />
              New post
            </Link>
          </div>

          {loading ? (
            <p className="text-white/60">Loading posts…</p>
          ) : posts.length === 0 ? (
            <div className="border border-white/10 bg-white/5 p-12 text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center border border-white/20 text-[var(--color-accent)] mb-4" aria-hidden>
                <FileText size={28} />
              </span>
              <p className="text-white/90 mb-4">No blog posts yet.</p>
              <Link href="/dashboard/blog/new" className="btn-primary inline-flex items-center gap-2">
                <Plus size={18} aria-hidden />
                Create your first post
              </Link>
            </div>
          ) : (
            <ul className="space-y-4" role="list">
              {posts.map((post) => (
                <li
                  key={post.slug}
                  className="border border-white/10 bg-white/5 p-6 flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <h2 className="font-heading text-headline font-semibold text-white tracking-[0.02em] truncate">
                      {post.title}
                    </h2>
                    <p className="text-sm text-white/60 mt-1">
                      {formatDate(post.date)} · {post.author}
                      {post.category && ` · ${post.category}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/dashboard/blog/${encodeURIComponent(post.slug)}/edit`}
                      className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors"
                    >
                      <PenLine size={16} aria-hidden />
                      Edit
                    </Link>
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors"
                    >
                      View
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.slug)}
                      disabled={deleting === post.slug}
                      className="inline-flex items-center gap-2 border border-red-400/50 px-4 py-2 text-sm font-medium text-red-300 hover:bg-red-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:opacity-50 transition-colors"
                      aria-label={`Delete ${post.title}`}
                    >
                      <Trash2 size={16} aria-hidden />
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SectionContainer>
      </section>
    </>
  );
}
