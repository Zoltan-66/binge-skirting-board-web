import type { Metadata } from "next";
import { CategoryProductsPage } from "@/features/binge-pages/CategoryProductsPage";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Trims & Profiles",
  alternates: metadataAlternates(["products", "trims-profiles"]),
};

export default function Page() {
  return <CategoryProductsPage slug="trims-profiles" />;
}
