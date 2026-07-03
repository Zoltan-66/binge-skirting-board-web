import type { Metadata } from "next";
import { CategoryProductsPage } from "@/features/binge-pages/CategoryProductsPage";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "LED Skirting",
  alternates: metadataAlternates(["products", "led-skirting"]),
};

export default function Page() {
  return <CategoryProductsPage slug="led-skirting" />;
}
