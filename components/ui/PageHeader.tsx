"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = { label: string; href?: string };

type PageHeaderProps = {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  variant?: "default" | "centered" | "hero";
};

const fadeUp = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } };
const transition = { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] };

export function PageHeader({
  title,
  description,
  breadcrumbs,
  variant = "default",
}: PageHeaderProps) {
  const isCentered = variant === "centered" || variant === "hero";
  const reducedMotion = useReducedMotion();
  return (
    <header
      className="relative overflow-hidden bg-[var(--color-bg-soft)] text-white border-b border-white/10 py-16 sm:py-20"
      aria-labelledby="page-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            className="mb-6"
            initial={reducedMotion ? false : fadeUp.initial}
            animate={reducedMotion ? undefined : fadeUp.animate}
            transition={transition}
          >
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none transition-colors"
                >
                  Home
                </Link>
              </li>
              {breadcrumbs.map((item, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <ChevronRight size={16} className="text-white/60 shrink-0" aria-hidden />
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white font-medium" aria-current="page">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}
        <motion.div
          className={isCentered ? "text-center max-w-3xl mx-auto" : ""}
          initial={reducedMotion ? false : fadeUp.initial}
          animate={reducedMotion ? undefined : fadeUp.animate}
          transition={{ ...transition, delay: 0.05 }}
        >
          <h1
            id="page-title"
            className="font-heading text-display font-semibold text-white tracking-[0.02em] leading-tight"
          >
            {title}
          </h1>
          <motion.span
            className={isCentered ? "mt-6 block h-px w-16 mx-auto bg-white/30" : "mt-4 block h-px w-14 bg-white/30"}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            aria-hidden
          />
          {description && (
            <p className={`mt-4 text-body-lg text-white/90 leading-relaxed max-w-content ${isCentered ? "mx-auto" : ""}`}>
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </header>
  );
}
