"use client";

import { motion, useReducedMotion } from "framer-motion";

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
  variant = "default",
}: PageHeaderProps) {
  const isCentered = variant === "centered" || variant === "hero";
  const reducedMotion = useReducedMotion();
  return (
    <header
      className="relative overflow-hidden bg-gradient-to-b from-[var(--color-primary)]/30 via-[var(--color-bg-soft)] to-[var(--color-bg-soft)] text-white py-8 sm:py-10 transition-colors duration-500"
      aria-labelledby="page-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className={isCentered ? "text-center max-w-3xl mx-auto" : ""}
          initial={reducedMotion ? false : fadeUp.initial}
          animate={reducedMotion ? undefined : fadeUp.animate}
          transition={{ ...transition, delay: 0.05 }}
        >
          <h1
            id="page-title"
            className="font-heading text-display font-semibold text-[var(--color-accent)] tracking-[0.02em] leading-tight"
          >
            {title}
          </h1>
          <motion.span
            className={isCentered ? "mt-6 block h-px w-16 mx-auto bg-gradient-to-r from-transparent via-[var(--color-accent)]/70 to-transparent" : "mt-4 block h-px w-14 bg-gradient-to-r from-[var(--color-accent)]/70 to-transparent"}
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
