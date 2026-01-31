import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "../../components/ui/PageHeader";
import { SectionContainer } from "../../components/ui/SectionContainer";
import { testimonialsData } from "../../lib/content";
import { Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "Real Stories That Move Us | European Era",
  description:
    "Hear from educators and students who experienced Erasmus+ mobilities and teacher training in Málaga with European Era.",
  openGraph: {
    title: "Testimonials | European Era",
    description: "Real stories from our internship students and partners.",
  },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        title="Real Stories That Move Us"
        description="What our partners and students say about their experience in Málaga"
        breadcrumbs={[{ label: "Testimonials" }]}
        variant="centered"
      />
      <section className="py-section sm:py-section-lg bg-stone-50/80">
        <SectionContainer>
          <p
            className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70 mb-12 text-center"
            aria-hidden="true"
          >
            OUR INTERNSHIP STUDENTS
          </p>
          <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3" role="list">
            {testimonialsData.map((t, i) => (
              <li key={i}>
                <blockquote className="border border-neutral-200 bg-white p-10 h-full flex flex-col transition-colors duration-200 hover:border-neutral-300">
                  {t.image && (
                    <div className="relative w-20 h-20 rounded-full overflow-hidden mb-5 shrink-0 bg-neutral-100">
                      <Image src={t.image} alt="" fill className="object-cover" sizes="80px" />
                    </div>
                  )}
                  <span className="text-primary/20 mb-4 inline-block" aria-hidden="true">
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
        </SectionContainer>
      </section>
    </>
  );
}
