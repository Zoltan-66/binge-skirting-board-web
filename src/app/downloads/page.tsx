import type { Metadata } from "next";
import { DownloadsPage } from "@/features/binge-pages/DownloadsPage";

export const metadata: Metadata = { title: "Technical Downloads" };

export default function Page() {
  return <DownloadsPage />;
}
