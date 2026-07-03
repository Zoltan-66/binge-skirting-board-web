import type { ReactNode } from "react";

type LegalPageKind = "privacy-policy" | "terms-of-use" | "cookie-settings";

type Section = {
  title: string;
  body: ReactNode;
};

const CONTACT_EMAIL = "info@bingeskirtingboard.com";
const LAST_UPDATED = "3 July 2026";

const pageContent: Record<LegalPageKind, { title: string; intro: string; sections: Section[] }> = {
  "privacy-policy": {
    title: "Privacy Policy",
    intro:
      "This policy explains how BINGE Architectural Profile Systems handles personal information submitted through this website and related project enquiries.",
    sections: [
      {
        title: "Information We Collect",
        body: (
          <>
            We collect the details you choose to provide when you contact us, request a quotation, ask for samples, or request technical documents. This may include your name, company, email address, phone number, country or region, project requirements, product interests, messages, and submitted files.
          </>
        ),
      },
      {
        title: "How We Use Information",
        body: (
          <>
            We use submitted information to respond to enquiries, prepare quotations, recommend product systems, coordinate samples and technical packs, support OEM or distributor discussions, and keep necessary business records.
          </>
        ),
      },
      {
        title: "Sharing",
        body: (
          <>
            We do not sell personal information. We may share relevant enquiry details with service providers that help us operate the website, process forms, manage customer records, or communicate with you. We may also share information where required by law or to protect our business, customers, and website.
          </>
        ),
      },
      {
        title: "International Enquiries",
        body: (
          <>
            BINGE is based in Zhejiang, China and works with international customers. If you contact us from another country, your information may be processed across borders so that we can respond to your enquiry and support the project.
          </>
        ),
      },
      {
        title: "Retention",
        body: (
          <>
            We keep enquiry and business records only for as long as needed for the purposes described above, including follow-up, quotation history, legal obligations, and dispute prevention.
          </>
        ),
      },
      {
        title: "Your Choices",
        body: (
          <>
            You may ask us to update, correct, or delete your contact information, subject to lawful business and record-keeping requirements. Contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </>
        ),
      },
    ],
  },
  "terms-of-use": {
    title: "Terms of Use",
    intro:
      "These terms govern use of the BINGE website, product pages, downloads, forms, and related content.",
    sections: [
      {
        title: "Website Content",
        body: (
          <>
            Website content is provided for general product, sourcing, and project discussion purposes. Product dimensions, materials, finishes, drawings, certifications, test reports, prices, lead times, and availability must be confirmed in writing for each enquiry or order.
          </>
        ),
      },
      {
        title: "No Final Specification",
        body: (
          <>
            Information shown on this website does not replace approved technical drawings, factory confirmations, samples, contracts, or purchase documents. Do not rely on public website content as the final specification for construction, procurement, compliance, or installation decisions.
          </>
        ),
      },
      {
        title: "Intellectual Property",
        body: (
          <>
            Text, images, product presentation, design materials, and other website content are owned by or licensed to BINGE unless stated otherwise. You may use the website for evaluation and enquiry purposes, but may not copy, republish, or commercially exploit content without permission.
          </>
        ),
      },
      {
        title: "Enquiries And Orders",
        body: (
          <>
            Submitting an RFQ, sample request, catalogue request, or technical document request does not create a purchase contract. Orders are subject to written quotation, confirmation, payment terms, production capacity, export requirements, and other agreed conditions.
          </>
        ),
      },
      {
        title: "External Links",
        body: (
          <>
            The website may link to third-party services such as email, WhatsApp, analytics, hosting, or CRM tools. We are not responsible for third-party websites or services.
          </>
        ),
      },
      {
        title: "Contact",
        body: (
          <>
            Questions about these terms can be sent to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </>
        ),
      },
    ],
  },
  "cookie-settings": {
    title: "Cookie Settings",
    intro:
      "This page explains the cookies and similar technologies used on the BINGE website.",
    sections: [
      {
        title: "Current Cookie Use",
        body: (
          <>
            The website currently uses essential technologies needed to serve pages, protect forms, preserve normal browser behavior, and operate the site. We do not currently offer public account login or ecommerce checkout on this website.
          </>
        ),
      },
      {
        title: "Analytics And Marketing Cookies",
        body: (
          <>
            If analytics or marketing tools are added, we will update this page and provide an appropriate consent choice where required. Until then, the public site is intended to run without optional advertising cookies.
          </>
        ),
      },
      {
        title: "Managing Cookies",
        body: (
          <>
            You can block or delete cookies through your browser settings. Blocking essential browser storage may affect some website behavior, including forms, navigation, language routing, or security checks.
          </>
        ),
      },
      {
        title: "Questions",
        body: (
          <>
            For cookie or privacy questions, contact <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </>
        ),
      },
    ],
  },
};

export function LegalPage({ kind }: { kind: LegalPageKind }) {
  const content = pageContent[kind];

  return (
    <main style={{ backgroundColor: "var(--binge-white)" }}>
      <section style={{ borderBottom: "1px solid var(--binge-border)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "64px var(--binge-pad-h) 48px" }}>
          <span
            style={{
              display: "block",
              marginBottom: "14px",
              fontFamily: "var(--binge-font)",
              fontSize: "var(--binge-size-label)",
              fontWeight: 700,
              color: "var(--binge-orange)",
              letterSpacing: "var(--binge-tracking-label)",
              textTransform: "uppercase",
            }}
          >
            Legal
          </span>
          <h1
            style={{
              margin: 0,
              color: "var(--binge-text-primary)",
              fontFamily: "var(--binge-font)",
              fontSize: "var(--binge-size-display-md)",
              fontWeight: 700,
              lineHeight: "var(--binge-lh-heading)",
            }}
          >
            {content.title}
          </h1>
          <p
            style={{
              margin: "18px 0 0",
              color: "var(--binge-text-body)",
              fontFamily: "var(--binge-font)",
              fontSize: "var(--binge-size-body-lg)",
              fontWeight: 300,
              lineHeight: "var(--binge-lh-body)",
            }}
          >
            {content.intro}
          </p>
          <p
            style={{
              margin: "16px 0 0",
              color: "var(--binge-text-muted)",
              fontFamily: "var(--binge-font)",
              fontSize: "var(--binge-size-caption)",
              fontWeight: 400,
            }}
          >
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "42px var(--binge-pad-h) 72px" }}>
          {content.sections.map(section => (
            <article key={section.title} style={{ borderBottom: "1px solid var(--binge-border)", padding: "0 0 28px", marginBottom: "28px" }}>
              <h2
                style={{
                  margin: "0 0 10px",
                  color: "var(--binge-text-primary)",
                  fontFamily: "var(--binge-font)",
                  fontSize: "24px",
                  fontWeight: 700,
                  lineHeight: 1.25,
                }}
              >
                {section.title}
              </h2>
              <p
                style={{
                  margin: 0,
                  color: "var(--binge-text-body)",
                  fontFamily: "var(--binge-font)",
                  fontSize: "var(--binge-size-body)",
                  fontWeight: 300,
                  lineHeight: "var(--binge-lh-body)",
                }}
              >
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
