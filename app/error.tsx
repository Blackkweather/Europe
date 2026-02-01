"use client";

import { useEffect } from "react";
import Link from "next/link";
import { SectionContainer } from "../components/ui/SectionContainer";
import { Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="py-section-lg min-h-[60vh] flex items-center bg-[var(--color-bg-soft)]">
      <SectionContainer narrow className="text-center">
        <p className="font-heading text-5xl font-semibold text-white/20 tracking-[0.02em]">Error</p>
        <h1 className="mt-8 font-heading text-display font-semibold text-white tracking-[0.02em] leading-tight">
          Something went wrong
        </h1>
        <p className="mt-4 text-white/80 text-body-lg max-w-content mx-auto">
          We couldn’t load this page. You can try again or return home.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="btn-primary inline-flex items-center gap-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <RefreshCw size={18} aria-hidden="true" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 min-h-[48px] text-white/90 font-medium hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors duration-200"
          >
            <Home size={18} aria-hidden="true" />
            Home
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
