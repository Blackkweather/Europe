"use client";

import Link from "next/link";
import { SectionContainer } from "../components/ui/SectionContainer";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="py-section-lg min-h-[60vh] flex items-center bg-stone-50">
      <SectionContainer narrow className="text-center">
        <p className="font-heading text-6xl font-semibold text-primary/15 tracking-[0.02em]">404</p>
        <h1 className="mt-8 font-heading text-display font-semibold text-neutral-900 tracking-[0.02em] leading-tight">
          Page not found
        </h1>
        <p className="mt-4 text-neutral-600 text-body-lg max-w-content mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Home size={18} aria-hidden="true" />
            Home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 border border-neutral-300 px-6 py-3 min-h-[48px] text-neutral-700 font-medium hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Go back
          </button>
        </div>
      </SectionContainer>
    </section>
  );
}
