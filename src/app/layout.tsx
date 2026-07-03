import type { Metadata } from "next";
import { SiteShell } from "@/components/binge/SiteShell";
import { siteMetadataBase } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteMetadataBase,
  title: {
    default: "BINGE Architectural Skirting & Profile Systems",
    template: "%s | BINGE",
  },
  description:
    "Architectural skirting boards, recessed systems, trims, and OEM profile solutions for international projects.",
  applicationName: "BINGE",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "BINGE",
    title: "BINGE Architectural Skirting & Profile Systems",
    description:
      "Architectural skirting boards, recessed systems, trims, and OEM profile solutions for international projects.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
