import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "../../components/ui/PageHeader";
import { SectionContainer } from "../../components/ui/SectionContainer";

export const metadata: Metadata = {
  title: "Aviso legal, política de privacidad y cookies | European Era",
  description: "Aviso legal, política de privacidad y cookies de European Era.",
};

export default function AvisoLegal() {
  return (
    <>
      <PageHeader
        title="Aviso legal, política de privacidad y cookies"
        breadcrumbs={[{ label: "Aviso legal" }]}
      />
      <section className="py-section sm:py-section-lg bg-white">
        <SectionContainer narrow>
          <p className="text-neutral-600 mb-8 text-body-lg leading-relaxed">
            Esta página contendrá el aviso legal, la política de privacidad y la información sobre cookies de European Era. Contenido por añadir.
          </p>
          <Link
            href="/"
            className="inline-flex items-center text-primary font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-none transition-colors"
          >
            ← Volver al inicio
          </Link>
        </SectionContainer>
      </section>
    </>
  );
}
