import type { Metadata } from "next";
import { DownloadsPage } from "@/features/binge-pages/DownloadsPage";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Technical Downloads",
  alternates: metadataAlternates(["downloads"]),
};

export default function Page() {
  return <DownloadsPage />;
}
