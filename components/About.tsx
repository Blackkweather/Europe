"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { brochureUrl } from "../lib/constants";

export function About() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="py-section sm:py-section-lg bg-white"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid gap-12 lg:grid-cols-5 lg:gap-16 lg:items-center"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="lg:col-span-3 order-2 lg:order-1">
            <h2 id="about-heading" className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-8">
              Education & Mobility Experts
            </h2>
            <div className="space-y-6 text-neutral-700 text-body-lg leading-relaxed">
              <p>
                We&apos;re a passionate, international, and innovative team dedicated to
                making a real difference. We specialise in arranging student
                internships and teacher training courses in Málaga, Spain, managing
                every detail from accommodation and transport to tailored placements
                and educational programmes.
              </p>
              <p>
                Our dynamic team brings enthusiasm and a personal touch to
                supporting <strong>Erasmus+ coordinators</strong>. We take pride in
                our expertise in education and international mobility, delivering
                top-quality services with genuine dedication. Our commitment to
                personalised attention ensures we meet the unique needs of each
                group, with every detail thoughtfully managed.
              </p>
              <p>
                With us, you&apos;ll find not just a professional partner, but a friendly,
                energetic team eager to support your success and make every
                interaction enjoyable.
              </p>
            </div>
            <p className="mt-6">
              <a
                href={brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-medium text-primary hover:text-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
              >
                Download the brochure (PDF)
              </a>
            </p>
          </div>
          <div className="lg:col-span-2 order-1 lg:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card-hover bg-neutral-100">
            <Image
              src="https://europeanera.eu/wp-content/uploads/2026/01/European-Era-Staff-1024x683-1.jpg"
              alt="European Era staff – education and mobility experts"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
