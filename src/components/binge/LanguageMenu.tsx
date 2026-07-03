"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { pathForLocale, type Locale, useI18n } from "@/lib/i18n";

export function LanguageMenu() {
  const { locale, pathname, t } = useI18n();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const currentLanguage = {
    en: "EN",
    zh: "中文",
    de: "DE",
    es: "ES",
    fr: "FR",
  }[locale];

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  const select = (nextLocale: Locale) => {
    setOpen(false);
    window.dispatchEvent(new Event("binge:close-mobile-navigation"));
    router.push(pathForLocale(pathname, nextLocale));
  };

  return (
    <div ref={rootRef} style={{ position: "relative" }}>
      <style>{`
        @media (max-width: 1023px) {
          .binge-language-menu-panel {
            bottom: calc(100% + 10px) !important;
            max-height: min(320px, calc(100dvh - 160px));
            overflow-y: auto;
            top: auto !important;
          }
        }
      `}</style>
      <button
        type="button"
        aria-label={t("language")}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen(value => !value)}
        style={{
          minHeight: "40px",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--binge-text-body)",
          padding: "8px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "var(--binge-font)",
          fontSize: "var(--binge-size-caption)",
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        <Globe size={17} />
        <span>{currentLanguage}</span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s ease" }}
        />
      </button>
      {open && (
        <div className="binge-language-menu-panel" role="menu" aria-label={t("language")} style={{ position: "absolute", right: 0, top: "calc(100% + 10px)", width: "180px", padding: "6px", background: "#fff", border: "1px solid var(--binge-border)", boxShadow: "0 16px 42px rgba(23,27,32,.14)", zIndex: 80 }}>
          {([['en', t('english')], ['zh', t('chinese')], ['de', t('german')], ['es', t('spanish')], ['fr', t('french')]] as const).map(([value, label]) => (
            <button key={value} type="button" role="menuitemradio" aria-checked={locale === value} onClick={() => select(value)} style={{ width: "100%", minHeight: "42px", padding: "0 10px", display: "flex", alignItems: "center", justifyContent: "space-between", background: locale === value ? "var(--binge-warm-bg)" : "transparent", border: 0, color: "var(--binge-text-primary)", cursor: "pointer", fontFamily: "var(--binge-font)", fontSize: "14px" }}>
              {label}{locale === value && <Check size={15} color="var(--binge-orange)" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
