"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, LayoutDashboard, LogOut } from "lucide-react";

const navLinks = [
  { href: "/student-mobilities", label: "Student Mobilities" },
  { href: "/staff-mobility", label: "Staff Mobility" },
  { href: "/about", label: "About Us" },
  { href: "/our-commitment", label: "Our Commitment" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

type HeaderProps = { transparent?: boolean };

export function Header({ transparent = false }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  const headerClass = transparent
    ? "sticky top-0 z-50 w-full border-b border-white/10 bg-[var(--color-primary-dark)]/80 backdrop-blur-md text-white"
    : "sticky top-0 z-50 w-full border-b border-neutral-200 bg-white text-neutral-900";
  const linkClass = transparent
    ? "text-white/80 hover:text-white font-medium text-sm tracking-wide transition-colors px-4 py-2.5 min-h-[44px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-none"
    : "text-neutral-600 hover:text-primary font-medium text-sm tracking-wide transition-colors px-4 py-2.5 min-h-[44px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-none";
  const logoClass = transparent
    ? "font-heading text-xl font-semibold text-white hover:text-white/90 transition-opacity"
    : "font-heading text-xl font-semibold text-primary hover:opacity-90 transition-opacity";
  const mobileBg = transparent ? "bg-[var(--color-primary-dark)] border-white/10" : "bg-white border-neutral-100";

  return (
    <header className={headerClass} role="banner" aria-label="Main navigation">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className={`shrink-0 ${logoClass}`} aria-label="European Era – home">
          European Era
        </Link>

        <ul className="hidden md:flex items-center gap-0.5 lg:gap-1 flex-wrap justify-end shrink min-w-0" role="menubar">
          {navLinks.map(({ href, label }) => (
            <li key={label} role="none">
              <Link href={href} className={linkClass} role="menuitem">
                {label}
              </Link>
            </li>
          ))}
          {status === "authenticated" ? (
            <>
              <li role="none">
                <Link href="/dashboard" className={`${linkClass} gap-1.5`} role="menuitem">
                  <LayoutDashboard size={16} aria-hidden />
                  Dashboard
                </Link>
              </li>
              <li role="none">
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className={linkClass}
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
                className={`inline-flex items-center justify-center gap-1.5 rounded-none px-4 py-2.5 text-sm font-semibold min-h-[44px] min-w-[100px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  transparent
                    ? "bg-white text-[var(--color-primary-dark)] hover:bg-white/90 focus-visible:ring-white/50"
                    : "bg-primary text-white hover:brightness-105 focus-visible:ring-primary"
                }`}
                role="menuitem"
              >
                <LogIn size={16} aria-hidden />
                Log in
              </Link>
            </li>
          )}
        </ul>

        <button
          type="button"
          className={`md:hidden shrink-0 min-h-[44px] min-w-[44px] p-2 rounded-none focus:outline-none focus-visible:ring-2 ${
            transparent ? "text-white hover:bg-white/10 focus-visible:ring-white/50" : "text-neutral-600 hover:bg-neutral-100 focus-visible:ring-primary"
          }`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <AnimatePresence mode="wait">
            {open ? <X size={22} /> : <Menu size={22} />}
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden border-t ${mobileBg} overflow-hidden`}
          >
            <ul className="flex flex-col px-4 py-4 gap-0" role="menu">
              {navLinks.map(({ href, label }) => (
                <li key={label} role="none">
                  <Link
                    href={href}
                    className={`block py-3 min-h-[44px] flex items-center font-medium text-sm border-b last:border-0 ${
                      transparent ? "text-white/90 hover:text-white border-white/10" : "text-neutral-600 hover:text-primary border-neutral-100"
                    }`}
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
                    <Link href="/dashboard" className={`block py-3 min-h-[44px] flex items-center gap-2 font-medium text-sm border-b ${transparent ? "text-white/90 border-white/10" : "text-neutral-600 border-neutral-100"}`} role="menuitem" onClick={() => setOpen(false)}>
                      <LayoutDashboard size={16} aria-hidden />
                      Dashboard
                    </Link>
                  </li>
                  <li role="none">
                    <button type="button" onClick={() => { setOpen(false); signOut({ callbackUrl: "/" }); }} className={`block w-full text-left py-3 min-h-[44px] flex items-center gap-2 font-medium text-sm ${transparent ? "text-white/90" : "text-neutral-600"}`} aria-label="Sign out">
                      <LogOut size={16} aria-hidden />
                      Log out
                    </button>
                  </li>
                </>
              ) : (
                <li role="none">
                  <Link href="/login" className={`block py-3 min-h-[44px] flex items-center gap-2 font-semibold text-sm ${transparent ? "text-white" : "text-primary"}`} role="menuitem" onClick={() => setOpen(false)}>
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
