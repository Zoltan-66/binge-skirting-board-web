import type { Metadata } from "next";
import { AluminiumSkirtingPage } from "@/features/binge-pages/AluminiumSkirtingPage";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Aluminium Skirting Systems",
  alternates: metadataAlternates(["products", "aluminum-skirting"]),
};

export default function Page() {
  return <AluminiumSkirtingPage />;
}
