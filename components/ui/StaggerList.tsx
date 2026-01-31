"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, Children, type ReactNode } from "react";

type StaggerListProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  blurFadeIn?: boolean;
};

const itemVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
};

const itemVariantsBlur = {
  initial: { opacity: 0, filter: "blur(6px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
};

export function StaggerList({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0,
  blurFadeIn = false,
}: StaggerListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();
  const items = Children.toArray(children);
  const variants = reducedMotion ? undefined : (blurFadeIn ? itemVariantsBlur : itemVariants);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={
        reducedMotion
          ? undefined
          : { animate: { transition: { staggerChildren: staggerDelay, delayChildren } } }
      }
      initial="initial"
      animate={inView ? "animate" : "initial"}
    >
      {items.map((child, i) => (
        <motion.div
          key={i}
          variants={variants}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
