"use client";

import Link from "next/link";
import { useRef } from "react";
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
} from "../lib/constants";

const colVariants = { initial: { opacity: 0 }, animate: { opacity: 1 } };
const itemVariants = { initial: { opacity: 0 }, animate: { opacity: 1 } };
const stagger = { animate: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } } };
const t = { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] };

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const show = reducedMotion || inView;

  return (
    <footer
      ref={ref}
      className="border-t border-neutral-200 bg-white text-neutral-600 py-20 sm:py-24 fab-safe-bottom"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid gap-16 sm:gap-20 sm:grid-cols-2 lg:grid-cols-4"
          variants={reducedMotion ? undefined : stagger}
          initial="initial"
          animate={show ? "animate" : "initial"}
        >
          <motion.div className="space-y-6" variants={reducedMotion ? undefined : colVariants} transition={t}>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-900">
              European Era
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-xs">
              The New Era In International Mobility. Comprehensive Management of Erasmus+ Mobilities and Teacher Training Courses.
            </p>
          </motion.div>

          <motion.div className="space-y-6" variants={reducedMotion ? undefined : colVariants} transition={t}>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-900">
              Contact
            </h3>
            <ul className="space-y-4" role="list">
              {[
                { href: phoneHref, label: phoneDisplay, icon: Phone, aria: `Call: ${phoneDisplay}` },
                { href: `mailto:${email}`, label: email, icon: Mail, aria: `Email: ${email}` },
                { href: whatsappUrl, label: "Chat on WhatsApp", icon: MessageCircle, aria: "Chat on WhatsApp", external: true },
              ].map(({ href, label, icon: Icon, aria, external }) => (
                <motion.li key={String(href)} variants={reducedMotion ? undefined : itemVariants} transition={t}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group/link flex items-center gap-3 min-h-[44px] text-neutral-600 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-none transition-colors duration-200 relative w-fit"
                    aria-label={aria}
                  >
                    <Icon size={18} aria-hidden="true" className="shrink-0 text-neutral-400 transition-colors group-hover/link:text-primary" />
                    <span className={label.length > 30 ? "break-all" : ""}>{label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="space-y-6" variants={reducedMotion ? undefined : colVariants} transition={t}>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-900">
              Quick links
            </h3>
            <ul className="space-y-3" role="list">
              {[
                { href: "/student-mobilities", label: "Student Mobilities" },
                { href: "/staff-mobility", label: "Staff Mobility" },
                { href: "/our-commitment", label: "Our Commitment" },
                { href: "/about", label: "About Us" },
                { href: "/testimonials", label: "Testimonials" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
                { href: "/login", label: "Log in" },
              ].map(({ href, label }) => (
                <motion.li key={href} variants={reducedMotion ? undefined : itemVariants} transition={t}>
                  <Link
                    href={href}
                    className="block text-neutral-600 hover:text-primary transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-none py-0.5 w-fit"
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="space-y-6" variants={reducedMotion ? undefined : colVariants} transition={t}>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-900">
              Legal
            </h3>
            <p className="text-sm text-neutral-500">
              Organisational ID: {orgId}
            </p>
            <ul className="space-y-2 text-sm" role="list">
              <motion.li variants={reducedMotion ? undefined : itemVariants} transition={t}>
                <Link
                  href={privacyPolicyUrl}
                  className="block text-neutral-600 hover:text-primary transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-none py-0.5 w-fit"
                >
                  Privacy Policy
                </Link>
              </motion.li>
              <motion.li variants={reducedMotion ? undefined : itemVariants} transition={t}>
                <Link
                  href={legalUrl}
                  className="block text-neutral-600 hover:text-primary transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-none py-0.5 w-fit"
                >
                  Aviso legal, política de privacidad y cookies
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-20 pt-10 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-neutral-500"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span>© {new Date().getFullYear()} European Era. All rights reserved.</span>
        </motion.div>
      </div>
    </footer>
  );
}
