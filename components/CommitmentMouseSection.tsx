"use client";

import Link from "next/link";
import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Info } from "lucide-react";

export function CommitmentMouseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { stiffness: 150, damping: 15 };
  const x = useSpring(mouseX, spring);
  const y = useSpring(mouseY, spring);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) * 0.08);
      mouseY.set((e.clientY - centerY) * 0.08);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovering(false);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      id="commitment"
      className="relative py-32 md:py-40 overflow-hidden bg-[var(--color-bg-soft)]"
      aria-labelledby="commitment-heading"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mouse-following spotlight / card */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ x, y }}
      >
        <div
          className="w-[min(90vw,520px)] h-[min(70vh,420px)] border border-white/10 bg-white/[0.03] backdrop-blur-sm rounded-sm"
          aria-hidden
        />
      </motion.div>

      <div className="container mx-auto max-w-4xl px-4 md:px-8 relative z-10 text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white block mb-6">
          What we stand for
        </span>
        <motion.span
          className="flex h-12 w-12 items-center justify-center border-2 border-white text-white mx-auto mb-8 [&_svg]:text-white"
          aria-hidden
        >
          <Info size={24} strokeWidth={2} className="text-white" />
        </motion.span>
        <h2 id="commitment-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-accent)] mb-8 tracking-tight pb-2 inline-block border-b-2 border-white">
          Our Commitment
        </h2>
        <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-3xl mx-auto">
          We are committed to empowering personal growth and promoting{" "}
          <strong className="text-white">inclusivity and sustainability</strong> through exceptional
          Erasmus+ student and staff mobility management. Proud of our high rate
          of repeat educational centres, we provide comprehensive support for{" "}
          <strong className="text-white">Erasmus+</strong> applications, ensuring a seamless and
          effective process.
        </p>
        <Link
          href="/about"
          className="mt-12 inline-flex items-center justify-center border-2 border-[var(--color-accent)] bg-[var(--color-accent)] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary-dark)] hover:bg-[var(--color-accent)]/90 transition-colors"
        >
          About Us
        </Link>
      </div>

      <div className="absolute bottom-20 left-1/4 w-48 h-48 border border-[var(--color-accent)]/50 pointer-events-none hidden md:block" aria-hidden />
      <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-[var(--color-accent)]/50 rounded-full pointer-events-none hidden md:block" aria-hidden />
    </section>
  );
}
