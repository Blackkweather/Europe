"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, Briefcase } from "lucide-react";
import { cn } from "../lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const services = [
  {
    title: "Student mobility",
    icon: GraduationCap,
    content:
      "Streamlining International Opportunities in Málaga. Based in the vibrant city of **Málaga, Spain,** we actively collaborate with Erasmus+ coordinators and VET college administrators to streamline the arrangement of relevant internships across various sectors. Our comprehensive services **simplify the process for both coordinators and students**, covering every detail from accommodation and transport to the management of student placements. To ensure a well-rounded experience, we also offer engaging cultural activities, ensuring that students fully enjoy their time in Málaga.",
  },
  {
    title: "Staff Mobility",
    icon: Briefcase,
    content:
      "Enhancing Professional Development. We are dedicated to supporting **educators and professionals** through tailored training courses designed to meet diverse needs. Our flexible learning options foster **skill development and career growth,** ensuring continuous professional advancement. Additionally, we provide valuable job shadowing opportunities and preparatory visits as part of our comprehensive services.",
  },
];

function parseBold(text: string) {
  const parts: (string | { bold: string })[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    const start = remaining.indexOf("**");
    if (start === -1) {
      parts.push(remaining);
      break;
    }
    const end = remaining.indexOf("**", start + 2);
    if (end === -1) {
      parts.push(remaining);
      break;
    }
    parts.push(remaining.slice(0, start));
    parts.push({ bold: remaining.slice(start + 2, end) });
    remaining = remaining.slice(end + 2);
  }
  return parts;
}

export function Services() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="py-section sm:py-section-lg bg-neutral-50"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="services-heading"
          className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-14 text-center"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Our Services
        </motion.h2>

        <motion.div
          className="grid gap-8 md:grid-cols-2"
          variants={reducedMotion ? undefined : container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                variants={reducedMotion ? undefined : item}
                className={cn(
                  "rounded-2xl border border-neutral-200 bg-white p-8 shadow-card",
                  "transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                )}
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5"
                  aria-hidden="true"
                >
                  <Icon size={24} strokeWidth={1.75} />
                </span>
                <h3 className="text-xl font-bold text-primary mb-4">{s.title}</h3>
                <p className="text-neutral-700 leading-relaxed text-body-lg mb-6">
                  {parseBold(s.content).map((part, j) =>
                    typeof part === "string" ? (
                      part
                    ) : (
                      <strong key={j}>{part.bold}</strong>
                    )
                  )}
                </p>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center min-h-[44px] min-w-[140px] rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                >
                  CONTACT US
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
