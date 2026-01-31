"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };
const transition = { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] };

export function Hero() {
  const reducedMotion = useReducedMotion();
  const noMotion = reducedMotion ? {} : fadeUp;

  return (
    <section
      className="relative overflow-hidden min-h-[90vh] flex items-center bg-primary-dark text-white"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="https://europeanera.eu/wp-content/uploads/2026/01/Erasmus-Malaga.jpg"
          alt="Erasmus+ in Málaga – European Era international mobility"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-primary-dark/80"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-28 sm:py-36 lg:py-44 text-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={
            reducedMotion
              ? {}
              : { initial: {}, animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }
          }
          className="space-y-10"
        >
          <motion.h1
            id="hero-heading"
            variants={noMotion}
            transition={transition}
            className="font-heading text-display-lg font-semibold tracking-[0.02em] text-white leading-[1.12]"
          >
            The New Era In International Mobility
          </motion.h1>
          <motion.p
            variants={noMotion}
            transition={transition}
            className="max-w-2xl mx-auto text-body-lg sm:text-xl text-white/90 font-normal leading-relaxed"
          >
            Comprehensive Management of <strong className="font-semibold text-white">Erasmus+</strong> Mobilities and{" "}
            <strong className="font-semibold text-white">Teacher Training</strong> Courses
          </motion.p>
          <motion.div variants={noMotion} transition={transition} className="pt-4">
            <Link
              href="/contact"
              className="btn-accent focus-visible:ring-accent focus-visible:ring-offset-primary inline-flex items-center justify-center"
            >
              CONTACT US
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
