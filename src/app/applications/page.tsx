import type { Metadata } from "next";
import { ApplicationsPage } from "@/features/binge-pages/ApplicationsPage";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Applications",
  alternates: metadataAlternates(["applications"]),
};

export default function Page() {
  return <ApplicationsPage />;
}
