"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Toggles dark scrollbar class on html when on home (template-style page).
 */
export function BodyTheme() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.classList.toggle("scrollbar-dark", pathname === "/");
    return () => document.documentElement.classList.remove("scrollbar-dark");
  }, [pathname]);
  return null;
}
