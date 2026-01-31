import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "../../../components/ui/PageHeader";
import { SectionContainer } from "../../../components/ui/SectionContainer";
import { getPostBySlug, getPostSlugs } from "../../../lib/blog";
import { Calendar, ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post | European Era" };
  return {
    title: `${post.title} | European Era Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
    },
  };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** Simple markdown-like: **bold** and paragraphs */
function PostContent({ content }: { content: string }) {
  const paragraphs = content.trim().split("\n\n");
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-heading prose-headings:font-semibold prose-headings:text-white prose-headings:tracking-[0.02em] prose-p:text-white/90 prose-p:leading-relaxed prose-strong:text-[var(--color-accent)]">
      {paragraphs.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="font-heading text-headline mt-10 mb-4 text-white tracking-[0.02em]">
              {block.slice(3)}
            </h2>
          );
        }
        const parts = block.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
        return (
          <p key={i} className="mb-6 text-body-lg text-white/90 leading-relaxed">
            {parts.map((part, j) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={j} className="text-[var(--color-accent)]">{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <PageHeader
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
        variant="default"
      />
      <section className="py-section sm:py-section-lg bg-[var(--color-primary-dark)]">
        <SectionContainer narrow>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-10">
            <time dateTime={post.date} className="flex items-center gap-1.5">
              <Calendar size={16} aria-hidden="true" />
              {formatDate(post.date)}
            </time>
            {post.author && <span>{post.author}</span>}
            {post.category && (
              <span className="border border-white/20 px-3 py-0.5 text-[var(--color-accent)] font-medium text-sm">
                {post.category}
              </span>
            )}
          </div>
          {post.image && (
            <div className="relative aspect-video overflow-hidden mb-12 border border-white/10 bg-white/5">
              <Image
                src={post.image}
                alt=""
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
          )}
          <PostContent content={post.content} />
          <p className="mt-12 pt-8 border-t border-white/10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[var(--color-accent)] font-medium hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              Back to Blog
            </Link>
          </p>
        </SectionContainer>
      </section>
    </>
  );
}
