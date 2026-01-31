"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, Children, type ReactNode } from "react";

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  slideUp?: boolean;
};

export function StaggerReveal({
  children,
  className,
  staggerDelay = 0.08,
  delayChildren = 0,
  slideUp = true,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();
  const items = Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <motion.div
          key={i}
          initial={
            reducedMotion ? false : { opacity: 0, y: slideUp ? 8 : 0 }
          }
          animate={
            reducedMotion
              ? {}
              : inView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: slideUp ? 8 : 0 }
          }
          transition={{
            duration: 0.65,
            delay: delayChildren + i * staggerDelay,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
