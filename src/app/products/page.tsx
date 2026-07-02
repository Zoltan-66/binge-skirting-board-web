import type { Metadata } from "next";
import { ProductsPage } from "@/features/binge-pages/ProductsPage";

export const metadata: Metadata = { title: "Products" };

export default function Page() {
  return <ProductsPage />;
}
