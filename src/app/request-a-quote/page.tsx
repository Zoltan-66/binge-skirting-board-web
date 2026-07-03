import type { Metadata } from "next";
import { RequestAQuotePage } from "@/features/binge-pages/RequestAQuotePage";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Request a Quote",
  alternates: metadataAlternates(["request-a-quote"]),
};

export default function Page() {
  return <RequestAQuotePage />;
}
