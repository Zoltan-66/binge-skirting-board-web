"use client";

import { usePathname } from "next/navigation";

export const locales = ["en", "zh", "de", "es", "fr"] as const;
export type Locale = (typeof locales)[number];

export function localeFromPathname(pathname: string): Locale {
  const match = pathname.match(/^\/(en|zh|de|es|fr)(?=\/|$)/);
  return (match?.[1] as Locale | undefined) ?? "en";
}

export function stripLocale(pathname: string) {
  const stripped = pathname.replace(/^\/(en|zh|de|es|fr)(?=\/|$)/, "");
  return stripped || "/";
}

export function pathForLocale(pathname: string, locale: Locale) {
  const bare = stripLocale(pathname);
  return `/${locale}${bare === "/" ? "" : bare}`;
}

export function localizeHref(href: string, locale: Locale, localizedRoute: boolean) {
  if (!localizedRoute || !href.startsWith("/") || href.startsWith("//")) return href;
  const [path, hash = ""] = href.split("#");
  const localized = pathForLocale(path, locale);
  return hash ? `${localized}#${hash}` : localized;
}

const messages = {
  en: {
    products: "Products", applications: "Applications", oem: "OEM / ODM",
    downloads: "Downloads", about: "About", quote: "Request a Quote",
    language: "Select language", english: "English", chinese: "简体中文", german: "Deutsch", spanish: "Español", french: "Français",
    heroLabel: "Architectural Skirting & Profile Systems",
    heroTitle: "Architectural profiles, engineered for modern interiors.",
    heroBody: "Aluminium, stainless steel and solid wood skirting systems manufactured for distributors, contractors and OEM projects across Europe, UK, ANZ.",
    exploreProducts: "Explore Products", requestCatalogue: "Request a Catalogue",
    productSystems: "Product Systems", productHeading: "One manufacturing partner. Multiple architectural solutions.",
    featuredSystem: "Featured System — WS-TG", featuredTitle: "TG Clip-On Solid Wood Skirting System",
    technicalResources: "Technical Resources", technicalHeading: "Specifications, drawings and documentation.",
    finalHeading: "Tell us what your project needs.",
  },
  zh: {
    products: "产品", applications: "应用场景", oem: "OEM / ODM",
    downloads: "技术资料", about: "关于我们", quote: "获取报价",
    language: "选择语言", english: "English", chinese: "简体中文", german: "Deutsch", spanish: "Español", french: "Français",
    heroLabel: "建筑踢脚线与型材系统",
    heroTitle: "为现代室内空间打造的建筑型材。",
    heroBody: "面向欧洲、英国、澳大利亚及新西兰的经销商、承包商和 OEM 项目，提供铝合金、不锈钢及实木踢脚线系统。",
    exploreProducts: "浏览产品", requestCatalogue: "索取产品目录",
    productSystems: "产品系统", productHeading: "一个制造合作伙伴，多种建筑型材解决方案。",
    featuredSystem: "重点产品 — WS-TG", featuredTitle: "TG 卡扣式实木踢脚线系统",
    technicalResources: "技术资料", technicalHeading: "规格、图纸与产品文档。",
    finalHeading: "告诉我们您的项目需求。",
  },
  de: {
    products: "Produkte", applications: "Anwendungen", oem: "OEM / ODM",
    downloads: "Downloads", about: "Über uns", quote: "Angebot anfordern",
    language: "Sprache auswählen", english: "English", chinese: "简体中文", german: "Deutsch", spanish: "Español", french: "Français",
    heroLabel: "Architektonische Sockelleisten- und Profilsysteme",
    heroTitle: "Architekturprofile für moderne Innenräume.",
    heroBody: "Sockelleistensysteme aus Aluminium, Edelstahl und Massivholz für Händler, Auftragnehmer und OEM-Projekte in Europa, Großbritannien, Australien und Neuseeland.",
    exploreProducts: "Produkte entdecken", requestCatalogue: "Katalog anfordern",
    productSystems: "Produktsysteme", productHeading: "Ein Fertigungspartner. Vielfältige architektonische Lösungen.",
    featuredSystem: "Ausgewähltes System — WS-TG", featuredTitle: "TG Clip-On Sockelleistensystem aus Massivholz",
    technicalResources: "Technische Unterlagen", technicalHeading: "Spezifikationen, Zeichnungen und Dokumentation.",
    finalHeading: "Erzählen Sie uns von Ihrem Projekt.",
  },
  es: {
    products: "Productos", applications: "Aplicaciones", oem: "OEM / ODM",
    downloads: "Descargas", about: "Nosotros", quote: "Solicitar presupuesto",
    language: "Seleccionar idioma", english: "English", chinese: "简体中文", german: "Deutsch", spanish: "Español", french: "Français",
    heroLabel: "Sistemas arquitectónicos de rodapiés y perfiles",
    heroTitle: "Perfiles arquitectónicos para interiores modernos.",
    heroBody: "Sistemas de rodapiés de aluminio, acero inoxidable y madera maciza para distribuidores, contratistas y proyectos OEM en Europa, Reino Unido, Australia y Nueva Zelanda.",
    exploreProducts: "Ver productos", requestCatalogue: "Solicitar catálogo",
    productSystems: "Sistemas de producto", productHeading: "Un socio de fabricación. Múltiples soluciones arquitectónicas.",
    featuredSystem: "Sistema destacado — WS-TG", featuredTitle: "Sistema de rodapié de madera maciza TG Clip-On",
    technicalResources: "Recursos técnicos", technicalHeading: "Especificaciones, planos y documentación.",
    finalHeading: "Cuéntenos qué necesita su proyecto.",
  },
  fr: {
    products: "Produits", applications: "Applications", oem: "OEM / ODM",
    downloads: "Téléchargements", about: "À propos", quote: "Demander un devis",
    language: "Choisir la langue", english: "English", chinese: "简体中文", german: "Deutsch", spanish: "Español", french: "Français",
    heroLabel: "Systèmes architecturaux de plinthes et de profilés",
    heroTitle: "Des profilés architecturaux pour les intérieurs modernes.",
    heroBody: "Systèmes de plinthes en aluminium, acier inoxydable et bois massif pour distributeurs, entrepreneurs et projets OEM en Europe, au Royaume-Uni, en Australie et en Nouvelle-Zélande.",
    exploreProducts: "Découvrir les produits", requestCatalogue: "Demander le catalogue",
    productSystems: "Systèmes de produits", productHeading: "Un partenaire de fabrication. De multiples solutions architecturales.",
    featuredSystem: "Système vedette — WS-TG", featuredTitle: "Système de plinthe en bois massif TG Clip-On",
    technicalResources: "Ressources techniques", technicalHeading: "Spécifications, plans et documentation.",
    finalHeading: "Parlez-nous des besoins de votre projet.",
  },
} as const;

export type MessageKey = keyof typeof messages.en;

export function useI18n() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  return { locale, pathname, t: (key: MessageKey) => messages[locale][key] };
}
