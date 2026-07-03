import type { Metadata } from "next";
import { CategoryProductsPage } from "@/features/binge-pages/CategoryProductsPage";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "WPC Skirting",
  alternates: metadataAlternates(["products", "wpc-skirting"]),
};

export default function Page() {
  return <CategoryProductsPage slug="wpc-skirting" />;
}
