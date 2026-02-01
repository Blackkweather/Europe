import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "../../components/ui/PageHeader";
import { SectionContainer } from "../../components/ui/SectionContainer";
import { staffMobility } from "../../lib/content";
import { parseBold } from "../../lib/content";
import { Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Staff Mobility | European Era",
  description:
    "Enhancing Professional Development. Tailored teacher training courses, job shadowing, and preparatory visits in Málaga.",
  openGraph: {
    title: "Staff Mobility | European Era",
    description:
      "Teacher training courses and professional development in Málaga with European Era.",
  },
};

function ContentWithBold({ text }: { text: string }) {
  const parts = parseBold(text);
  return (
    <p className="text-white/90 text-body-lg leading-relaxed">
      {parts.map((part, j) =>
        typeof part === "string" ? part : <strong key={j} className="text-white">{part.bold}</strong>
      )}
    </p>
  );
}

export default function StaffMobilityPage() {
  return (
    <>
      <PageHeader
        title={staffMobility.title}
        description="Enhancing Professional Development"
        breadcrumbs={[{ label: "Our Services", href: "/" }, { label: staffMobility.title }]}
        variant="hero"
      />
      <section className="pt-6 sm:pt-8 pb-section sm:pb-section-lg bg-[var(--color-bg-soft)]">
        <SectionContainer className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
          <div className="flex-1 space-y-8">
            <span
              className="inline-flex h-14 w-14 items-center justify-center border border-white/20 text-[var(--color-accent)]"
              aria-hidden="true"
            >
              <Briefcase size={28} strokeWidth={1.75} />
            </span>
            <ContentWithBold text={staffMobility.content} />
            <div className="pt-4">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center justify-center min-h-[48px] min-w-[160px] px-6 py-3 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                CONTACT US
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-[400px] shrink-0 relative aspect-[4/3] overflow-hidden border border-white/10 bg-white/5">
            <Image
              src="https://europeanera.eu/wp-content/uploads/2026/01/Internships-Malaga.jpg"
              alt="Internships and teacher training in Málaga – European Era staff mobility"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 400px"
            />
          </div>
        </SectionContainer>
      </section>
    </>
  );
}
