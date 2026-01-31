"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";

type SvgDividerProps = {
  variant?: "line" | "wave";
  className?: string;
};

export function SvgDivider({ variant = "line", className }: SvgDividerProps) {
  const reducedMotion = useReducedMotion();

  if (variant === "wave") {
    return (
      <motion.svg
        viewBox="0 0 200 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-full max-w-[200px] mx-auto text-primary/25", className)}
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        aria-hidden
      >
        <path
          d="M0 6 Q50 0 100 6 T200 6"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </motion.svg>
    );
  }

  return (
    <motion.svg
      viewBox="0 0 80 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-px w-20 text-primary/25", className)}
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      aria-hidden
    >
      <path
        d="M0 1 L80 1"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}
