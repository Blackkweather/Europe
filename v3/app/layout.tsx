import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { HeaderWrapper } from "@/components/HeaderWrapper";
import { FooterWrapper } from "@/components/FooterWrapper";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { BodyTheme } from "@/components/BodyTheme";
import { SessionProvider } from "@/components/providers/SessionProvider";

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "European Era - International Mobility",
  description:
    "Comprehensive Management of Erasmus+ Mobilities and Teacher Training Courses. European Era – The New Era In International Mobility.",
  openGraph: {
    title: "European Era - International Mobility",
    description:
      "Comprehensive Management of Erasmus+ Mobilities and Teacher Training Courses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans min-h-screen flex flex-col bg-[var(--color-primary-dark)]">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <SessionProvider>
          <BodyTheme />
          <HeaderWrapper />
          <main id="content" className="flex-1" tabIndex={-1}>
            {children}
          </main>
          <FooterWrapper />
          <WhatsAppFab />
        </SessionProvider>
      </body>
    </html>
  );
}
