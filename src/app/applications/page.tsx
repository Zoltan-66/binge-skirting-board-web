import type { Metadata } from "next";
import { ApplicationsPage } from "@/features/binge-pages/ApplicationsPage";

export const metadata: Metadata = { title: "Applications" };

export default function Page() {
  return <ApplicationsPage />;
}
