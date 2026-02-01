"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClass =
    "sticky top-0 z-50 w-full border-b border-[var(--color-primary)]/15 text-[var(--color-primary)] transition-all duration-300 " +
    (scrolled ? "bg-white/90 backdrop-blur-md" : "bg-white");

  const navLinkBase =
    "relative font-medium text-sm tracking-wide px-4 py-2.5 min-h-[44px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 rounded-none transition-colors duration-200 " +
    "after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-[var(--color-accent)] after:origin-center after:transition-transform after:duration-200 after:rounded-full";
  const navLinkClass = (href: string) =>
    navLinkBase +
    " text-[var(--color-primary)] hover:text-[var(--color-primary)]/90 " +
    (pathname === href ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100");

  const mobileBg = "bg-white/95 backdrop-blur-sm border-[var(--color-primary)]/10";

  return (
    <header className={headerClass} role="banner" aria-label="Main navigation">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 flex items-center hover:opacity-90 transition-opacity duration-200" aria-label="European Era – home">
          <Image src="/logo.png?v=2" alt="European Era" width={220} height={58} className="h-12 sm:h-14 w-auto object-contain" priority unoptimized />
        </Link>

        <ul className="hidden md:flex items-center gap-0.5 lg:gap-1 flex-wrap justify-end shrink min-w-0" role="menubar">
          {navLinks.map(({ href, label }) => (
            <li key={label} role="none">
              <Link href={href} className={navLinkClass(href)} role="menuitem">
                {label}
              </Link>
            </li>
          ))}
          {status === "authenticated" ? (
            <>
              <li role="none">
                <Link href="/dashboard" className={`${navLinkClass("/dashboard")} gap-1.5`} role="menuitem">
                  <LayoutDashboard size={16} aria-hidden />
                  Dashboard
                </Link>
              </li>
              <li role="none">
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className={navLinkBase + " after:scale-x-0 text-[var(--color-primary)] hover:text-[var(--color-primary)]/90"}
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
                className="inline-flex items-center justify-center gap-1.5 rounded-none px-4 py-2.5 text-sm font-semibold min-h-[44px] min-w-[100px] bg-[var(--color-accent)] text-[var(--color-primary)] hover:bg-[var(--color-accent)]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)] transition-colors duration-200"
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
          className="md:hidden shrink-0 min-h-[44px] min-w-[44px] p-2 rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-colors duration-200"
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
                    className={`block py-3 min-h-[44px] flex items-center font-medium text-sm border-b last:border-0 text-[var(--color-primary)] hover:text-[var(--color-primary)]/90 border-[var(--color-primary)]/10 ${
                      pathname === href ? "border-l-2 border-l-[var(--color-accent)] pl-3 -ml-px" : ""
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
                    <Link href="/dashboard" className={`block py-3 min-h-[44px] flex items-center gap-2 font-medium text-sm border-b text-[var(--color-primary)] border-[var(--color-primary)]/10 ${pathname === "/dashboard" ? "border-l-2 border-l-[var(--color-accent)] pl-3 -ml-px" : ""}`} role="menuitem" onClick={() => setOpen(false)}>
                      <LayoutDashboard size={16} aria-hidden />
                      Dashboard
                    </Link>
                  </li>
                  <li role="none">
                    <button type="button" onClick={() => { setOpen(false); signOut({ callbackUrl: "/" }); }} className="block w-full text-left py-3 min-h-[44px] flex items-center gap-2 font-medium text-sm text-[var(--color-primary)]" aria-label="Sign out">
                      <LogOut size={16} aria-hidden />
                      Log out
                    </button>
                  </li>
                </>
              ) : (
                <li role="none">
                  <Link href="/login" className="block py-3 min-h-[44px] flex items-center gap-2 font-semibold text-sm text-[var(--color-accent)] hover:text-[var(--color-accent)]/90" role="menuitem" onClick={() => setOpen(false)}>
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
