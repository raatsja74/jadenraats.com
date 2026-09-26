import type { Metadata } from "next";
import { Anton, Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import "@jadenraats/universal-design-system/dist/uds.core.css";
import "@jadenraats/universal-design-system/dist/themes/jadenraats.css";
import "./globals.css";

const display = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jadenraats.com"),
  title: "Jaden Raats — AI for business owners, proven in a real business",
  description:
    "I run a floor coating company in Phoenix and use AI to run it better. Tools and plain-English guidance for business owners, tested in real operations first.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Jaden Raats — AI for business owners, proven in a real business",
    description:
      "AI tools and plain-English guidance for business owners, tested in a real operating business first.",
    url: "https://jadenraats.com",
    siteName: "jadenraats.com",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaden Raats — AI for business owners, proven in a real business",
    description:
      "AI tools and plain-English guidance for business owners, tested in a real operating business first.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-uds-theme="jadenraats" className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <head>
        <meta name="color-scheme" content="light only" />
      </head>
      <body className="texture-grain">{children}</body>
    </html>
  );
}
