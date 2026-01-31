"use client";

import { usePathname } from "next/navigation";
import { useScroll, useTransform, motion } from "framer-motion";

/**
 * Thin progress bar at top: fills as user scrolls. Only on home (deck) for journey feel.
 */
export function ScrollProgressBar() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (pathname !== "/") return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-0.5 origin-left bg-primary"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
