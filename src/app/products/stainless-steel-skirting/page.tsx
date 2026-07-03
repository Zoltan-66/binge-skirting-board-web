import type { Metadata } from "next";
import { CategoryProductsPage } from "@/features/binge-pages/CategoryProductsPage";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Stainless Steel Skirting",
  alternates: metadataAlternates(["products", "stainless-steel-skirting"]),
};

export default function Page() {
  return <CategoryProductsPage slug="stainless-steel-skirting" />;
}
