import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NC750X Roadbook Builder",
  description:
    "Bangkok to Mae Hong Son Loop — 13-day Honda NC750X ride plan roadbook",
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
