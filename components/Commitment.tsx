"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Target } from "lucide-react";

export function Commitment() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="commitment"
      className="py-section sm:py-section-lg bg-neutral-50"
      aria-labelledby="commitment-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-8"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden="true">
            <Target size={24} strokeWidth={1.75} />
          </span>
          <h2 id="commitment-heading" className="text-3xl sm:text-4xl font-bold text-neutral-900">
            Our Commitment
          </h2>
          <p className="text-body-lg text-neutral-700 leading-relaxed">
            We are committed to empowering personal growth and promoting{" "}
            <strong>inclusivity and sustainability</strong> through exceptional
            Erasmus+ student and staff mobility management. Proud of our high rate
            of repeat educational centres, we provide comprehensive support for{" "}
            <strong>Erasmus+</strong> applications, ensuring a seamless and
            effective process.
          </p>
          <div>
            <Link
              href="#about"
              className="inline-flex items-center justify-center min-h-[48px] min-w-[160px] rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
            >
              ABOUT US
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
