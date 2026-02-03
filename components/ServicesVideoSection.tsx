"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Briefcase, ArrowRight } from "lucide-react";
import { services } from "@/lib/content";
import { images } from "@/lib/images";

const serviceImages = [images.studentMobility, images.staffMobility];

export function ServicesVideoSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id="services"
      className="relative py-32 md:py-40 overflow-hidden bg-[var(--color-primary-dark)]"
      aria-labelledby="services-heading"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white block mb-4">
            Our approach
          </span>
          <h2 id="services-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[var(--color-accent)]">
            Our Services
          </h2>
          <p className="mt-6 text-lg text-white/90 max-w-2xl">
            Erasmus+ student and staff mobilities in Málaga. We manage every detail so you can focus on learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {services.map((s, index) => {
            const Icon = s.slug === "student-mobilities" ? GraduationCap : Briefcase;
            const posterSrc = serviceImages[index];
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/${s.slug}`}
                  className="group block relative overflow-hidden border-2 border-[var(--color-accent)]/30 bg-white/5 hover:border-[var(--color-accent)]/60 transition-all duration-500"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Hover-play video area: poster image, optional video overlay */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={posterSrc}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-[var(--color-bg-soft)]/50 group-hover:bg-[var(--color-bg-soft)]/20 transition-colors duration-500" />
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="w-16 h-16 rounded-full border-2 border-[var(--color-accent)] flex items-center justify-center text-[var(--color-accent)]">
                          <span className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-[var(--color-accent)] ml-1" />
                        </span>
                      </motion.div>
                    )}
                  </div>

                  <div className="p-8 md:p-10">
                    <div className="mb-6 text-white/80 group-hover:text-[var(--color-accent)] transition-colors">
                      <div className="bg-[var(--color-accent)]/20 p-3 inline-block group-hover:bg-[var(--color-accent)]/30 transition-all duration-300">
                        <Icon className="w-6 h-6 text-[var(--color-accent)]" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{s.title}</h3>
                    <p className="text-white/70 group-hover:text-white/90 transition-colors line-clamp-3 text-sm leading-relaxed">
                      {s.content.replace(/\*\*[^*]+\*\*/g, "").slice(0, 180)}…
                    </p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white/70 group-hover:text-[var(--color-accent)] transition-colors">
                      Learn more
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="absolute top-20 right-0 w-72 h-72 border border-[var(--color-accent)]/50 rounded-full pointer-events-none hidden md:block" aria-hidden />
    </section>
  );
}
