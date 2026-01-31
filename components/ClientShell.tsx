"use client";

import { SessionProvider } from "next-auth/react";
import { type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsAppFab";

export function ClientShell({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Header />
      <main id="content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <WhatsAppFab />
    </SessionProvider>
  );
}
