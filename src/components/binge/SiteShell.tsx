"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="binge-site-shell">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
