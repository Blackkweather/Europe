"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Phone, Mail, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import { phoneDisplay, phoneHref, email, orgId } from "../lib/constants";

const navLinks = [
  { href: "/student-mobilities", label: "Student Mobilities" },
  { href: "/staff-mobility", label: "Staff Mobility" },
  { href: "/about", label: "About Us" },
  { href: "/our-commitment", label: "Our Commitment" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const navItem = { initial: { opacity: 0 }, animate: { opacity: 1 } };
const stagger = { animate: { transition: { staggerChildren: 0.03, delayChildren: 0.02 } } };
const t = { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] as const };

export function Header() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const reducedMotion = useReducedMotion();
  const noMotion = reducedMotion ? {} : { initial: "initial" as const, animate: "animate" as const };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white"
      role="banner"
      aria-label="Main navigation"
    >
      <div className="border-b border-neutral-100 bg-stone-50/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 sm:px-6 lg:px-8 text-xs tracking-wide text-neutral-600">
          <motion.a
            href={phoneHref}
            className="flex items-center gap-1.5 text-neutral-600 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-none transition-colors duration-200"
            aria-label={`Call: ${phoneDisplay}`}
            variants={reducedMotion ? undefined : navItem}
            transition={t}
          >
            <Phone size={14} aria-hidden="true" />
            <span>{phoneDisplay}</span>
          </motion.a>
          <motion.a
            href={`mailto:${email}`}
            className="flex items-center gap-1.5 text-neutral-600 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-none transition-colors duration-200"
            aria-label={`Email: ${email}`}
            variants={reducedMotion ? undefined : navItem}
            transition={t}
          >
            <Mail size={14} aria-hidden="true" />
            <span className="break-all">{email}</span>
          </motion.a>
          <motion.span
            className="text-neutral-500"
            aria-label="Organisational ID"
            variants={reducedMotion ? undefined : navItem}
            transition={t}
          >
            Organisational ID: {orgId}
          </motion.span>
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          variants={reducedMotion ? undefined : navItem}
          transition={t}
          {...noMotion}
          className="shrink-0"
        >
          <Link
            href="/"
            className="font-heading text-xl font-semibold tracking-[0.02em] text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-none transition-opacity hover:opacity-90"
            aria-label="European Era – home"
          >
            European Era
          </Link>
        </motion.div>

        <motion.ul
          className="hidden md:flex items-center gap-0.5 lg:gap-1 flex-wrap justify-end shrink min-w-0"
          role="menubar"
          variants={reducedMotion ? undefined : { animate: { transition: { staggerChildren: 0.02 } } }}
          initial="initial"
          animate="animate"
        >
          {navLinks.map(({ href, label }) => (
            <motion.li key={label} role="none" variants={reducedMotion ? undefined : navItem} transition={t}>
              <Link
                href={href}
                className="relative text-neutral-600 hover:text-primary font-medium text-sm tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-none px-4 py-2.5 min-h-[44px] flex items-center"
                role="menuitem"
              >
                {label}
              </Link>
            </motion.li>
          ))}
          {status === "authenticated" ? (
            <>
              <motion.li role="none" variants={reducedMotion ? undefined : navItem} transition={t}>
                <Link
                  href="/dashboard"
                  className="relative text-neutral-600 hover:text-primary font-medium text-sm tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-none px-4 py-2.5 min-h-[44px] flex items-center gap-1.5"
                  role="menuitem"
                >
                  <LayoutDashboard size={16} aria-hidden />
                  Dashboard
                </Link>
              </motion.li>
              <motion.li role="none" variants={reducedMotion ? undefined : navItem} transition={t}>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-neutral-600 hover:text-primary font-medium text-sm tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-none px-4 py-2.5 min-h-[44px] flex items-center gap-1.5"
                  aria-label="Sign out"
                >
                  <LogOut size={16} aria-hidden />
                  Log out
                </button>
              </motion.li>
            </>
          ) : (
            <motion.li role="none" variants={reducedMotion ? undefined : navItem} transition={t} className="shrink-0">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-1.5 rounded-none bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-[filter] duration-200 min-h-[44px] min-w-[100px]"
                role="menuitem"
              >
                <LogIn size={16} aria-hidden />
                Log in
              </Link>
            </motion.li>
          )}
        </motion.ul>

        <motion.button
          type="button"
          className="md:hidden shrink-0 min-h-[44px] min-w-[44px] p-2 rounded-none text-neutral-600 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="x"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="md:hidden border-t border-neutral-100 bg-white overflow-hidden"
          >
            <ul className="flex flex-col px-4 py-4 gap-0" role="menu">
              {navLinks.map(({ href, label }) => (
                <li key={label} role="none">
                  <Link
                    href={href}
                    className="block py-3 min-h-[44px] flex items-center text-neutral-600 hover:text-primary font-medium text-sm border-b border-neutral-100 last:border-0"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              {status === "authenticated" ? (
                <>
                  <li role="none">
                    <Link
                      href="/dashboard"
                      className="block py-3 min-h-[44px] flex items-center gap-2 text-neutral-600 hover:text-primary font-medium text-sm border-b border-neutral-100"
                      role="menuitem"
                      onClick={() => setOpen(false)}
                    >
                      <LayoutDashboard size={16} aria-hidden />
                      Dashboard
                    </Link>
                  </li>
                  <li role="none">
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="block w-full text-left py-3 min-h-[44px] flex items-center gap-2 text-neutral-600 hover:text-primary font-medium text-sm"
                      aria-label="Sign out"
                    >
                      <LogOut size={16} aria-hidden />
                      Log out
                    </button>
                  </li>
                </>
              ) : (
                <li role="none">
                  <Link
                    href="/login"
                    className="block py-3 min-h-[44px] flex items-center gap-2 text-primary font-semibold text-sm"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    <LogIn size={16} aria-hidden />
                    Log in
                  </Link>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
