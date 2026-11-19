import type { Metadata } from "next";
import "@jadenraats/universal-design-system/dist/uds.core.css";
import "@jadenraats/universal-design-system/dist/themes/jadenraats-modern.css";
import "../tokens/modern.css";
import "./globals.css";
import { SHARE_IMAGES } from "@/lib/share-image";

const themeInit = `(function(){try{var saved=localStorage.getItem('jaden-theme');var theme=saved==='dark'||saved==='light'?saved:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-site-theme',theme)}catch(_){document.documentElement.setAttribute('data-site-theme','light')}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://jadenraats.com"),
  title: "Jaden Raats | Practical AI guides in plain English",
  description:
    "I run a floor coating company in Phoenix and use AI to run it better. Tools and plain-English guidance for business owners, tested in real operations first.",
  openGraph: {
    title: "Jaden Raats | Practical AI guides in plain English",
    description:
      "AI tools and plain-English guidance for business owners, tested in a real operating business first.",
    url: "https://jadenraats.com",
    siteName: "jadenraats.com",
    locale: "en_US",
    type: "website",
    images: SHARE_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaden Raats | Practical AI guides in plain English",
    description:
      "AI tools and plain-English guidance for business owners, tested in a real operating business first.",
    images: SHARE_IMAGES,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-uds-theme="jadenraats-modern" data-site-theme="light" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
