import type { Metadata } from "next";
import { PageHeader } from "../../components/ui/PageHeader";
import { Contact } from "../../components/Contact";

export const metadata: Metadata = {
  title: "Contact Us | European Era",
  description:
    "Get in touch with European Era. Phone, email, WhatsApp, or send us a message. We're here to support your Erasmus+ mobility in Málaga.",
  openGraph: {
    title: "Contact Us | European Era",
    description: "Get in touch with European Era for Erasmus+ mobilities in Málaga.",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Get in touch – we're here to support your Erasmus+ mobility in Málaga"
        breadcrumbs={[{ label: "Contact" }]}
        variant="centered"
      />
      <Contact showHeading={false} />
    </>
  );
}
