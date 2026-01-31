"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";

/**
 * Wraps Header with route awareness. On home (deck), header is minimal so Hero leads.
 */
export function HeaderWrapper() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return <Header transparent={isHome} />;
}
