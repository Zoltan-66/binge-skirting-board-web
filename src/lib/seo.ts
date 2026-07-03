import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bingeskirtingboard.com").replace(
  /\/+$/,
  "",
);

export const siteMetadataBase = new URL(siteUrl);

export const supportedLocales = ["en", "zh", "de", "es", "fr"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const defaultLocale: SupportedLocale = "en";

export const localizedStaticSlugs = [
  [],
  ["products"],
  ["applications"],
  ["downloads"],
  ["oem-odm"],
  ["request-a-quote"],
  ["products", "aluminum-skirting"],
  ["products", "tg-clip-on-solid-wood-skirting-system"],
] as const;

export function localizedPath(locale: SupportedLocale, slug: readonly string[] = []) {
  const path = slug.join("/");
  return `/${locale}${path ? `/${path}` : ""}`;
}

export function metadataAlternates(
  slug: readonly string[] = [],
  locale: SupportedLocale = defaultLocale,
): Metadata["alternates"] {
  return {
    canonical: localizedPath(locale, slug),
    languages: {
      en: localizedPath("en", slug),
      "zh-CN": localizedPath("zh", slug),
      de: localizedPath("de", slug),
      es: localizedPath("es", slug),
      fr: localizedPath("fr", slug),
      "x-default": localizedPath(defaultLocale, slug),
    },
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, siteMetadataBase).toString();
}
