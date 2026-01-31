"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { BlogPost } from "@/lib/blog-data";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .optional()
    .refine((v) => !v || /^[a-z0-9-]+$/.test(v), "Slug must be lowercase letters, numbers, and hyphens only"),
  excerpt: z.string().min(1, "Excerpt is required"),
  date: z.string().min(1, "Date is required"),
  author: z.string().min(1, "Author is required"),
  image: z.string().optional(),
  category: z.string().optional(),
  content: z.string().min(1, "Content is required"),
});

export type BlogPostFormValues = z.infer<typeof schema>;

type BlogPostFormProps = {
  defaultValues?: Partial<BlogPostFormValues>;
  isEdit?: boolean;
  onSubmit: (data: BlogPostFormValues) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
};

export function BlogPostForm({
  defaultValues,
  isEdit = false,
  onSubmit,
  onCancel,
  submitLabel,
}: BlogPostFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BlogPostFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? {
      title: "",
      slug: "",
      excerpt: "",
      date: new Date().toISOString().slice(0, 10),
      author: "European Era Team",
      image: "",
      category: "",
      content: "",
    },
  });

  const imageUrl = watch("image");

  async function handleFormSubmit(data: BlogPostFormValues) {
    setSubmitError(null);
    try {
      await onSubmit(data);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Upload failed");
      }
      const data = await res.json();
      if (data.url) {
        setValue("image", data.url, { shouldValidate: false });
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {submitError && (
        <p className="text-sm text-red-300 bg-red-500/10 border border-red-400/30 px-4 py-3" role="alert">
          {submitError}
        </p>
      )}
      <div>
        <label htmlFor="blog-title" className="block text-sm font-medium text-white/80 mb-2">
          Title *
        </label>
        <input
          id="blog-title"
          type="text"
          {...register("title")}
          className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
          placeholder="Erasmus+ in Málaga: A Complete Guide"
        />
        {errors.title && (
          <p className="mt-1.5 text-sm text-red-300" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="blog-slug" className="block text-sm font-medium text-white/80 mb-2">
          Slug (optional – auto-generated from title if empty)
        </label>
        <input
          id="blog-slug"
          type="text"
          {...register("slug")}
          className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px] font-mono text-sm"
          placeholder="erasmus-plus-malaga-guide"
        />
        {errors.slug && (
          <p className="mt-1.5 text-sm text-red-300" role="alert">
            {errors.slug.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="blog-excerpt" className="block text-sm font-medium text-white/80 mb-2">
          Excerpt *
        </label>
        <textarea
          id="blog-excerpt"
          rows={2}
          {...register("excerpt")}
          className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none resize-y min-h-[80px]"
          placeholder="Short summary for listings and SEO"
        />
        {errors.excerpt && (
          <p className="mt-1.5 text-sm text-red-300" role="alert">
            {errors.excerpt.message}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="blog-date" className="block text-sm font-medium text-white/80 mb-2">
            Date *
          </label>
          <input
            id="blog-date"
            type="date"
            {...register("date")}
            className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
          />
          {errors.date && (
            <p className="mt-1.5 text-sm text-red-300" role="alert">
              {errors.date.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="blog-author" className="block text-sm font-medium text-white/80 mb-2">
            Author *
          </label>
          <input
            id="blog-author"
            type="text"
            {...register("author")}
            className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
            placeholder="European Era Team"
          />
          {errors.author && (
            <p className="mt-1.5 text-sm text-red-300" role="alert">
              {errors.author.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Featured image (optional)
        </label>
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center justify-center gap-2 border border-white/20 px-4 py-3 min-h-[48px] font-medium text-white/80 hover:bg-white/10 focus-within:ring-2 focus-within:ring-[var(--color-accent)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--color-primary-dark)] cursor-pointer transition-colors">
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                className="sr-only"
                disabled={uploading}
                onChange={handleFileChange}
              />
              {uploading ? "Uploading…" : "Upload from computer"}
            </label>
            <span className="text-sm text-white/60">JPEG, PNG, GIF or WebP, max 5 MB</span>
          </div>
          {uploadError && (
            <p className="text-sm text-red-300" role="alert">
              {uploadError}
            </p>
          )}
          <p className="text-sm text-white/70">Or paste an image URL (optional):</p>
          <input
            id="blog-image"
            type="text"
            {...register("image")}
            className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
            placeholder="Upload above, or paste a link (e.g. https://...)"
          />
          {imageUrl && (
            <div className="mt-2">
              <p className="text-xs text-white/60 mb-1">Preview:</p>
              <img
                src={imageUrl}
                alt=""
                className="max-w-full max-h-48 object-cover border border-white/10 bg-white/5"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="blog-category" className="block text-sm font-medium text-white/80 mb-2">
          Category (optional)
        </label>
        <input
          id="blog-category"
          type="text"
          {...register("category")}
          className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
          placeholder="Student Mobility"
        />
      </div>

      <div>
        <label htmlFor="blog-content" className="block text-sm font-medium text-white/80 mb-2">
          Content * (supports **bold** and ## headings)
        </label>
        <textarea
          id="blog-content"
          rows={14}
          {...register("content")}
          className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none resize-y min-h-[320px] font-mono text-sm"
          placeholder="Write your post content here..."
        />
        {errors.content && (
          <p className="mt-1.5 text-sm text-red-300" role="alert">
            {errors.content.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary min-h-[48px] px-6 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="border border-white/20 px-6 py-3 min-h-[48px] font-medium text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-60 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
