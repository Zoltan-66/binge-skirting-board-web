import type { Metadata } from "next";
import { RequestAQuotePage } from "@/features/binge-pages/RequestAQuotePage";

export const metadata: Metadata = { title: "Request a Quote" };

export default function Page() {
  return <RequestAQuotePage />;
}
