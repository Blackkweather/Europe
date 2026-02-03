"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import type { BlogPost } from "@/lib/blog";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { year: "numeric" });
}

type WorkSectionProps = {
  posts: BlogPost[];
};

export function WorkSection({ posts }: WorkSectionProps) {

  return (
    <section id="work" className="py-24 relative overflow-hidden bg-[var(--color-primary-dark)]">
      <div className="container mx-auto max-w-6xl px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-white/40" />
            <div className="text-xs uppercase tracking-widest text-white/80">
              From the blog
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
              Our Latest
              <br />
              <span className="text-white/70">Insights</span>
            </h2>
            <Link
              href="/blog"
              className="inline-flex items-center border-2 border-white/20 hover:border-white hover:bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors group"
            >
              View all
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden border-2 border-white/20 mb-4 group-hover:border-white/50 transition-all duration-300">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-white/10" />
                  )}
                  <div className="absolute inset-0 bg-[var(--color-primary-dark)]/40 group-hover:bg-[var(--color-primary-dark)]/20 transition-colors" />
                  <div className="absolute top-4 right-4 border border-white/20 bg-black/40 px-3 py-1 text-xs uppercase tracking-widest text-white/90">
                    {formatDate(post.date)}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-black/60 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs uppercase tracking-widest text-white/80">Read more</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold tracking-tighter text-white group-hover:translate-x-2 transition-transform duration-300">
                  {post.title}
                </h3>
                <p className="text-white/70 group-hover:text-white/90 transition-colors mt-1 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="h-px w-0 bg-white group-hover:w-20 transition-all duration-300 mt-2" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute top-40 right-0 w-32 h-32 border border-white/10 hidden md:block" aria-hidden />
      <div className="absolute bottom-20 left-0 w-48 h-48 border border-white/5 hidden md:block" aria-hidden />
    </section>
  );
}
