"use client";

import { useState } from 'react';
import { Link } from '@/lib/router-compat';
import { ChevronRight, Lock, Layers, CheckSquare, Sliders, Download, ArrowRight, FileText } from 'lucide-react';

// ─── Shared style helpers ─────────────────────────────────────────────────────

const container: React.CSSProperties = {
  maxWidth: 'var(--binge-content-max)',
  margin: '0 auto',
  padding: 'var(--binge-section-v) var(--binge-pad-h)',
};

const sectionLabel: React.CSSProperties = {
  fontFamily: 'var(--binge-font)',
  fontSize: 'var(--binge-size-label)',
  fontWeight: 700,
  color: 'var(--binge-orange)',
  letterSpacing: 'var(--binge-tracking-label)',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '14px',
};

const solidOrangeBtn: React.CSSProperties = {
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
  flexShrink: 0,
};

const outlineBtn = (dark: boolean): React.CSSProperties => ({
  backgroundColor: 'transparent',
  color: dark ? '#fff' : 'var(--binge-text-primary)',
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
  border: `1px solid ${dark ? 'rgba(255,255,255,0.3)' : 'var(--binge-border)'}`,
  cursor: 'pointer',
  flexShrink: 0,
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const GALLERY = [
  { src: '/images/products/ws-tg-scene.jpg', alt: 'TG clip-on solid wood skirting installation sequence' },
  { src: '/images/products/ws-tg-white.jpg', alt: 'TG solid wood skirting face boards and matching base profiles' },
  { src: '/images/products/ws-tg-clip-detail.jpg', alt: 'TG solid wood skirting installed on the wall-fixed base' },
  { src: '/images/products/ws-tg-isolated.jpg', alt: 'TG clip-on solid wood skirting components on a neutral background' },
];

const BENEFITS = [
  {
    Icon: Lock,
    title: 'Concealed Fixing',
    desc: 'The base profile is fixed to the wall and concealed by the face board. Final fastener and installation details are confirmed with the project specification.',
  },
  {
    Icon: Layers,
    title: 'Removable Face Board',
    desc: 'The face board and base are supplied as separate components, allowing the visible board to be fitted after the base is positioned.',
  },
  {
    Icon: CheckSquare,
    title: 'Clean Installation',
    desc: 'The shaped interface guides the face board into position for a consistent wall-to-floor detail. Installation guidance is available on request.',
  },
  {
    Icon: Sliders,
    title: 'Custom Finishes',
    desc: 'The current factory range includes several face colours and profile options. Available materials and finish combinations are confirmed at enquiry stage.',
  },
];

const FINISH_OPTIONS = [
  { label: 'Profile Heights',  value: 'Available on request' },
  { label: 'Profile Projection', value: 'Available on request' },
  { label: 'Standard Lengths', value: 'Available on request' },
  { label: 'Board Materials',  value: 'Available options confirmed on request' },
  { label: 'Surface Finishes', value: 'Current colour and finish range available on request' },
  { label: 'OEM Options',      value: 'Dimensions, finishes and packaging discussed per project' },
];

const INSTALL_STEPS = [
  {
    step: '01',
    title: 'Fix the Clip Channel',
    desc: 'Mark and cut the base profile to length, then fix it to the prepared wall using the fastener method confirmed for the project substrate.',
  },
  {
    step: '02',
    title: 'Clip on the Face Board',
    desc: 'Align the face board with the base profile and press it into position along the full length, checking that the shaped interface is evenly engaged.',
  },
  {
    step: '03',
    title: 'Fit Corners and Joints',
    desc: 'Complete seams and corners using the agreed site detail. Joint, corner and end conditions are confirmed with the technical team before production.',
  },
];

const APPLICATIONS = [
  { label: 'Residential', note: 'Private apartments, townhouses and high-specification residential developments.', img: 'https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=800&q=80&fit=crop', alt: 'Modern minimal residential interior' },
  { label: 'Hospitality',  note: 'Hotels, serviced apartments and premium guest-facing environments.', img: 'https://images.unsplash.com/photo-1692153142524-60285a93c249?w=800&q=80&fit=crop', alt: 'Elegant hotel interior with refined architectural detail' },
  { label: 'Workplace',   note: 'Boutique offices, co-working spaces and executive interior fit-outs.', img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80&fit=crop', alt: 'Modern workplace interior with architectural detailing' },
];

const ACCESSORIES = [
  { code: 'WS-BC',    name: 'Wall-Fixed Base Profile', note: 'Matched to the selected face board' },
  { code: 'WS-EC',    name: 'External Corner Piece',  note: 'Available separately' },
  { code: 'WS-IC',    name: 'Internal Corner Piece',  note: 'Available separately' },
  { code: 'WS-EP',    name: 'End Cap Set',            note: 'Available separately' },
  { code: 'WS-JT',    name: 'Joint Detail',           note: 'Confirmed per project' },
  { code: 'WS-FS',    name: 'Fastener Set',           note: 'Specified for the substrate' },
];

const DOWNLOADS = [
  { type: 'Product Data Sheet',    desc: 'Material specification, finish options and system overview for WS-TG.', date: 'Jun 2025', size: 'PDF · 2 MB' },
  { type: 'Installation Guide',    desc: 'Step-by-step illustrated installation instructions for WS-TG.', date: 'Jun 2025', size: 'PDF · 4 MB' },
  { type: 'Profile Drawing',       desc: 'Cross-section and elevation drawings in DXF and PDF format.', date: 'On request', size: 'DXF / PDF' },
  { type: '3D Model',              desc: 'STEP format 3D model for BIM and CAD coordination.', date: 'On request', size: 'STEP' },
];

const RELATED = [
  { code: 'WS-P3', name: 'Three-Side Painted Solid Wood Skirting', desc: 'Painted solid-wood skirting family in multiple face profiles and heights.', img: '/images/products/ws-three-side-painted.jpg', alt: 'Painted solid wood skirting range' },
  { code: 'WS-XQ', name: 'Xuanwu & Qilin Solid Wood Series', desc: 'Decorative solid-wood profile family for residential and hospitality interiors.', img: '/images/products/ws-xuanwu-qilin.jpg', alt: 'Decorative solid wood skirting installed at an internal corner' },
  { code: 'AS-FF', name: 'Flat-Face Aluminium Skirting', desc: 'Straight aluminium skirting range with clip-on installation and multiple finishes.', img: '/images/products/as-flat-face.jpg', alt: 'Flat-face aluminium skirting range' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function TGProductPage() {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <>
      {/* ── Breadcrumb ── */}
      <div style={{ backgroundColor: 'var(--binge-white)', borderBottom: '1px solid var(--binge-border)' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: '16px var(--binge-pad-h)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { label: 'Home', to: '/' },
              { label: 'Products', to: '/products' },
            ].map(({ label, to }) => (
              <span key={to} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Link to={to} style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400, color: 'var(--binge-text-muted)', textDecoration: 'none' }}>
                  {label}
                </Link>
                <ChevronRight size={12} style={{ color: 'var(--binge-border)', flexShrink: 0 }} />
              </span>
            ))}
            <span style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400, color: 'var(--binge-text-primary)' }}>
              TG Clip-On Solid Wood Skirting System
            </span>
          </div>
        </div>
      </div>

      {/* ── Hero: Gallery + Info panel ── */}
      <section style={{ backgroundColor: 'var(--binge-white)' }}>
        <div style={container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16" style={{ alignItems: 'start' }}>

            {/* Gallery */}
            <div>
              {/* Main image */}
              <div style={{ overflow: 'hidden', aspectRatio: '4 / 3', backgroundColor: 'var(--binge-card-bg)', marginBottom: '8px' }}>
                <img
                  src={GALLERY[activeImg].src}
                  alt={GALLERY[activeImg].alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'opacity 0.2s' }}
                />
              </div>
              {/* Thumbnails */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {GALLERY.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    style={{
                      padding: 0, border: `2px solid ${i === activeImg ? 'var(--binge-orange)' : 'var(--binge-border)'}`,
                      borderRadius: 0, overflow: 'hidden', cursor: 'pointer', aspectRatio: '1',
                      backgroundColor: 'var(--binge-card-bg)', transition: 'border-color 0.15s',
                    }}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* ── Sticky info panel ── */}
            <div style={{ position: 'sticky', top: 'var(--binge-nav-h)', alignSelf: 'start', paddingTop: '8px' }}>
              {/* Code */}
              <span style={sectionLabel}>WS-TG</span>

              {/* Name */}
              <h1 style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)',
                fontWeight: 700, color: 'var(--binge-text-primary)',
                lineHeight: 'var(--binge-lh-heading)', margin: '0 0 20px', letterSpacing: '-0.02em',
              }}>
                TG Clip-On Solid Wood Skirting System
              </h1>

              {/* Intro */}
              <p style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body-lg)',
                fontWeight: 300, color: 'var(--binge-text-body)', lineHeight: 'var(--binge-lh-body)', margin: '0 0 24px',
              }}>
                A clip-on solid wood skirting system built around separate base and face
                components for a clean, concealed wall-to-floor installation detail.
              </p>

              {/* Spec tags */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
                {['Solid Wood', 'Clip-on', 'Residential', 'Hospitality', 'Workplace'].map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400,
                    color: 'var(--binge-text-muted)', border: '1px solid var(--binge-border)',
                    padding: '4px 10px', display: 'inline-block',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
                <a href="mailto:info@bingeskirtingboard.com?subject=WS-TG Sample Request" style={solidOrangeBtn}>Request a Sample</a>
                <a href="mailto:info@bingeskirtingboard.com?subject=WS-TG Quote Request" style={outlineBtn(false)}>Request a Quote</a>
              </div>

              {/* Separator + size note */}
              <div style={{ borderTop: '1px solid var(--binge-border)', paddingTop: '24px' }}>
                <p style={{
                  fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300,
                  color: 'var(--binge-text-muted)', lineHeight: 1.6, margin: '0 0 8px',
                }}>
                  Sizes and finishes are available on request. Contact our technical team for custom dimensions, timber species and packaging options.
                </p>
                <a href="mailto:info@bingeskirtingboard.com?subject=WS-TG Technical Request" style={{
                  fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700,
                  color: 'var(--binge-orange)', letterSpacing: 'var(--binge-tracking-label)',
                  textTransform: 'uppercase', textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                }}>
                  Contact Technical Team <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section style={{ backgroundColor: 'var(--binge-warm-bg)' }}>
        <div style={container}>
          <span style={sectionLabel}>Key Benefits</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '1px', backgroundColor: 'var(--binge-border)' }}>
            {BENEFITS.map(({ Icon, title, desc }) => (
              <div key={title} style={{ backgroundColor: 'var(--binge-white)', padding: '32px 28px' }}>
                <div style={{
                  width: '40px', height: '40px', border: '1px solid var(--binge-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px',
                }}>
                  <Icon size={18} style={{ color: 'var(--binge-orange)' }} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-title-md)',
                  fontWeight: 700, color: 'var(--binge-text-primary)', margin: '0 0 10px', lineHeight: 1.25,
                }}>
                  {title}
                </h3>
                <p style={{
                  fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300,
                  color: 'var(--binge-text-body)', lineHeight: 'var(--binge-lh-body)', margin: 0,
                }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sizes & Finish Options ── */}
      <section style={{ backgroundColor: 'var(--binge-white)' }}>
        <div style={container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span style={sectionLabel}>Sizes &amp; Finishes</span>
              <h2 style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)',
                fontWeight: 700, color: 'var(--binge-text-primary)',
                lineHeight: 'var(--binge-lh-heading)', margin: '0 0 8px', letterSpacing: '-0.02em',
              }}>
                Made to your specification.
              </h2>
              <p style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body-lg)', fontWeight: 300,
                color: 'var(--binge-text-body)', lineHeight: 'var(--binge-lh-body)', margin: '0 0 32px',
              }}>
                The WS-TG system is manufactured to project-specific requirements.
                All dimensions and finish options are confirmed at the order stage — no
                dimensions are listed here to prevent out-of-date information from
                reaching specifications.
              </p>
              <a href="mailto:info@bingeskirtingboard.com?subject=WS-TG Sizes and Spec Sheet Request" style={solidOrangeBtn}>
                Request Sizes &amp; Spec Sheet
              </a>
            </div>
            <div>
              <div style={{ borderTop: '1px solid var(--binge-border)' }}>
                {FINISH_OPTIONS.map(({ label, value }) => (
                  <div key={label} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                    gap: '16px', padding: '16px 0', borderBottom: '1px solid var(--binge-border)',
                  }}>
                    <span style={{
                      fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)',
                      fontWeight: 700, color: 'var(--binge-text-primary)', flexShrink: 0, minWidth: '140px',
                    }}>
                      {label}
                    </span>
                    <span style={{
                      fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300,
                      color: 'var(--binge-text-body)', textAlign: 'right', lineHeight: 1.5,
                    }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Profile Drawing ── */}
      <section style={{ backgroundColor: 'var(--binge-dark)' }}>
        <div style={container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* SVG Drawing placeholder */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
              border: '1px solid rgba(255,255,255,0.08)', padding: '48px',
            }}>
              <span style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 700,
                color: 'var(--binge-text-muted)', letterSpacing: 'var(--binge-tracking-label)',
                textTransform: 'uppercase', marginBottom: '8px',
              }}>
                WS-TG — Profile Cross-Section
              </span>
              <svg viewBox="0 0 220 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '280px' }}>
                {/* Wall face */}
                <line x1="30" y1="10" x2="30" y2="230" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4,4"/>
                {/* Floor */}
                <line x1="10" y1="230" x2="210" y2="230" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4,4"/>
                {/* Clip channel body */}
                <rect x="30" y="30" width="16" height="180" fill="rgba(242,140,0,0.12)" stroke="#F28C00" strokeWidth="1.5"/>
                {/* Clip teeth */}
                <path d="M46 75 L54 70 L46 65" stroke="#F28C00" strokeWidth="1" fill="none" opacity="0.7"/>
                <path d="M46 120 L54 115 L46 110" stroke="#F28C00" strokeWidth="1" fill="none" opacity="0.7"/>
                <path d="M46 165 L54 160 L46 155" stroke="#F28C00" strokeWidth="1" fill="none" opacity="0.7"/>
                {/* Face board */}
                <rect x="46" y="30" width="36" height="180" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"/>
                {/* Wood grain lines */}
                <line x1="50" y1="60" x2="78" y2="60" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
                <line x1="50" y1="90" x2="78" y2="90" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
                <line x1="50" y1="120" x2="78" y2="120" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
                <line x1="50" y1="150" x2="78" y2="150" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
                <line x1="50" y1="180" x2="78" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
                {/* Wall surface */}
                <rect x="10" y="10" width="20" height="220" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                {/* Dimension bracket — height */}
                <line x1="100" y1="30" x2="100" y2="210" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
                <line x1="95" y1="30" x2="105" y2="30" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
                <line x1="95" y1="210" x2="105" y2="210" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
                <text x="108" y="125" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">H</text>
                {/* Dimension bracket — projection */}
                <line x1="30" y1="245" x2="82" y2="245" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
                <line x1="30" y1="240" x2="30" y2="250" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
                <line x1="82" y1="240" x2="82" y2="250" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
                <text x="50" y="258" fill="rgba(255,255,255,0.3)" fontSize="9" textAnchor="middle" fontFamily="monospace">P</text>
                {/* Labels */}
                <text x="38" y="25" fill="rgba(242,140,0,0.7)" fontSize="7" textAnchor="middle" fontFamily="monospace">CLIP</text>
                <text x="64" y="25" fill="rgba(255,255,255,0.4)" fontSize="7" textAnchor="middle" fontFamily="monospace">FACE BOARD</text>
              </svg>
              <p style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400,
                color: 'var(--binge-text-muted)', textAlign: 'center', margin: 0, lineHeight: 1.6,
              }}>
                Schematic only — not to scale.
              </p>
            </div>

            {/* Text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <span style={sectionLabel}>Profile Drawing</span>
              <h2 style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)',
                fontWeight: 700, color: '#fff', lineHeight: 'var(--binge-lh-heading)', margin: 0, letterSpacing: '-0.02em',
              }}>
                Full technical drawings on request.
              </h2>
              <p style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body-lg)', fontWeight: 300,
                color: 'rgba(255,255,255,0.6)', lineHeight: 'var(--binge-lh-body)', margin: 0,
              }}>
                WS-TG profile drawings are available in DXF and PDF format for BIM
                co-ordination, architectural drawing packages and contractor installation
                packs. Request the full drawing set from our technical team at no charge.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Cross-section DXF (all heights)', 'Elevation PDF', 'Corner detail drawings', 'STEP 3D model for BIM'].map(item => (
                  <li key={item} style={{
                    fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300,
                    color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'flex-start', gap: '12px',
                  }}>
                    <span style={{ color: 'var(--binge-orange)', fontWeight: 700, flexShrink: 0 }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div>
                <a href="mailto:info@bingeskirtingboard.com?subject=WS-TG Drawing Package Request" style={solidOrangeBtn}>
                  Request Drawing Package
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Installation Steps ── */}
      <section style={{ backgroundColor: 'var(--binge-white)' }}>
        <div style={container}>
          <span style={sectionLabel}>Installation</span>
          <h2 style={{
            fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)',
            fontWeight: 700, color: 'var(--binge-text-primary)',
            lineHeight: 'var(--binge-lh-heading)', margin: '0 0 48px', letterSpacing: '-0.02em',
          }}>
            Three steps to a clean finish.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '1px', backgroundColor: 'var(--binge-border)' }}>
            {INSTALL_STEPS.map(({ step, title, desc }) => (
              <div key={step} style={{ backgroundColor: 'var(--binge-white)', padding: '36px 28px' }}>
                <div style={{
                  fontFamily: 'var(--binge-font)', fontSize: '48px', fontWeight: 700,
                  color: 'var(--binge-card-bg)', lineHeight: 1, marginBottom: '20px',
                  letterSpacing: '-0.03em',
                }}>
                  {step}
                </div>
                <h3 style={{
                  fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-title-lg)',
                  fontWeight: 700, color: 'var(--binge-text-primary)', margin: '0 0 12px', lineHeight: 1.25,
                }}>
                  {title}
                </h3>
                <p style={{
                  fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300,
                  color: 'var(--binge-text-body)', lineHeight: 'var(--binge-lh-body)', margin: 0,
                }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '24px' }}>
            <a href="#downloads" style={{
              fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700,
              color: 'var(--binge-text-muted)', letterSpacing: 'var(--binge-tracking-label)',
              textTransform: 'uppercase', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
            }}>
              Download Full Installation Guide <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Applications ── */}
      <section style={{ backgroundColor: 'var(--binge-warm-bg)' }}>
        <div style={container}>
          <span style={sectionLabel}>Applications</span>
          <h2 style={{
            fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)',
            fontWeight: 700, color: 'var(--binge-text-primary)',
            lineHeight: 'var(--binge-lh-heading)', margin: '0 0 48px', letterSpacing: '-0.02em',
          }}>
            Specified across three project types.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px' }}>
            {APPLICATIONS.map(({ label, note, img, alt }) => (
              <div key={label}>
                <div style={{ overflow: 'hidden', aspectRatio: '3 / 4', marginBottom: '20px' }} className="group">
                  <img
                    src={img} alt={alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.45s ease' }}
                    className="group-hover:scale-105"
                  />
                </div>
                <h3 style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-title-lg)', fontWeight: 700, color: 'var(--binge-text-primary)', margin: '0 0 8px' }}>
                  {label}
                </h3>
                <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-body)', lineHeight: 'var(--binge-lh-body)', margin: 0 }}>
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compatible Accessories ── */}
      <section style={{ backgroundColor: 'var(--binge-white)' }}>
        <div style={container}>
          <span style={sectionLabel}>Compatible Accessories</span>
          <h2 style={{
            fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)',
            fontWeight: 700, color: 'var(--binge-text-primary)',
            lineHeight: 'var(--binge-lh-heading)', margin: '0 0 40px', letterSpacing: '-0.02em',
          }}>
            Everything the WS-TG system needs.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '1px', backgroundColor: 'var(--binge-border)' }}>
            {ACCESSORIES.map(({ code, name, note }) => (
              <div key={code} style={{ backgroundColor: 'var(--binge-card-bg)', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 700, color: 'var(--binge-orange)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase' }}>
                  {code}
                </span>
                <span style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 700, color: 'var(--binge-text-primary)' }}>
                  {name}
                </span>
                <span style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 300, color: 'var(--binge-text-muted)' }}>
                  {note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical Downloads ── */}
      <section id="downloads" style={{ backgroundColor: 'var(--binge-warm-bg)' }}>
        <div style={container}>
          <span style={sectionLabel}>Technical Resources</span>
          <h2 style={{
            fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)',
            fontWeight: 700, color: 'var(--binge-text-primary)',
            lineHeight: 'var(--binge-lh-heading)', margin: '0 0 40px', letterSpacing: '-0.02em',
          }}>
            WS-TG documentation.
          </h2>
          <div style={{ borderTop: '1px solid var(--binge-border)' }}>
            {DOWNLOADS.map((d, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--binge-border)', padding: 'clamp(16px, 3vw, 24px) 0', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--binge-white)', border: '1px solid var(--binge-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FileText size={20} style={{ color: 'var(--binge-text-muted)' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-title-md)', fontWeight: 700, color: 'var(--binge-text-primary)', marginBottom: '4px' }}>{d.type}</div>
                  <div style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-body)', lineHeight: 1.5 }}>{d.desc}</div>
                </div>
                <div className="hidden md:block" style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400, color: 'var(--binge-text-muted)', textAlign: 'right', flexShrink: 0, lineHeight: 1.6 }}>
                  <div>{d.date}</div>
                  <div>{d.size}</div>
                </div>
                <a href="mailto:info@bingeskirtingboard.com?subject=WS-TG Technical Request" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700, color: 'var(--binge-orange)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase', textDecoration: 'none', flexShrink: 0 }}>
                  <span className="hidden sm:inline">Download</span>
                  <Download size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Products ── */}
      <section style={{ backgroundColor: 'var(--binge-white)' }}>
        <div style={container}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
            <div>
              <span style={sectionLabel}>Related Products</span>
              <h2 style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)', fontWeight: 700, color: 'var(--binge-text-primary)', lineHeight: 'var(--binge-lh-heading)', margin: 0, letterSpacing: '-0.02em' }}>
                You may also specify.
              </h2>
            </div>
            <Link to="/products" style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700, color: 'var(--binge-text-muted)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase', textDecoration: 'none' }}>
              View All Products ›
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: '1px', backgroundColor: 'var(--binge-border)' }}>
            {RELATED.map(r => (
              <div key={r.code} className="group" style={{ backgroundColor: 'var(--binge-white)' }}>
                <div style={{ overflow: 'hidden', aspectRatio: '4 / 3', backgroundColor: 'var(--binge-card-bg)' }}>
                  <img src={r.img} alt={r.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.45s ease' }} className="group-hover:scale-105" />
                </div>
                <div style={{ padding: '24px', backgroundColor: 'var(--binge-card-bg)' }}>
                  <div style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 700, color: 'var(--binge-orange)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase', marginBottom: '8px' }}>{r.code}</div>
                  <h3 style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-title-md)', fontWeight: 700, color: 'var(--binge-text-primary)', margin: '0 0 8px', lineHeight: 1.25 }}>{r.name}</h3>
                  <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-body)', lineHeight: 'var(--binge-lh-body)', margin: '0 0 16px' }}>{r.desc}</p>
                  <a href={`/request-a-quote?product=${encodeURIComponent(r.code)}`} style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700, color: 'var(--binge-orange)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    View Product <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ backgroundColor: 'var(--binge-dark)' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: '80px var(--binge-pad-h)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '28px' }}>
          <span style={sectionLabel}>Ready to Specify</span>
          <h2 style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)', fontWeight: 700, color: '#fff', lineHeight: 'var(--binge-lh-display)', margin: 0, letterSpacing: '-0.02em', maxWidth: '560px' }}>
            Request a sample or submit an RFQ for WS-TG.
          </h2>
          <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body-lg)', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 'var(--binge-lh-body)', margin: 0, maxWidth: '480px' }}>
            Our technical team will confirm sizes, finishes and lead times and
            arrange physical samples for your project sign-off.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="mailto:info@bingeskirtingboard.com?subject=WS-TG Sample Request" style={solidOrangeBtn}>Request a Sample</a>
            <a href="mailto:info@bingeskirtingboard.com?subject=WS-TG Quote Request" style={outlineBtn(true)}>Request a Quote</a>
          </div>
        </div>
      </section>
    </>
  );
}
