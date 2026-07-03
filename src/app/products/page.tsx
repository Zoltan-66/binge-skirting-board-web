import type { Metadata } from "next";
import { ProductsPage } from "@/features/binge-pages/ProductsPage";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Products",
  alternates: metadataAlternates(["products"]),
};

export default function Page() {
  return <ProductsPage />;
}
