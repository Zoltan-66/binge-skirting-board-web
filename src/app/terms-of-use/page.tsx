import type { Metadata } from "next";
import { LegalPage } from "@/features/binge-pages/LegalPage";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Use",
  alternates: metadataAlternates(["terms-of-use"]),
};

export default function Page() {
  return <LegalPage kind="terms-of-use" />;
}
