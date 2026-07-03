import { notFound } from "next/navigation";
import { ApplicationsPage } from "@/features/binge-pages/ApplicationsPage";
import { DownloadsPage } from "@/features/binge-pages/DownloadsPage";
import { HomePage } from "@/features/binge-pages/HomePage";
import { OEMPage } from "@/features/binge-pages/OEMPage";
import { ProductsPage } from "@/features/binge-pages/ProductsPage";
import { RequestAQuotePage } from "@/features/binge-pages/RequestAQuotePage";
import { LegalPage } from "@/features/binge-pages/LegalPage";
import { CategoryProductsPage } from "@/features/binge-pages/CategoryProductsPage";
import { CatalogueProductPage } from "@/features/binge-pages/CatalogueProductPage";
import { PRODUCT_CATALOGUE, PRODUCT_CATEGORY_ROUTES, getProductBySlug, getProductCategoryRoute } from "@/data/product-catalogue";
import { localizedStaticSlugs, metadataAlternates, supportedLocales, type SupportedLocale } from "@/lib/seo";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: string; slug?: string[] }> };
const staticSlugs = [
  ...localizedStaticSlugs,
  ...PRODUCT_CATEGORY_ROUTES.map(route => ["products", route.slug]),
  ["products", "accessories"],
  ...PRODUCT_CATALOGUE.map(product => ["products", product.slug]),
];

export const dynamicParams = false;

export function generateStaticParams() {
  return supportedLocales.flatMap(locale =>
    staticSlugs.map(slug => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug = [] } = await params;
  const metadataByLocale: Record<string, { title: string; description: string }> = {
    en: { title: "BINGE Architectural Skirting & Profile Systems", description: "Architectural skirting, trim and profile systems for project, distribution and OEM requirements." },
    zh: { title: "BINGE 建筑踢脚线与型材系统", description: "面向建筑、经销与 OEM 项目的踢脚线、收边条及型材系统。" },
    de: { title: "BINGE Architektonische Sockelleisten- und Profilsysteme", description: "Architektonische Sockelleisten, Abschluss- und Profilsysteme für Projekte, Vertrieb und OEM-Anforderungen." },
    es: { title: "BINGE Sistemas arquitectónicos de rodapiés y perfiles", description: "Sistemas arquitectónicos de rodapiés, remates y perfiles para proyectos, distribución y OEM." },
    fr: { title: "BINGE Systèmes architecturaux de plinthes et de profilés", description: "Systèmes architecturaux de plinthes, finitions et profilés pour projets, distribution et OEM." },
  };
  const localizedMetadata = metadataByLocale[locale] ?? metadataByLocale.en;
  return {
    ...localizedMetadata,
    alternates: metadataAlternates(slug, locale as SupportedLocale),
  };
}

export default async function LocalizedPage({ params }: PageProps) {
  const { locale, slug = [] } = await params;
  if (!supportedLocales.includes(locale as (typeof supportedLocales)[number])) notFound();

  const path = slug.join("/");
  if (!path) return <HomePage />;
  if (path === "products") return <ProductsPage />;
  if (path === "applications") return <ApplicationsPage />;
  if (path === "downloads") return <DownloadsPage />;
  if (path === "oem-odm") return <OEMPage />;
  if (path === "request-a-quote") return <RequestAQuotePage />;
  if (path === "privacy-policy") return <LegalPage kind="privacy-policy" />;
  if (path === "terms-of-use") return <LegalPage kind="terms-of-use" />;
  if (path === "cookie-settings") return <LegalPage kind="cookie-settings" />;
  if (path === "products/accessories") {
    return <CategoryProductsPage slug="trims-profiles" />;
  }

  if (slug.length === 2 && slug[0] === "products") {
    const categoryRoute = getProductCategoryRoute(slug[1]);
    if (categoryRoute) return <CategoryProductsPage slug={categoryRoute.slug} />;
    const product = getProductBySlug(slug[1]);
    if (product) return <CatalogueProductPage product={product} />;
  }

  notFound();
}
