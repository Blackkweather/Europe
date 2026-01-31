"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/images";

export function HeroSection() {
  return (
    <section className="relative flex items-center px-4 md:px-8 py-20 sm:py-28 overflow-hidden min-h-[90vh]">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(circle at center, rgb(60 72 149 / 0.4) 0%, var(--color-primary-dark) 100%)",
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-block border border-white bg-transparent px-3 py-1 text-xs uppercase tracking-widest text-white">
                Erasmus+ · Málaga
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter text-white mb-6"
            >
              The New Era
              <br />
              <span className="text-white/70">In International</span>
              <br />
              Mobility
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-white/70 mb-10 max-w-md text-lg"
            >
              Comprehensive management of Erasmus+ mobilities and teacher training courses. We manage every detail so you can focus on learning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/#services"
                className="inline-flex items-center justify-center border border-[var(--color-accent)] bg-[var(--color-accent)] px-8 py-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary-dark)] hover:bg-[var(--color-accent)]/90 hover:border-[var(--color-accent)]/90 transition-colors"
              >
                Our Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white/30 px-8 py-3 text-sm uppercase tracking-widest text-white/80 hover:border-white/50 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>

          {/* Geometric accent (template-style shape) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="aspect-square max-w-md mx-auto border border-white/20 relative">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full h-full border border-white/10 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border border-white/20 relative overflow-hidden">
                    <Image
                      src={images.hero}
                      alt="Erasmus+ mobility in Málaga"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 0px, 380px"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
