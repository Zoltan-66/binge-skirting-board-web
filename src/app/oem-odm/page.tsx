import type { Metadata } from "next";
import { OEMPage } from "@/features/binge-pages/OEMPage";

export const metadata: Metadata = { title: "OEM & ODM" };

export default function Page() {
  return <OEMPage />;
}
