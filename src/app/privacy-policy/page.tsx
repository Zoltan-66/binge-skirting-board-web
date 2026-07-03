import type { Metadata } from "next";
import { LegalPage } from "@/features/binge-pages/LegalPage";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: metadataAlternates(["privacy-policy"]),
};

export default function Page() {
  return <LegalPage kind="privacy-policy" />;
}
