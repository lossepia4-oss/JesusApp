import type { Metadata, Viewport } from "next";
import { DM_Sans, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import { PwaRegister } from "@/components/PwaRegister";
import { ReminderScheduler } from "@/components/ReminderScheduler";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Near",
    template: "%s · Near",
  },
  description: "Questions about Jesus, answered from the World English Bible.",
  applicationName: "Near",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Near",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#8b4a2b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>
        <div className="app-shell">
          <header className="site-header">
            <Link href="/" className="wordmark">
              Near
            </Link>
            <nav className="header-links" aria-label="About">
              <Link href="/about">About</Link>
              <Link href="/privacy">Privacy</Link>
            </nav>
          </header>
          <main>{children}</main>
          <BottomNav />
        </div>
        <PwaRegister />
        <ReminderScheduler />
      </body>
    </html>
  );
}
