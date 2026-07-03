import type { Metadata } from "next";
import { CategoryProductsPage } from "@/features/binge-pages/CategoryProductsPage";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Recessed Skirting",
  alternates: metadataAlternates(["products", "recessed-skirting"]),
};

export default function Page() {
  return <CategoryProductsPage slug="recessed-skirting" />;
}
