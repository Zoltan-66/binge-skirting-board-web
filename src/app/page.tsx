import type { Metadata } from "next";
import { HomePage } from "@/features/binge-pages/HomePage";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: metadataAlternates([]),
};

export default function Page() {
  return <HomePage />;
}
