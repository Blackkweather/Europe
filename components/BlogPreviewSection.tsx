"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

type BlogPreviewSectionProps = {
  posts: BlogPost[];
};

export function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="blog"
      className="relative py-32 md:py-40 overflow-hidden bg-[var(--color-primary-dark)]"
      aria-labelledby="blog-heading"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white block mb-4">
              From the blog
            </span>
            <h2 id="blog-heading" className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--color-accent)]">
              Our Latest Insights
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center border-2 border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)] transition-colors group w-fit"
          >
            View all
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden border-2 border-[var(--color-accent)]/30 mb-6 group-hover:border-[var(--color-accent)]/60 transition-all duration-300">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-white/10" />
                  )}
                  <div className="absolute inset-0 bg-[var(--color-bg-soft)]/30 group-hover:bg-[var(--color-bg-soft)]/10 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 text-white/70 line-clamp-2 text-sm">{post.excerpt}</p>
                <time className="mt-4 block text-xs text-white/90" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
