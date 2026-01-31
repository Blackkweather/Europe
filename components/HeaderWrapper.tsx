"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";

export function HeaderWrapper() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return <Header transparent={isHome} />;
}
