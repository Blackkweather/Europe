"use client";

import dynamic from "next/dynamic";
import { type ReactNode } from "react";

const NextAuthSessionProvider = dynamic(
  () =>
    import("next-auth/react").then((mod) => ({
      default: mod.SessionProvider,
    })),
  { ssr: true }
);

export function DynamicSessionProvider({ children }: { children: ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
