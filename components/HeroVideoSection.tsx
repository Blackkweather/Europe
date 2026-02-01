"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/images";
import { heroVideoUrl } from "@/lib/constants";

export function HeroVideoSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.03]);
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
      aria-label="Hero"
    >
      {/* Background: video or image with parallax */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y, scale, backfaceVisibility: "hidden" }}
      >
        {heroVideoUrl ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster={images.hero}
              onLoadedData={() => setVideoReady(true)}
              src={heroVideoUrl}
            />
            {!videoReady && (
              <div className="absolute inset-0 bg-[var(--color-bg-soft)]">
                <Image
                  src={images.hero}
                  alt=""
                  fill
                  className="object-cover opacity-60"
                  priority
                  quality={90}
                  sizes="100vw"
                />
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0">
            <Image
              src={images.hero}
              alt=""
              fill
              className="object-cover"
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
            />
          </div>
        )}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-soft)]/60 via-[var(--color-bg-soft)]/40 to-[var(--color-bg-soft)]"
          aria-hidden
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto max-w-6xl px-4 md:px-8 py-28 text-center"
        style={{ opacity }}
      >
        <motion.span
          className="inline-block border-2 border-[var(--color-accent)] text-[var(--color-accent)] bg-transparent px-3 py-1 text-xs uppercase tracking-widest mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Erasmus+ · Málaga
        </motion.span>
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tighter text-[var(--color-accent)] mb-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          The New Era
          <br />
          <span className="text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.4)]">In International</span>
          <br />
          <span className="text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.4)]">Mobility</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Comprehensive management of Erasmus+ mobilities and teacher training courses. We manage every detail so you can focus on learning.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/#services"
            className="inline-flex items-center justify-center border border-[var(--color-accent)] bg-[var(--color-accent)] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary-dark)] hover:bg-[var(--color-accent)]/90 transition-colors"
          >
            Our Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-white/40 px-8 py-4 text-sm uppercase tracking-widest text-white hover:border-white/60 hover:bg-white/10 transition-colors"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
