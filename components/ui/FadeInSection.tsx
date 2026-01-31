"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

type FadeInSectionProps = {
  children: ReactNode;
  slideUp?: boolean;
  delay?: number;
  className?: string;
};

export function FadeInSection({
  children,
  slideUp = true,
  delay = 0,
  className,
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={
        reducedMotion ? false : { opacity: 0, y: slideUp ? 8 : 0 }
      }
      animate={
        reducedMotion ? {} : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: slideUp ? 8 : 0 }
      }
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
