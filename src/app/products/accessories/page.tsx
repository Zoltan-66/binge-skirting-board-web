import type { Metadata } from "next";
import { Link } from "@/lib/router-compat";
import { metadataAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Accessories",
  alternates: metadataAlternates(["products", "accessories"]),
};

export default function Page() {
  return (
    <section style={{ background: "var(--binge-white)" }}>
      <div style={{ maxWidth: "var(--binge-content-max)", margin: "0 auto", padding: "var(--binge-section-v) var(--binge-pad-h)" }}>
        <span style={{ fontFamily: "var(--binge-font)", fontSize: "var(--binge-size-label)", fontWeight: 700, color: "var(--binge-orange)", letterSpacing: "var(--binge-tracking-label)", textTransform: "uppercase" }}>
          Accessories
        </span>
        <h1 style={{ margin: "16px 0", color: "var(--binge-text-primary)", fontSize: "var(--binge-size-display-lg)", lineHeight: "var(--binge-lh-display)" }}>
          Matching accessories by product range.
        </h1>
        <p style={{ maxWidth: 720, color: "var(--binge-text-body)", lineHeight: 1.7, fontSize: "var(--binge-size-body-lg)" }}>
          Clips, channels, corners, end caps, joint pieces and seal strips are supplied according to the selected profile family. Compatibility is confirmed with the exact product code before quotation.
        </p>
        <Link to="/request-a-quote?product=accessories" style={{ display: "inline-flex", alignItems: "center", height: 48, padding: "0 28px", marginTop: 24, background: "var(--binge-orange)", color: "#fff", textDecoration: "none", fontFamily: "var(--binge-font)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "var(--binge-tracking-button)" }}>
          Request Accessory Specification
        </Link>
      </div>
    </section>
  );
}
