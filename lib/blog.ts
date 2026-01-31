import { readPosts, savePosts, slugFromTitle, type BlogPost } from "./blog-data";

export type { BlogPost } from "./blog-data";

export function getPosts(): BlogPost[] {
  return readPosts().sort((a, b) => (b.date > a.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return readPosts().find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return readPosts().map((p) => p.slug);
}

export { readPosts, savePosts, slugFromTitle };
