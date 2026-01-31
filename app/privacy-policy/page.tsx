import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "../../components/ui/PageHeader";
import { SectionContainer } from "../../components/ui/SectionContainer";

export const metadata: Metadata = {
  title: "Privacy Policy | European Era",
  description: "Privacy policy for European Era – Erasmus+ mobilities in Málaga.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        breadcrumbs={[{ label: "Privacy Policy" }]}
        variant="default"
      />
      <section className="py-section sm:py-section-lg bg-[var(--color-primary-dark)]">
        <SectionContainer narrow>
          <p className="text-white/90 mb-8 text-body-lg leading-relaxed">
            This page will contain the privacy policy for European Era. Content to be added.
          </p>
          <Link
            href="/"
            className="inline-flex items-center text-[var(--color-accent)] font-medium hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none"
          >
            ← Back to home
          </Link>
        </SectionContainer>
      </section>
    </>
  );
}
