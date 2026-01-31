import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WhatsAppFab } from "../components/WhatsAppFab";
import { SessionProvider } from "../components/providers/SessionProvider";

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
      <body className="font-sans min-h-screen flex flex-col">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <SessionProvider>
          <Header />
          <main id="content" className="flex-1 pb-4" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <WhatsAppFab />
        </SessionProvider>
      </body>
    </html>
  );
}
