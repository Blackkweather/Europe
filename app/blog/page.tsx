import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "../../components/ui/PageHeader";
import { SectionContainer } from "../../components/ui/SectionContainer";
import { getPosts } from "../../lib/blog";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | European Era – Erasmus+ & Mobility Insights",
  description:
    "Articles and insights on Erasmus+ mobilities, teacher training in Málaga, and international education.",
  openGraph: {
    title: "Blog | European Era",
    description: "Erasmus+ and mobility insights from European Era.",
  },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <PageHeader
        title="Blog"
        description="Insights on Erasmus+ mobilities, teacher training, and international education in Málaga"
        breadcrumbs={[{ label: "Blog" }]}
        variant="centered"
      />
      <section className="pt-6 sm:pt-8 pb-section sm:pb-section-lg bg-[var(--color-bg-soft)] text-left">
        <SectionContainer>
          <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 text-left" role="list">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block border border-white/10 bg-white/5 overflow-hidden transition-colors duration-200 hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary-dark)]"
                >
                  {post.image && (
                    <div className="relative aspect-video bg-white/5">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    {post.category && (
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)]">
                        {post.category}
                      </span>
                    )}
                    <h2 className="mt-3 font-heading text-headline font-semibold text-white group-hover:text-[var(--color-accent)] transition-colors line-clamp-2 tracking-[0.01em]">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-white/80 text-body-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-sm text-white/60">
                      <Calendar size={16} aria-hidden="true" />
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-[var(--color-accent)] font-medium text-sm transition-[gap] duration-200 group-hover:gap-2.5">
                      Read more
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </SectionContainer>
      </section>
    </>
  );
}
