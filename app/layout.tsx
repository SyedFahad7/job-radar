import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getFx, getLastSweepDate } from "@/lib/data";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://127.0.0.1:47291",
  ),
  title: {
    default: "Job radar · DevRel",
    template: "%s · Job radar",
  },
  description:
    "Public intern, junior, and mid Developer Relations board for Syed Fahad. Sweep-dated, static, no login.",
  openGraph: {
    title: "Job radar · DevRel",
    description:
      "Intern / junior / mid DevRel roles tracked by Syed Fahad. First sweep 29 Aug 2026.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Job radar · DevRel",
    description:
      "Intern / junior / mid DevRel roles tracked by Syed Fahad.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  const fx = getFx();
  const lastSweepDate = getLastSweepDate();

  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-mono text-ink">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:text-bg"
        >
          Skip to roles
        </a>
        <SiteHeader lastSweepDate={lastSweepDate} fxNote={fx.note} />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
