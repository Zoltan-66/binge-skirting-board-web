import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogueProductPage } from "@/features/binge-pages/CatalogueProductPage";
import { getProductBySlug } from "@/data/product-catalogue";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "TG Clip-On Solid Wood Skirting System",
  alternates: metadataAlternates(["products", "tg-clip-on-solid-wood-skirting-system"]),
};

export default function Page() {
  const product = getProductBySlug("tg-clip-on-solid-wood-skirting-system");
  if (!product) notFound();
  return <CatalogueProductPage product={product} />;
}
