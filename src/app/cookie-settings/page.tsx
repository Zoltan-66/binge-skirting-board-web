import type { Metadata } from "next";
import { LegalPage } from "@/features/binge-pages/LegalPage";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cookie Settings",
  alternates: metadataAlternates(["cookie-settings"]),
};

export default function Page() {
  return <LegalPage kind="cookie-settings" />;
}
