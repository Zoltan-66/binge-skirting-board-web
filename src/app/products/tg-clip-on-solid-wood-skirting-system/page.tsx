import type { Metadata } from "next";
import { TGProductPage } from "@/features/binge-pages/TGProductPage";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "TG Clip-On Solid Wood Skirting System",
  alternates: metadataAlternates(["products", "tg-clip-on-solid-wood-skirting-system"]),
};

export default function Page() {
  return <TGProductPage />;
}
