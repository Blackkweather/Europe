"use client";

import Link from "next/link";
import { phoneDisplay, phoneHref, email, orgId, privacyPolicyUrl, legalUrl } from "@/lib/constants";

const navLinks = [
  { href: "/student-mobilities", label: "Student Mobilities" },
  { href: "/staff-mobility", label: "Staff Mobility" },
  { href: "/about", label: "About Us" },
  { href: "/our-commitment", label: "Our Commitment" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function HomeFooter() {
  return (
    <footer className="py-8 border-t border-white/20 bg-[var(--color-primary-dark)] text-white">
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Link href="/" className="font-bold text-xl tracking-tighter text-white hover:text-white/90 transition-colors">
            European Era<span className="text-white/50">.</span>
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8" aria-label="Footer navigation">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <span>© {new Date().getFullYear()} European Era. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span>Org. ID: {orgId}</span>
            <Link href={privacyPolicyUrl} className="hover:text-white/80 transition-colors">
              Privacy
            </Link>
            <Link href={legalUrl} className="hover:text-white/80 transition-colors">
              Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
