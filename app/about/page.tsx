import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "../../components/ui/PageHeader";
import { SectionContainer } from "../../components/ui/SectionContainer";
import { brochureUrl } from "../../lib/constants";

export const metadata: Metadata = {
  title: "About Us | European Era – Education & Mobility Experts",
  description:
    "We're a passionate, international team specialising in student internships and teacher training courses in Málaga, Spain.",
  openGraph: {
    title: "About Us | European Era",
    description:
      "Education & Mobility Experts. Student internships and teacher training in Málaga.",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Education & Mobility Experts"
        description="A passionate, international team dedicated to making a real difference"
        breadcrumbs={[{ label: "About Us" }]}
        variant="hero"
      />
      <section className="py-section sm:py-section-lg bg-[var(--color-bg-soft)]">
        <SectionContainer className="grid gap-16 lg:grid-cols-5 lg:gap-20 lg:items-center">
          <div className="lg:col-span-3 order-2 lg:order-1 space-y-8">
            <div className="space-y-8 text-white/90 text-body-lg leading-relaxed max-w-content">
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
            <p className="pt-2">
              <a
                href={brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-medium text-[var(--color-accent)] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none transition-colors"
              >
                Download the brochure (PDF)
              </a>
            </p>
          </div>
          <div className="lg:col-span-2 order-1 lg:order-2 relative aspect-[4/3] overflow-hidden border border-white/10 bg-white/5">
            <Image
              src="https://europeanera.eu/wp-content/uploads/2026/01/European-Era-Staff-1024x683-1.jpg"
              alt="European Era staff – education and mobility experts"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </SectionContainer>
      </section>
    </>
  );
}
