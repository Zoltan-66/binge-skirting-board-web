import type { Metadata } from "next";
import { CategoryProductsPage } from "@/features/binge-pages/CategoryProductsPage";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Plaster-In Skirting",
  alternates: metadataAlternates(["products", "plaster-in-skirting"]),
};

export default function Page() {
  return <CategoryProductsPage slug="plaster-in-skirting" />;
}
