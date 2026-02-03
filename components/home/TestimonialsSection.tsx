"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { testimonialsData } from "@/lib/content";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = [...testimonialsData];
  const total = testimonials.length;

  const next = () => setActiveIndex((i) => (i + 1) % total);
  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);

  return (
    <section className="py-24 relative overflow-hidden bg-[var(--color-primary-dark)]">
      <div className="container mx-auto max-w-6xl px-4 md:px-8 relative z-10">
        <SectionHeader
          label="Our internship students"
          title="What Our Clients"
          subtitle="Say About Us"
        />

        <div className="max-w-4xl mx-auto">
          <motion.div
            layout
            className="relative border-2 border-white/20 bg-white/5 backdrop-blur-sm p-8 md:p-12"
          >
            <div className="absolute top-6 right-8 text-white/10 opacity-60" aria-hidden>
              <Quote size={120} />
            </div>

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <blockquote className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed mb-8">
                    &ldquo;{testimonials[activeIndex].quote}&rdquo;
                  </blockquote>
                  <footer>
                    <cite className="not-italic font-bold text-white">
                      {testimonials[activeIndex].author}
                    </cite>
                    <span className="text-white/70">, {testimonials[activeIndex].org}</span>
                  </footer>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between mt-10">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 transition-all duration-300 ${
                      i === activeIndex ? "w-8 bg-[var(--color-accent)]" : "w-1.5 bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="p-2 border border-white/20 hover:border-white/50 hover:bg-white/5 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                <button
                  onClick={next}
                  className="p-2 border border-white/20 hover:border-white/50 hover:bg-white/5 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute top-40 right-20 w-56 h-56 border border-white/5 hidden md:block" aria-hidden />
      <div className="absolute bottom-20 left-10 w-32 h-32 border-2 border-white/10 hidden md:block" aria-hidden />
    </section>
  );
}
