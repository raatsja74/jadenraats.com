import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jaden Raats | Software Engineer & Designer",
  description:
    "Building high-performance web applications, AI systems, and design-led experiences.",
  keywords: [
    "Software Engineer",
    "Product Designer",
    "Jaden Raats",
    "Next.js",
    "AI Systems",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
