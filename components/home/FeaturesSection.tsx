"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, ArrowRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { services } from "@/lib/content";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function FeaturesSection() {
  return (
    <section
      id="services"
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--color-primary-dark) 0%, #0c2340 100%)" }}
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-8 relative z-10">
        <SectionHeader
          label="Our approach"
          title="Our Services"
          subtitle="Erasmus+ in Málaga"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((s, index) => {
            const Icon = s.slug === "student-mobilities" ? GraduationCap : Briefcase;
            return (
              <motion.div key={s.slug} variants={itemVariants}>
                <Link
                  href={`/${s.slug}`}
                  className="group block border-2 border-white/20 bg-white/5 backdrop-blur-sm p-8 hover:border-white/50 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="mb-6 text-white/80 group-hover:text-white transition-colors">
                    <div className="bg-white/10 p-3 inline-block group-hover:bg-white/20 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{s.title}</h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors line-clamp-3 text-sm">
                    {s.content.replace(/\*\*[^*]+\*\*/g, "").slice(0, 160)}…
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white/70 group-hover:text-[var(--color-accent)] transition-colors">
                    Learn more
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <div className="absolute top-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" aria-hidden />
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-white/[0.03] rounded-full blur-3xl" aria-hidden />
    </section>
  );
}
