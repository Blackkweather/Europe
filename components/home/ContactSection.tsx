"use client";

import Link from "next/link";
import { SectionHeader } from "./SectionHeader";
import { phoneDisplay, phoneHref, email } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[var(--color-primary-dark)]">
      <div className="container mx-auto max-w-6xl px-4 md:px-8 relative z-10">
        <SectionHeader
          label="Contact"
          title="Let&apos;s Work"
          subtitle="Together"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="border-2 border-white/20 bg-white/5 backdrop-blur-sm p-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/80 mb-6">
              Get in touch
            </h3>
            <p className="text-white/90 mb-8 max-w-md">
              Ready to start your mobility in Málaga? We&apos;ll support you from the first enquiry to the final evaluation.
            </p>
            <ul className="space-y-4 text-white/80">
              <li>
                <a href={phoneHref} className="hover:text-[var(--color-accent)] transition-colors">
                  {phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="hover:text-[var(--color-accent)] transition-colors">
                  {email}
                </a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center border-2 border-[var(--color-accent)] bg-[var(--color-accent)] px-8 py-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary-dark)] hover:bg-[var(--color-accent)]/90 transition-colors"
            >
              Contact form
            </Link>
          </div>
          <div className="border-2 border-white/20 bg-white/5 backdrop-blur-sm p-8 flex flex-col justify-center">
            <p className="text-white/80 mb-6">
              Send us a message and we&apos;ll get back to you as soon as possible.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center border-2 border-white/30 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white hover:border-white hover:bg-white/5 transition-colors group"
            >
              Go to contact form
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
