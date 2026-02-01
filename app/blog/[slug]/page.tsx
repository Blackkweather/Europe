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
    <div className="article-content w-full text-left">
      {paragraphs.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="font-heading text-headline mt-10 mb-4 text-white tracking-[0.02em] text-left first:mt-0">
              {block.slice(3)}
            </h2>
          );
        }
        const parts = block.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
        return (
          <p key={i} className="mb-6 text-body-lg text-white/90 leading-relaxed text-left max-w-none">
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
      <section className="pt-6 sm:pt-8 pb-section sm:pb-section-lg bg-[var(--color-bg-soft)]">
        <SectionContainer>
          <article className="w-full max-w-3xl text-left">
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
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
            </header>
            {post.image && (
              <div className="relative aspect-video w-full overflow-hidden mb-10 border border-white/10 bg-white/5 rounded-sm">
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
            <div className="w-full">
              <PostContent content={post.content} />
            </div>
            <footer className="mt-12 pt-8 border-t border-white/10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[var(--color-accent)] font-medium hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none"
              >
                <ArrowLeft size={18} aria-hidden="true" />
                Back to Blog
              </Link>
            </footer>
          </article>
        </SectionContainer>
      </section>
    </>
  );
}
