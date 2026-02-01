import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "../../components/ui/PageHeader";
import { SectionContainer } from "../../components/ui/SectionContainer";
import { Target, Sparkles, Users, Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Commitment | European Era",
  description:
    "We are committed to empowering personal growth and promoting inclusivity and sustainability through exceptional Erasmus+ mobility management.",
  openGraph: {
    title: "Our Commitment | European Era",
    description:
      "Empowering personal growth and promoting inclusivity and sustainability through Erasmus+.",
  },
};

const pillars = [
  {
    icon: Sparkles,
    title: "Personal growth",
    line: "Empowering individuals through learning and development.",
  },
  {
    icon: Users,
    title: "Inclusivity",
    line: "Ensuring access and opportunity for all participants.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    line: "Responsible, lasting impact on people and place.",
  },
] as const;

export default function OurCommitmentPage() {
  return (
    <>
      <PageHeader
        title="Our Commitment"
        breadcrumbs={[{ label: "Our Commitment" }]}
        variant="hero"
      />
      <section className="pt-6 sm:pt-8 pb-section sm:pb-section-lg bg-[var(--color-bg-soft)]">
        <SectionContainer>
          {/* Interest hook: three pillars */}
          <div className="grid gap-8 sm:grid-cols-3 mb-20 sm:mb-24">
            {pillars.map(({ icon: Icon, title, line }) => (
              <div
                key={title}
                className="text-center border border-white/10 bg-white/5 p-8 transition-colors duration-200 hover:border-white/20"
              >
                <span
                  className="inline-flex h-14 w-14 items-center justify-center border border-white/20 text-[var(--color-accent)] mb-6"
                  aria-hidden="true"
                >
                  <Icon size={28} strokeWidth={1.75} />
                </span>
                <h2 className="font-heading text-headline font-semibold text-[var(--color-accent)] mb-3 tracking-[0.02em]">
                  {title}
                </h2>
                <p className="text-body-sm text-white/80 leading-relaxed max-w-[20ch] mx-auto">
                  {line}
                </p>
              </div>
            ))}
          </div>

          {/* Main message – unchanged copy */}
          <div className="max-w-2xl mx-auto text-center space-y-10">
            <span
              className="inline-flex h-14 w-14 items-center justify-center border border-white/20 text-[var(--color-accent)]"
              aria-hidden="true"
            >
              <Target size={32} strokeWidth={1.75} />
            </span>
            <p className="text-body-lg text-white/90 leading-relaxed max-w-content mx-auto">
              We are committed to empowering personal growth and promoting{" "}
              <strong className="text-white">inclusivity and sustainability</strong> through exceptional
              Erasmus+ student and staff mobility management. Proud of our high rate
              of repeat educational centres, we provide comprehensive support for{" "}
              <strong className="text-white">Erasmus+</strong> applications, ensuring a seamless and
              effective process.
            </p>
            <div>
              <Link
                href="/about"
                className="btn-primary inline-flex items-center justify-center min-h-[48px] min-w-[160px] px-6 py-3 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                ABOUT US
              </Link>
            </div>
          </div>
        </SectionContainer>
      </section>
    </>
  );
}
