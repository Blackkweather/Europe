"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const chapters = [
  {
    id: "enquire",
    number: "01",
    title: "Enquire",
    subtitle: "Get in touch",
    body: "We align on your goals, participants, and timeline for Erasmus+ mobility or teacher training.",
    cta: "Contact us",
    href: "/contact",
  },
  {
    id: "plan",
    number: "02",
    title: "Plan",
    subtitle: "We design the programme",
    body: "Placements, accommodation, transport, and cultural activities in Málaga—tailored to your needs.",
    cta: "Our services",
    href: "/#services",
  },
  {
    id: "arrive",
    number: "03",
    title: "Arrive",
    subtitle: "From arrival to orientation",
    body: "We support coordinators and participants so everyone feels prepared from day one.",
    cta: "Our commitment",
    href: "/our-commitment",
  },
  {
    id: "experience",
    number: "04",
    title: "Experience & Evaluate",
    subtitle: "Learn and grow",
    body: "Ongoing support during the mobility or training, then evaluation and documentation so you get the most from the programme.",
    cta: "Testimonials",
    href: "/#testimonials",
  },
];

export function JourneySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section
      ref={ref}
      id="journey"
      className="relative py-32 md:py-40 overflow-hidden bg-[var(--color-bg-soft)]"
      aria-labelledby="journey-heading"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/20" aria-hidden />
      <motion.div
        className="absolute left-0 top-0 w-px bg-[var(--color-accent)] origin-top"
        style={{ scaleY: lineProgress }}
        aria-hidden
      />

      <div className="container mx-auto max-w-6xl px-4 md:px-8 relative z-10">
        <motion.h2
          id="journey-heading"
          className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          The Journey
        </motion.h2>
        <motion.p
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-24 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          From first enquiry to final evaluation.
        </motion.p>

        <div className="space-y-24 md:space-y-32">
          {chapters.map((chapter, index) => (
            <motion.article
              key={chapter.id}
              id={chapter.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <div className="lg:col-span-4">
                <span className="text-6xl md:text-7xl font-bold text-[var(--color-accent)]/70 block mb-4">
                  {chapter.number}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-accent)]">
                  {chapter.title}
                </h3>
                <p className="text-white/70 mt-2 text-lg">
                  {chapter.subtitle}
                </p>
              </div>
              <div className="lg:col-span-6">
                <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-xl">
                  {chapter.body}
                </p>
                <Link
                  href={chapter.href}
                  className="mt-8 inline-flex items-center gap-2 text-[var(--color-accent)] font-semibold uppercase tracking-widest text-sm hover:text-white/90 transition-colors group"
                >
                  {chapter.cta}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Floating parallax shapes – light yellow borders */}
      <div
        className="absolute top-1/4 right-10 w-64 h-64 border-2 rounded-full pointer-events-none"
        style={{ borderColor: "rgba(245, 208, 0, 0.5)" }}
        aria-hidden
      />
      <div
        className="absolute bottom-1/3 left-10 w-40 h-40 border-2 pointer-events-none"
        style={{ borderColor: "rgba(245, 208, 0, 0.5)" }}
        aria-hidden
      />
    </section>
  );
}
