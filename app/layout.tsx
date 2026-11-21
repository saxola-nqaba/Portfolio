import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Oswald, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Providers from "./providers";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NavigationTracker from "@/components/NavigationTracker";
import TooltipFit from "@/components/TooltipFit";
import { getProfile } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

const description =
  "Portfolio of Saxola Nqaba, an application developer building web, mobile and cloud applications.";

export const metadata: Metadata = {
  // Turns relative image paths (like the OG image) into full URLs
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Saxola Nqaba | Application Developer",
    // Child pages set just their own name; this adds the suffix
    template: "%s | Saxola Nqaba",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "Saxola Nqaba",
    title: "Saxola Nqaba | Application Developer",
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saxola Nqaba | Application Developer",
    description,
  },
};

// Colours the mobile browser bar to match the theme
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#12141c" },
    { media: "(prefers-color-scheme: light)", color: "#f6f3ec" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const profile = getProfile();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      // Tells Next.js the site uses smooth scrolling, so it turns it off while changing pages
      data-scroll-behavior="smooth"
      className={`${oswald.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-accent"
          >
            Skip to content
          </a>
          <NavigationTracker />
          <TooltipFit />
          <Background />
          <div id="top" className="relative z-10 flex min-h-screen flex-col">
            <Navbar name={profile.name} role={profile.role} cvPath={profile.cvPath} />
            <div id="main" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
