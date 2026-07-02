import type { Metadata } from "next";
import { SiteShell } from "@/components/binge/SiteShell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BINGE Architectural Skirting & Profile Systems",
    template: "%s | BINGE",
  },
  description:
    "Architectural skirting boards, recessed systems, trims, and OEM profile solutions for international projects.",
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
