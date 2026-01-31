"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

type RevealImageProps = {
  children: ReactNode;
  className?: string;
  scaleIn?: boolean;
  delay?: number;
};

export function RevealImage({
  children,
  className,
  scaleIn = false,
  delay = 0,
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={
        reducedMotion
          ? false
          : { opacity: 0, y: 6 }
      }
      animate={
        reducedMotion
          ? {}
          : inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 6 }
      }
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 0.61, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
