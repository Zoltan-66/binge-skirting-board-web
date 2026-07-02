"use client";

import { useState } from 'react';
import { ChevronDown, Ruler, Settings2, Palette, Package, FileText, Truck, ArrowRight } from 'lucide-react';

// ─── Shared style helpers ─────────────────────────────────────────────────────

const wrap: React.CSSProperties = {
  maxWidth: 'var(--binge-content-max)',
  margin: '0 auto',
  padding: 'var(--binge-section-v) var(--binge-pad-h)',
};

const sLabel: React.CSSProperties = {
  fontFamily: 'var(--binge-font)',
  fontSize: 'var(--binge-size-label)',
  fontWeight: 700,
  color: 'var(--binge-orange)',
  letterSpacing: 'var(--binge-tracking-label)',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '14px',
};

const displayHeading = (color = 'var(--binge-text-primary)'): React.CSSProperties => ({
  fontFamily: 'var(--binge-font)',
  fontSize: 'var(--binge-size-display-sm)',
  fontWeight: 700,
  color,
  lineHeight: 'var(--binge-lh-heading)',
  margin: 0,
  letterSpacing: '-0.02em',
});

const bodyText = (color = 'var(--binge-text-body)'): React.CSSProperties => ({
  fontFamily: 'var(--binge-font)',
  fontSize: 'var(--binge-size-body-lg)',
  fontWeight: 300,
  color,
  lineHeight: 'var(--binge-lh-body)',
  margin: 0,
});

const orangeBtn: React.CSSProperties = {
  backgroundColor: 'var(--binge-orange)',
  color: '#fff',
  fontFamily: 'var(--binge-font)',
  fontWeight: 700,
  fontSize: 'var(--binge-size-button)',
  letterSpacing: 'var(--binge-tracking-button)',
  textTransform: 'uppercase',
  textDecoration: 'none',
  height: '48px',
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0 28px',
  borderRadius: 0,
  border: 'none',
  cursor: 'pointer',
};

const outlineLight: React.CSSProperties = {
  ...orangeBtn,
  backgroundColor: 'transparent',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.3)',
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const CAPABILITIES = [
  {
    Icon: Ruler,
    title: 'Custom Profile Development',
    desc: 'We design and tool new extrusion cross-sections to your exact requirements. Provide a sketch, existing sample or specification and our engineering team will prepare prototype drawings for review before any tooling is committed.',
  },
  {
    Icon: Settings2,
    title: 'Custom Dimensions & Lengths',
    desc: 'All aluminium, stainless steel, solid wood and WPC profiles are available in custom heights, face projections and cut lengths. OEM dimensions are confirmed at the brief stage — we do not publish standard sizes here.',
  },
  {
    Icon: Palette,
    title: 'Surface Finish Development',
    desc: 'Powder coat in RAL and custom colours, anodising in standard and custom shades, timber veneer overlay, lacquer and oil finishes. Custom colour matching is available for large-volume OEM programmes.',
  },
  {
    Icon: Package,
    title: 'Private-Label Packaging',
    desc: 'Custom packaging design with your brand, product codes and installation instructions. Full OEM packaging — including carton printing, inner packaging and labelling — is available for distribution under your own label.',
  },
  {
    Icon: FileText,
    title: 'Samples & Technical Drawings',
    desc: 'Pre-production physical samples are supplied for project sign-off before any production run begins. Full DXF and PDF drawing sets are provided for architectural packages, contractor packs and BIM coordination.',
  },
  {
    Icon: Truck,
    title: 'Export Packaging Support',
    desc: 'Container-optimised packing, palletising and export documentation for shipment to Europe, the UK, Australia, New Zealand and other major markets. We work with your freight forwarder or can recommend our own logistics partners.',
  },
];

const PROCESS = [
  {
    n: '01',
    title: 'Enquiry & Brief',
    desc: 'Contact our OEM team with your requirements — profile type, application, market, volume and timeline. We will respond within one business day with an acknowledgement and any initial clarifying questions.',
  },
  {
    n: '02',
    title: 'Technical Review',
    desc: 'Our engineering team reviews your brief, identifies the appropriate base profile or proposes a new cross-section, and prepares a written technical proposal with indicative tooling requirements and costs.',
  },
  {
    n: '03',
    title: 'Tooling & Prototype',
    desc: 'For new cross-sections, extrusion tooling is manufactured and a prototype sample is produced. For standard profiles with custom dimensions or finishes, a customised pre-production sample is prepared directly.',
  },
  {
    n: '04',
    title: 'Sample Approval',
    desc: 'Physical samples are dispatched for your review. We will revise geometry, surface finish or packaging until you are fully satisfied. No production run begins until written sign-off is received.',
  },
  {
    n: '05',
    title: 'Production Run',
    desc: 'Confirmed orders enter our production schedule. Your account manager keeps you informed at key milestones throughout the manufacturing process, including material receipt and production start.',
  },
  {
    n: '06',
    title: 'QC, Packing & Delivery',
    desc: 'Finished product passes our inspection process before packing. Goods are packed to export specification and dispatched via your nominated freight forwarder or ours, with full shipping documentation.',
  },
];

const QC_POINTS = [
  'Incoming raw material checks before production begins',
  'In-process dimensional and surface inspection at each stage',
  'Final product check against the approved sample before packing',
  'Random sampling of finished packs before container loading',
];

const PROFILE_SCHEMATICS = [
  {
    label: 'Surface Mounted',
    sub: 'Flat-face with back channel',
    path: (
      <svg viewBox="0 0 100 120" fill="none" style={{ width: '100%', maxWidth: '120px' }}>
        <rect x="5" y="5" width="12" height="110" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="3,3"/>
        <rect x="17" y="15" width="8" height="90" fill="rgba(242,140,0,0.15)" stroke="#F28C00" strokeWidth="1.5"/>
        <rect x="25" y="15" width="60" height="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"/>
        <rect x="25" y="91" width="60" height="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"/>
        <line x1="25" y1="29" x2="25" y2="91" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
        <rect x="5" y="109" width="80" height="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      </svg>
    ),
  },
  {
    label: 'Recessed / Shadow Gap',
    sub: 'Plaster-in or rebated',
    path: (
      <svg viewBox="0 0 100 120" fill="none" style={{ width: '100%', maxWidth: '120px' }}>
        <rect x="5" y="5" width="50" height="110" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="3,3"/>
        <rect x="15" y="40" width="16" height="50" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"/>
        <rect x="31" y="40" width="24" height="8" fill="rgba(242,140,0,0.12)" stroke="#F28C00" strokeWidth="1"/>
        <line x1="15" y1="40" x2="55" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" strokeDasharray="2,2"/>
        <rect x="5" y="109" width="90" height="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
        <path d="M55 40 L80 40" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2,2"/>
        <path d="M55 90 L80 90" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2,2"/>
        <line x1="85" y1="40" x2="85" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
        <line x1="80" y1="40" x2="90" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
        <line x1="80" y1="90" x2="90" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
      </svg>
    ),
  },
  {
    label: 'Clip-On System',
    sub: 'Concealed fixing, removable face',
    path: (
      <svg viewBox="0 0 100 120" fill="none" style={{ width: '100%', maxWidth: '120px' }}>
        <rect x="5" y="5" width="12" height="110" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="3,3"/>
        <rect x="17" y="20" width="10" height="80" fill="rgba(242,140,0,0.15)" stroke="#F28C00" strokeWidth="1.5"/>
        <path d="M27 50 L34 45 L27 40" stroke="#F28C00" strokeWidth="1" fill="none" opacity="0.7"/>
        <path d="M27 80 L34 75 L27 70" stroke="#F28C00" strokeWidth="1" fill="none" opacity="0.7"/>
        <rect x="27" y="20" width="30" height="80" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"/>
        <line x1="30" y1="40" x2="54" y2="40" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
        <line x1="30" y1="60" x2="54" y2="60" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
        <line x1="30" y1="80" x2="54" y2="80" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
        <rect x="5" y="109" width="90" height="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      </svg>
    ),
  },
];

const FAQ_ITEMS = [
  { q: 'What is your minimum order quantity for OEM production?', a: 'Minimum order quantities vary by profile type and customisation level. Contact our team with your requirements and we will confirm the minimum applicable to your programme.' },
  { q: 'Can you match an existing profile we already specify?', a: 'Yes. Send us a physical sample or a DXF drawing and our engineers will review the cross-section and propose a matching or improved profile for our manufacturing process.' },
  { q: 'How long does tooling and prototyping take?', a: 'Lead times for tooling depend on profile complexity. Our team will give you a clear timeline as part of the initial technical proposal — we do not publish indicative times here as they vary significantly.' },
  { q: 'Do you supply samples before we confirm a production order?', a: 'Yes. We supply pre-production physical samples for your approval before any production run begins. Sample costs are typically credited against the first confirmed order.' },
  { q: 'Can we apply our own branding to the product and packaging?', a: 'Yes. We supply fully OEM-branded product ranges including custom packaging design, product labels in your language, installation instructions and carton printing.' },
  { q: 'What surface finishes are available for aluminium profiles?', a: 'We offer powder coat in RAL and custom colours, standard and custom anodising, and brushed or mirror-polished finishes for stainless steel. Custom colour matching is available for volume OEM programmes.' },
  { q: 'What are your standard production lead times?', a: 'Production lead times depend on order size, profile type and current capacity. We provide a confirmed lead time at the quotation stage and keep you informed throughout production.' },
  { q: 'Do you support shipping to Europe, the UK and Australia?', a: 'Yes. We ship regularly to importers and distributors across Europe, the UK, Australia and New Zealand. We work with your freight forwarder or can recommend our own logistics partners.' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function OEMPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ backgroundColor: 'var(--binge-dark)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[620px]">

            {/* Text panel */}
            <div style={{ padding: 'var(--binge-section-v) var(--binge-pad-h)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '28px' }}>
              <span style={sLabel}>OEM / ODM Capability</span>
              <h1 style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-lg)',
                fontWeight: 700, color: '#fff', lineHeight: 'var(--binge-lh-display)',
                margin: 0, letterSpacing: '-0.025em',
              }}>
                Built for your market,<br />brand and project.
              </h1>
              <p style={bodyText('rgba(255,255,255,0.6)')}>
                We manufacture architectural skirting and profile systems for distributors,
                importers and wholesalers who want to go to market under their own brand.
                From custom cross-section development to private-label packaging — our Zhejiang
                factory engineers each programme to your specification.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="mailto:info@bingeskirtingboard.com?subject=OEM Custom Project" style={orangeBtn}>Start a Custom Project</a>
                <a href="mailto:info@bingeskirtingboard.com?subject=OEM Brochure Request" style={outlineLight}>Download OEM Brochure</a>
              </div>
            </div>

            {/* Hero image */}
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: '300px' }}>
              <img
                src="https://images.unsplash.com/photo-1717386255773-1e3037c81788?w=1080&q=80&fit=crop"
                alt="Large-scale precision manufacturing facility"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(23,27,32,0.25)' }} />
            </div>
          </div>
        </div>
        <div style={{ height: '3px', backgroundColor: 'var(--binge-orange)' }} />
      </section>

      {/* ── Capabilities ── */}
      <section style={{ backgroundColor: 'var(--binge-white)' }}>
        <div style={wrap}>
          <div style={{ marginBottom: '56px' }}>
            <span style={sLabel}>What We Offer</span>
            <h2 style={displayHeading()}>
              Six OEM capabilities.<br />One manufacturing partner.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '1px', backgroundColor: 'var(--binge-border)' }}>
            {CAPABILITIES.map(({ Icon, title, desc }) => (
              <div key={title} style={{ backgroundColor: 'var(--binge-white)', padding: '36px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', border: '1px solid var(--binge-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} style={{ color: 'var(--binge-orange)' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-title-md)', fontWeight: 700, color: 'var(--binge-text-primary)', margin: 0, lineHeight: 1.25 }}>
                  {title}
                </h3>
                <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-body)', lineHeight: 'var(--binge-lh-body)', margin: 0 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6-Step Process ── */}
      <section style={{ backgroundColor: 'var(--binge-warm-bg)' }}>
        <div style={wrap}>
          <div style={{ marginBottom: '56px' }}>
            <span style={sLabel}>How We Work</span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <h2 style={displayHeading()}>From enquiry to delivery.</h2>
              <p style={bodyText()}>
                Every OEM programme follows the same structured process — designed to
                give you clarity at each stage and prevent surprises. No production begins
                until you have reviewed and approved a physical sample.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '1px', backgroundColor: 'var(--binge-border)' }}>
            {PROCESS.map(({ n, title, desc }) => (
              <div key={n} style={{ backgroundColor: 'var(--binge-white)', padding: '36px 28px' }}>
                <div style={{
                  fontFamily: 'var(--binge-font)', fontSize: '52px', fontWeight: 700,
                  color: 'var(--binge-card-bg)', lineHeight: 1, marginBottom: '20px',
                  letterSpacing: '-0.03em',
                }}>
                  {n}
                </div>
                <h3 style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-title-lg)', fontWeight: 700, color: 'var(--binge-text-primary)', margin: '0 0 12px', lineHeight: 1.25 }}>
                  {title}
                </h3>
                <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-body)', lineHeight: 'var(--binge-lh-body)', margin: 0 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Factory Section ── */}
      <section id="factory" style={{ backgroundColor: 'var(--binge-white)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[500px]">

            {/* Image */}
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: '280px' }}>
              <img
                src="https://images.unsplash.com/photo-1669450953140-4cd549bdb9d7?w=1080&q=80&fit=crop"
                alt="Precision aluminium profiles on the factory floor"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Text */}
            <div style={{ padding: 'var(--binge-section-v) var(--binge-pad-h)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
              <span style={sLabel}>The Factory</span>
              <h2 style={displayHeading()}>
                Manufactured in Zhejiang.<br />Supplied worldwide.
              </h2>
              <p style={bodyText()}>
                Our manufacturing facility is located in Zhejiang Province, China — close to the
                major export ports of Ningbo and Shanghai. The factory operates dedicated
                production lines for aluminium extrusion, surface finishing and solid wood
                profile manufacturing.
              </p>
              <p style={bodyText()}>
                We work directly with importers and distributors in Europe, the UK, Australia
                and New Zealand. All OEM programmes are managed by a dedicated account
                contact throughout the project lifecycle.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  'Dedicated aluminium extrusion and finishing lines',
                  'Solid wood and WPC processing capability',
                  'Surface treatment — powder coat, anodise, veneer',
                  'Proximity to Ningbo and Shanghai export ports',
                  'Export packaging and container packing support',
                ].map(item => (
                  <li key={item} style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-body)', display: 'flex', alignItems: 'flex-start', gap: '12px', lineHeight: 1.55 }}>
                    <span style={{ color: 'var(--binge-orange)', fontWeight: 700, flexShrink: 0 }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quality Control ── */}
      <section style={{ backgroundColor: 'var(--binge-dark)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[480px]">

            {/* Text */}
            <div style={{ padding: 'var(--binge-section-v) var(--binge-pad-h)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
              <span style={sLabel}>Quality Control</span>
              <h2 style={displayHeading('#fff')}>
                Inspection at every stage.
              </h2>
              <p style={bodyText('rgba(255,255,255,0.6)')}>
                We do not publish certifications that we cannot demonstrate. What we can describe
                is the inspection process that every OEM order goes through before it leaves
                the factory.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {QC_POINTS.map(point => (
                  <li key={point} style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'flex-start', gap: '12px', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--binge-orange)', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>—</span>
                    {point}
                  </li>
                ))}
              </ul>
              <p style={{ ...bodyText('rgba(255,255,255,0.5)'), fontSize: 'var(--binge-size-body)' }}>
                Buyers are welcome to arrange third-party inspection before container loading.
                We will provide factory access and full inspection support.
              </p>
            </div>

            {/* QC image */}
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: '280px' }}>
              <img
                src="https://images.unsplash.com/photo-1700727448575-6f1680cd7d75?w=1080&q=80&fit=crop"
                alt="Quality inspector reviewing production output on the factory floor"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(23,27,32,0.15)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Technical Diagrams ── */}
      <section style={{ backgroundColor: 'var(--binge-dark)' }}>
        <div style={wrap}>
          <div style={{ marginBottom: '48px' }}>
            <span style={sLabel}>Profile Systems</span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <h2 style={displayHeading('#fff')}>
                Three installation types.<br />One manufacturing source.
              </h2>
              <p style={bodyText('rgba(255,255,255,0.6)')}>
                Whether your market demands surface-mounted, recessed or clip-on profiles,
                our factory can manufacture across all three system types under a single
                OEM programme. Schematics below are illustrative only — all geometry is
                confirmed at the brief stage.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }}>
            {PROFILE_SCHEMATICS.map(({ label, sub, path }) => (
              <div key={label} style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '40px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  {path}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-title-md)', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                    {label}
                  </div>
                  <div style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'rgba(255,255,255,0.5)' }}>
                    {sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p style={{
            fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400,
            color: 'rgba(255,255,255,0.25)', textAlign: 'center', margin: '16px 0 0',
            letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            Schematics only — not to scale — geometry confirmed at brief stage
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ backgroundColor: 'var(--binge-white)' }}>
        <div style={wrap}>
          <div style={{ marginBottom: '48px' }}>
            <span style={sLabel}>FAQ</span>
            <h2 style={displayHeading()}>Common OEM questions.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} style={{ borderTop: i === 0 || i === 1 ? '1px solid var(--binge-border)' : undefined }}>
                <div style={{ borderBottom: '1px solid var(--binge-border)' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%', display: 'flex', justifyContent: 'space-between',
                      alignItems: 'flex-start', gap: '16px', padding: '20px 0',
                      background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)',
                      fontWeight: 700, color: 'var(--binge-text-primary)', lineHeight: 1.4, flex: 1,
                    }}>
                      {item.q}
                    </span>
                    <ChevronDown
                      size={16}
                      style={{
                        color: 'var(--binge-text-muted)', flexShrink: 0, marginTop: '3px',
                        transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </button>
                  {openFaq === i && (
                    <div style={{ paddingBottom: '20px' }}>
                      <p style={{
                        fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)',
                        fontWeight: 300, color: 'var(--binge-text-body)',
                        lineHeight: 'var(--binge-lh-body)', margin: 0,
                      }}>
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px', borderTop: '1px solid var(--binge-border)', paddingTop: '32px' }}>
            <p style={{ ...bodyText('var(--binge-text-muted)'), fontSize: 'var(--binge-size-body)', display: 'inline' }}>
              Don&apos;t see your question?{' '}
            </p>
            <a href="mailto:info@bingeskirtingboard.com?subject=OEM Project Request" style={{
              fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 700,
              color: 'var(--binge-orange)', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
            }}>
              Contact our OEM team <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ backgroundColor: 'var(--binge-dark)' }}>
        {/* Factory image band — separate from text */}
        <div style={{ position: 'relative', height: 'clamp(200px, 30vw, 360px)', overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1764185800646-f75f7e16e465?w=1920&q=80&fit=crop"
            alt="Industrial factory floor — precision production environment"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(23,27,32,0.35)' }} />
        </div>

        {/* Text panel — below image, never over it */}
        <div style={{
          maxWidth: 'var(--binge-content-max)', margin: '0 auto',
          padding: '80px var(--binge-pad-h)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center', gap: '28px',
        }}>
          <span style={{ ...sLabel, display: 'block', margin: 0 }}>Ready to Begin</span>
          <h2 style={{
            fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-md)',
            fontWeight: 700, color: '#fff', lineHeight: 'var(--binge-lh-display)',
            margin: 0, letterSpacing: '-0.025em', maxWidth: '600px',
          }}>
            Start a custom project with BINGE.
          </h2>
          <p style={{ ...bodyText('rgba(255,255,255,0.6)'), maxWidth: '480px' }}>
            Tell us your profile type, market, volume and timeline. Our OEM team
            will respond within one business day with a technical proposal.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="mailto:info@bingeskirtingboard.com?subject=OEM Custom Project" style={orangeBtn}>Start a Custom Project</a>
            <a href="mailto:info@bingeskirtingboard.com?subject=OEM Brochure Request" style={outlineLight}>Request OEM Brochure</a>
          </div>
        </div>
      </section>
    </>
  );
}
