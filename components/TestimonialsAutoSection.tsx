"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonialsData } from "@/lib/content";

const AUTO_ADVANCE_MS = 6000;

export function TestimonialsAutoSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const testimonials = [...testimonialsData];
  const total = testimonials.length;
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();
    setProgress(0);
  }, [activeIndex]);

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const p = Math.min(elapsed / AUTO_ADVANCE_MS, 1);
      setProgress(p);
      if (p >= 1) {
        setActiveIndex((i) => (i + 1) % total);
        startTimeRef.current = Date.now();
      }
    };
    const id = setInterval(tick, 80);
    return () => clearInterval(id);
  }, [activeIndex, total]);

  return (
    <section
      id="testimonials"
      className="relative py-32 md:py-40 overflow-hidden bg-[var(--color-bg-soft)]"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto max-w-4xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white block mb-4">
            Our internship students
          </span>
          <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--color-accent)]">
            What Our Clients Say About Us
          </h2>
        </motion.div>

        <motion.div
          layout
          className="relative border-2 border-[var(--color-accent)]/30 bg-white/5 backdrop-blur-sm p-8 md:p-12 min-h-[280px]"
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="text-xl md:text-2xl font-medium text-white/95 leading-relaxed"
            >
              &ldquo;{testimonials[activeIndex].quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
          <footer className="mt-8">
            <cite className="not-italic font-bold text-[var(--color-accent)]">
              {testimonials[activeIndex].author}
            </cite>
            <span className="text-white/70">, {testimonials[activeIndex].org}</span>
          </footer>

          {/* Progress bars: one per testimonial */}
          <div className="flex gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="flex-1 h-1.5 bg-white/20 overflow-hidden rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <div
                  className="h-full bg-[var(--color-accent)] origin-left rounded-full transition-transform duration-75"
                  style={{
                    transform: i === activeIndex ? `scaleX(${progress})` : i < activeIndex ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
