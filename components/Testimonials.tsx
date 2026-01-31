"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "../lib/utils";

const testimonials = [
  {
    quote:
      "My colleagues and I spent five happy days undertaking continuous professional development in Málaga. I highly recommend European Era. We came home energized by our experiences, with many happy memories and with a plan to further our professional lives.",
    author: "Lucinda Dillo",
    org: "Nenagh College",
  },
  {
    quote:
      "My colleagues and I spent five happy days undertaking continuous professional development in Málaga. I highly recommend European Era. We came home energized by our experiences, with many happy memories and with a plan to further our professional lives.",
    author: "Anna Kowalska",
    org: "University of Agriculture in Kraków",
  },
  {
    quote:
      "My Erasmus+ traineeship in Málaga was both professionally and personally rewarding. European Era supported me throughout the entire process, allowing me to focus on learning and enjoying the experience. I returned home with new skills, great memories, and a clearer vision of my professional future. I would highly recommend European Era to other students.",
    author: "Marco Bianchi",
    org: "ALMA – The International School of Italian Cuisine (Italy)",
  },
];

export function Testimonials() {
  const reducedMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    duration: reducedMotion ? 0 : 25,
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      id="testimonials"
      className="py-section sm:py-section-lg bg-white"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p
          className="text-sm font-semibold uppercase tracking-wider text-primary mb-2 text-center"
          aria-hidden="true"
        >
          OUR INTERNSHIP STUDENTS
        </p>
        <motion.h2
          id="testimonials-heading"
          className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-14 text-center"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Real Stories That Move Us
        </motion.h2>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef} aria-roledescription="carousel">
            <ul className="flex touch-pan-y gap-6" role="list">
              {testimonials.map((t, i) => (
                <li
                  key={i}
                  className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_80%] lg:flex-[0_0_50%] pl-4"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${i + 1} of ${testimonials.length}`}
                >
                  <blockquote className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 shadow-card h-full flex flex-col transition-shadow hover:shadow-card-hover">
                    <span className="text-primary/30 mb-4" aria-hidden="true">
                      <Quote size={32} />
                    </span>
                    <p className="text-neutral-700 leading-relaxed flex-1 mb-6 text-body-lg">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <footer className="text-sm text-neutral-600 font-medium">
                      <cite className="not-italic">{t.author}</cite>, {t.org}
                    </footer>
                  </blockquote>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex justify-center gap-4" aria-label="Carousel navigation">
            <button
              type="button"
              className={cn(
                "rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center text-primary hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors disabled:opacity-40 disabled:pointer-events-none"
              )}
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              type="button"
              className={cn(
                "rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center text-primary hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors disabled:opacity-40 disabled:pointer-events-none"
              )}
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              aria-label="Next testimonial"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
