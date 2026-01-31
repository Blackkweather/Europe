"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Phone, Mail, MessageCircle } from "lucide-react";
import {
  phoneDisplay,
  phoneHref,
  email,
  whatsappUrl,
  orgId,
  privacyPolicyUrl,
  legalUrl,
} from "@/lib/constants";

const navLinks = [
  { href: "/student-mobilities", label: "Student Mobilities" },
  { href: "/staff-mobility", label: "Staff Mobility" },
  { href: "/about", label: "About Us" },
  { href: "/our-commitment", label: "Our Commitment" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const colVariants = { initial: { opacity: 0 }, animate: { opacity: 1 } };
const itemVariants = { initial: { opacity: 0 }, animate: { opacity: 1 } };
const stagger = { animate: { transition: { staggerChildren: 0.03, delayChildren: 0.06 } } };
const t = { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] };

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const show = reducedMotion || inView;
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailVal = newsletterEmail.trim();
    if (!emailVal) return;
    setNewsletterStatus("loading");
    setNewsletterMessage("");
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailVal }),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok) {
      setNewsletterEmail("");
      setNewsletterStatus("success");
      setNewsletterMessage("Thanks – you're on the list.");
    } else {
      setNewsletterStatus("error");
      setNewsletterMessage(json.error ?? "Something went wrong. Try again.");
    }
  };

  return (
    <footer
      ref={ref}
      className="border-t border-white/10 bg-[var(--color-primary-dark)] text-white py-16 sm:py-20 fab-safe-bottom"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid gap-12 sm:gap-16 sm:grid-cols-2 lg:grid-cols-4"
          variants={reducedMotion ? undefined : stagger}
          initial="initial"
          animate={show ? "animate" : "initial"}
        >
          <motion.div className="space-y-4" variants={reducedMotion ? undefined : colVariants} transition={t}>
            <Link href="/" className="font-heading font-bold text-xl tracking-tight text-white hover:text-white/90 transition-colors">
              European Era<span className="text-white/50">.</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              The New Era In International Mobility. Erasmus+ mobilities and teacher training in Málaga.
            </p>
          </motion.div>
          <motion.div className="space-y-4" variants={reducedMotion ? undefined : colVariants} transition={t}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Contact</h3>
            <ul className="space-y-3" role="list">
              {[
                { href: phoneHref, label: phoneDisplay, icon: Phone, aria: `Call: ${phoneDisplay}` },
                { href: `mailto:${email}`, label: email, icon: Mail, aria: `Email: ${email}` },
                { href: whatsappUrl, label: "WhatsApp", icon: MessageCircle, aria: "Chat on WhatsApp", external: true },
              ].map(({ href, label, icon: Icon, aria, external }) => (
                <motion.li key={String(href)} variants={reducedMotion ? undefined : itemVariants} transition={t}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-3 text-sm text-white/70 hover:text-[var(--color-accent)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary-dark)] w-fit"
                    aria-label={aria}
                  >
                    <Icon size={16} aria-hidden className="shrink-0 text-white/50 group-hover:text-[var(--color-accent)] transition-colors" />
                    <span className={label.length > 30 ? "break-all" : ""}>{label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div className="space-y-4" variants={reducedMotion ? undefined : colVariants} transition={t}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Quick links</h3>
            <ul className="space-y-2" role="list">
              {navLinks.map(({ href, label }) => (
                <motion.li key={href} variants={reducedMotion ? undefined : itemVariants} transition={t}>
                  <Link href={href} className="text-sm text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary-dark)] py-0.5 w-fit block">
                    {label}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={reducedMotion ? undefined : itemVariants} transition={t}>
                <Link href="/login" className="text-sm text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary-dark)] py-0.5 w-fit block">
                  Log in
                </Link>
              </motion.li>
            </ul>
          </motion.div>
          <motion.div className="space-y-4" variants={reducedMotion ? undefined : colVariants} transition={t}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Legal</h3>
            <p className="text-sm text-white/60">Org. ID: {orgId}</p>
            <ul className="space-y-2 text-sm" role="list">
              <motion.li variants={reducedMotion ? undefined : itemVariants} transition={t}>
                <Link href={privacyPolicyUrl} className="text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary-dark)] py-0.5 w-fit block">
                  Privacy
                </Link>
              </motion.li>
              <motion.li variants={reducedMotion ? undefined : itemVariants} transition={t}>
                <Link href={legalUrl} className="text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary-dark)] py-0.5 w-fit block">
                  Legal
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>
        <motion.div className="mt-14 pt-10 border-t border-white/10" initial={reducedMotion ? false : { opacity: 0 }} animate={show ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mb-3">Get mobility updates</h3>
          <p className="text-sm text-white/60 mb-4 max-w-md">Occasional news on Erasmus+ mobilities and opportunities in Málaga.</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-wrap gap-3 max-w-md">
            <label htmlFor="footer-newsletter-email" className="sr-only">Email for newsletter</label>
            <input
              id="footer-newsletter-email"
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={newsletterStatus === "loading"}
              className="flex-1 min-w-[200px] border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 focus:outline-none transition-colors min-h-[48px]"
              aria-invalid={newsletterStatus === "error"}
              aria-describedby={newsletterMessage ? "footer-newsletter-msg" : undefined}
            />
            <button type="submit" disabled={newsletterStatus === "loading"} className="border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 py-3 min-h-[48px] font-semibold uppercase tracking-widest text-[var(--color-primary-dark)] hover:bg-[var(--color-accent)]/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary-dark)] disabled:opacity-60">
              {newsletterStatus === "loading" ? "…" : "Subscribe"}
            </button>
          </form>
          {newsletterMessage && (
            <p id="footer-newsletter-msg" className={`mt-2 text-sm ${newsletterStatus === "error" ? "text-amber-400" : "text-white/80"}`} role="status">
              {newsletterMessage}
            </p>
          )}
        </motion.div>
        <motion.div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-white/50" initial={reducedMotion ? false : { opacity: 0 }} animate={show ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
          <span>© {new Date().getFullYear()} European Era. All rights reserved.</span>
        </motion.div>
      </div>
    </footer>
  );
}
