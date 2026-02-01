"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const steps = [
  { number: "01", title: "Enquire", description: "Get in touch. We align on your goals, participants, and timeline for Erasmus+ mobility or training." },
  { number: "02", title: "Plan", description: "We design the programme: placements, accommodation, transport, and cultural activities in Málaga." },
  { number: "03", title: "Arrive", description: "We support from arrival to orientation so coordinators and participants feel prepared." },
  { number: "04", title: "Experience", description: "Ongoing support during the mobility or training so you can focus on learning and growth." },
  { number: "05", title: "Evaluate", description: "We wrap up with evaluation and documentation so you get the most from the programme." },
];

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="process"
      className="py-24 relative overflow-hidden"
      style={{ background: "#0a1628" }}
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-8 relative z-10">
        <SectionHeader
          label="How we work"
          title="Our Process"
          subtitle="Step by step"
        />

        <div ref={ref} className="relative">
          {/* Vertical line down the middle */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-[var(--color-accent)] left-1/2 -translate-x-px"
            aria-hidden
          />

          {steps.map((step, index) => {
            const isRight = index % 2 === 1; // 02, 04 on the right
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative flex flex-col md:flex-row md:items-center min-h-[120px] md:min-h-[140px] py-8 md:py-6"
              >
                {/* Left side: text for 01, 03, 05; empty for 02, 04 */}
                <div className="flex-1 md:pr-8 md:max-w-[calc(50%-2.5rem)]">
                  {!isRight ? (
                    <>
                      <div className="text-5xl md:text-7xl font-bold text-white/40 mb-2">
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-white">
                        {step.title}
                      </h3>
                      <p className="text-white/80 max-w-md">
                        {step.description}
                      </p>
                    </>
                  ) : (
                    <div className="hidden md:block" aria-hidden />
                  )}
                </div>

                {/* Cube on the center line only */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 flex shrink-0 items-center justify-center pointer-events-none md:pointer-events-auto">
                  <div className="w-20 h-20 border-2 border-[var(--color-accent)] flex items-center justify-center bg-[var(--color-bg-soft)] hover:border-[var(--color-accent)]/90 transition-all duration-300">
                    <span className="text-xl font-bold text-white">{step.number}</span>
                  </div>
                </div>

                {/* Right side: text for 02, 04; empty for 01, 03, 05 */}
                <div className={`flex-1 md:pl-8 md:max-w-[calc(50%-2.5rem)] ${isRight ? "md:text-right" : ""}`}>
                  {isRight ? (
                    <>
                      <div className="text-5xl md:text-7xl font-bold text-white/40 mb-2 md:text-right">
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-white md:text-right">
                        {step.title}
                      </h3>
                      <p className="text-white/80 max-w-md md:ml-auto md:text-right">
                        {step.description}
                      </p>
                    </>
                  ) : (
                    <div className="hidden md:block" aria-hidden />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="absolute top-40 right-20 w-32 h-32 border border-[var(--color-accent)]/30" aria-hidden />
      <div className="absolute bottom-60 left-20 w-40 h-40 border border-[var(--color-accent)]/20" aria-hidden />
    </section>
  );
}
