import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cigar Shop Finder",
  description: "Find local cigar shops, lounges, and humidors near you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}