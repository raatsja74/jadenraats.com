import type { Metadata } from "next";
import "@jadenraats/universal-design-system/dist/uds.core.css";
import "@jadenraats/universal-design-system/dist/themes/jadenraats.css";
import "../tokens/modern.css";
import "./globals.css";

const themeInit = `(function(){try{var saved=localStorage.getItem('jaden-theme');var theme=saved==='dark'||saved==='light'?saved:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-site-theme',theme)}catch(_){document.documentElement.setAttribute('data-site-theme','light')}})();`;

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
    <html lang="en" data-uds-theme="jadenraats" data-site-theme="light" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
