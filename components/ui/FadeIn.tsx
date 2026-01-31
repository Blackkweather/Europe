"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  /** Delay in seconds */
  delay?: number;
  /** Slight upward motion when true */
  slideUp?: boolean;
  /** Show a minimal SVG line that draws in (e.g. under headings) */
  withLine?: boolean;
  /** Line color class (e.g. text-primary, text-white) */
  lineClass?: string;
  className?: string;
};

const defaultTransition = { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] };

export function FadeIn({
  children,
  delay = 0,
  slideUp = true,
  withLine = false,
  lineClass = "text-primary",
  className,
}: FadeInProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : { opacity: 0, y: slideUp ? 12 : 0 }
      }
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...defaultTransition, delay }}
      className={className}
    >
      {children}
      {withLine && (
        <motion.svg
          viewBox="0 0 120 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`mt-4 h-1 w-24 overflow-visible ${lineClass}`}
          initial={reducedMotion ? false : { pathLength: 0, opacity: 0.8 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...defaultTransition, delay: delay + 0.15 }}
          aria-hidden
        >
          <motion.path
            d="M0 2h120"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={reducedMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ ...defaultTransition, delay: delay + 0.15 }}
          />
        </motion.svg>
      )}
    </motion.div>
  );
}
