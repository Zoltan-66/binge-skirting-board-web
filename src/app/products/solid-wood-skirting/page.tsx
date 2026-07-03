import type { Metadata } from "next";
import { CategoryProductsPage } from "@/features/binge-pages/CategoryProductsPage";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Solid Wood Skirting",
  alternates: metadataAlternates(["products", "solid-wood-skirting"]),
};

export default function Page() {
  return <CategoryProductsPage slug="solid-wood-skirting" />;
}
