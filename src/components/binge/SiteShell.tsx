"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Footer } from "./Footer";
import { GuidedTour } from "./GuidedTour";
import { LocalizedDomText } from "./LocalizedDomText";
import { Navigation } from "./Navigation";
import { useBingeSectionMotion } from "./useBingeSectionMotion";
import { useI18n } from "@/lib/i18n";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { locale } = useI18n();
  const mainRef = useRef<HTMLElement | null>(null);
  const isHome = pathname === "/" || /^\/(en|zh|de|es|fr)$/.test(pathname);

  useBingeSectionMotion(mainRef, {
    auto: !isHome,
    disabled: isHome,
    imageParallax: false,
    refreshKey: pathname,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : locale;
  }, [locale]);

  return (
    <div className="binge-site-shell">
      <Navigation />
      <main ref={mainRef}>{children}</main>
      <Footer />
      <GuidedTour />
      <LocalizedDomText locale={locale} />
    </div>
  );
}
