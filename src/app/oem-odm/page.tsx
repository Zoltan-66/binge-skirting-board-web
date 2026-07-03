import type { Metadata } from "next";
import { OEMPage } from "@/features/binge-pages/OEMPage";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "OEM & ODM",
  alternates: metadataAlternates(["oem-odm"]),
};

export default function Page() {
  return <OEMPage />;
}
