import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Oswald, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Providers from "./providers";
import Background from "@/components/Background";
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

export const metadata: Metadata = {
  title: "Saxola Nqaba | Application Developer",
  description:
    "Portfolio of Saxola Nqaba, an application developer building web, mobile and cloud applications.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${oswald.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        <Providers>
          <Background />
          <div className="relative z-10">{children}</div>
        </Providers>
      </body>
    </html>
  );
}