"use client";

import { Link } from '@/lib/router-compat';
import { ChevronRight, ArrowRight } from 'lucide-react';

// ─── Shared style helpers ─────────────────────────────────────────────────────

const sLabel: React.CSSProperties = {
  fontFamily: 'var(--binge-font)',
  fontSize: 'var(--binge-size-label)',
  fontWeight: 700,
  color: 'var(--binge-orange)',
  letterSpacing: 'var(--binge-tracking-label)',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '16px',
};

// ─── Application data ─────────────────────────────────────────────────────────

const APPLICATIONS = [
  {
    id: 'residential',
    n: '01',
    label: 'Residential Interiors',
    heading: 'Private apartments, houses and high-specification residential developments.',
    body: 'Skirting profiles are the finishing layer that ties floors, walls and joinery into a single architectural voice. BINGE profiles are specified across premium residential developments for their ability to deliver clean lines and consistent quality across every apartment in a building programme — from entry-level specification to penthouse fit-out. Solid wood, recessed aluminium and WPC systems cover every residential specification tier.',
    systems: [
      'Surface-Mounted Aluminium Skirting',
      'Solid Wood Skirting',
      'Recessed & Shadow Gap Systems',
      'WPC Skirting',
      'Trims & Finishing Profiles',
    ],
    img: 'https://images.unsplash.com/photo-1771888703723-01d85da1dae1?w=1400&q=80&fit=crop',
    alt: 'Modern residential living room with minimalist furniture and clean architectural wall-floor lines',
    bg: 'var(--binge-white)',
  },
  {
    id: 'hospitality',
    n: '02',
    label: 'Hotels & Serviced Apartments',
    heading: 'Hotels, serviced apartments, resorts and premium guest-facing environments.',
    body: 'Every visible surface in hospitality carries the brand. BINGE recessed, LED-integrated and solid wood systems raise corridor and guestroom finishes to furniture-grade quality. Our clip-on systems allow maintenance access behind skirting without damage to the visible face board — a practical consideration for hotel engineering teams managing high-footfall corridors at scale.',
    systems: [
      'Recessed & Shadow Gap Systems',
      'LED Skirting Systems',
      'Solid Wood Skirting',
      'Stainless Steel Skirting',
      'Clip-On Aluminium Systems',
    ],
    img: 'https://images.unsplash.com/photo-1768396747960-ae6ba3c855bc?w=1400&q=80&fit=crop',
    alt: 'Luxurious hotel corridor with warm architectural lighting and refined material finishes',
    bg: 'var(--binge-warm-bg)',
  },
  {
    id: 'workplace',
    n: '03',
    label: 'Offices & Workplaces',
    heading: 'Commercial offices, co-working spaces and corporate interior fit-outs.',
    body: 'Commercial interiors cycle through refits more frequently than residential and require profiles that are durable, easy to access and simple to replace panel-by-panel. BINGE surface-mounted and clip-on aluminium systems are designed for exactly this environment. Neutral powder-coat and anodised finishes coordinate across the widest range of commercial floor coverings and base-build specifications.',
    systems: [
      'Surface-Mounted Aluminium Skirting',
      'Dual-Seal Aluminium Skirting',
      'Recessed Systems',
      'Trims & Finishing Profiles',
      'Step-Nose Floor Trim',
    ],
    img: 'https://images.unsplash.com/photo-1646153114001-495dfb56506d?w=1400&q=80&fit=crop',
    alt: 'Contemporary open-plan office interior with clean architectural detailing',
    bg: 'var(--binge-white)',
  },
  {
    id: 'healthcare',
    n: '04',
    label: 'Healthcare & Kitchens',
    heading: 'Hospitals, clinics, laboratories, food production and commercial kitchens.',
    body: 'Hygienic environments demand profiles that eliminate dirt traps, resist impact and can be deep-cleaned without damage. BINGE cove-cut recessed profiles and dual-seal systems address the wall-floor junction requirements of healthcare, pharmaceutical and food-production fit-outs. We do not make compliance claims — specifiers are responsible for confirming product suitability against the applicable hygiene standard for their project.',
    systems: [
      'Dual-Seal Aluminium Skirting',
      'Cove-Cut Recessed Profile',
      'Stainless Steel Skirting',
      'WPC Skirting (Moisture Resistant)',
      'Edge Protection Profile',
    ],
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&q=80&fit=crop',
    alt: 'Clean and modern hospital reception lobby with clear architectural interior',
    bg: 'var(--binge-warm-bg)',
  },
  {
    id: 'retail',
    n: '05',
    label: 'Retail & Public Buildings',
    heading: 'Retail fit-outs, museums, transport hubs and high-footfall public buildings.',
    body: 'High-footfall public buildings need profiles that withstand sustained impact, accept regular maintenance cleaning and hold their architectural finish across years of heavy use. BINGE stainless steel, heavy-gauge aluminium and LED systems are specified in retail and public environments where durability and visual continuity across large floor areas are the primary requirements from the specification team.',
    systems: [
      'Stainless Steel Skirting',
      'Surface-Mounted Aluminium Skirting',
      'LED Skirting Systems',
      'Step-Nose Floor Trim',
      'Edge Protection Profile',
    ],
    img: 'https://images.unsplash.com/photo-1711873316332-acb6930211e1?w=1400&q=80&fit=crop',
    alt: 'Minimal modern interior corridor with architectural skylight and clean white wall surfaces',
    bg: 'var(--binge-white)',
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export function ApplicationsPage() {
  return (
    <>
      {/* ── Page header ── */}
      <div style={{ backgroundColor: 'var(--binge-white)', borderBottom: '1px solid var(--binge-border)' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: '40px var(--binge-pad-h) 48px' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <Link to="/" style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400, color: 'var(--binge-text-muted)', textDecoration: 'none' }}>
              Home
            </Link>
            <ChevronRight size={12} style={{ color: 'var(--binge-border)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400, color: 'var(--binge-text-primary)' }}>
              Applications
            </span>
          </div>

          {/* Heading row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16" style={{ alignItems: 'end' }}>
            <div>
              <span style={sLabel}>Applications</span>
              <h1 style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-md)',
                fontWeight: 700, color: 'var(--binge-text-primary)',
                lineHeight: 'var(--binge-lh-heading)', margin: 0, letterSpacing: '-0.02em',
              }}>
                Where BINGE profiles<br className="hidden lg:block" /> are specified.
              </h1>
            </div>
            <div>
              <p style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body-lg)', fontWeight: 300,
                color: 'var(--binge-text-body)', lineHeight: 'var(--binge-lh-body)', margin: 0,
              }}>
                Five environments. One manufacturing source. From private residential to large-scale
                public buildings, BINGE supplies the skirting and finishing profile system that
                fits the specification — in aluminium, solid wood, stainless steel or composite.
              </p>
            </div>
          </div>

          {/* Section jump links */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '0',
            marginTop: '40px', borderTop: '1px solid var(--binge-border)', paddingTop: '20px',
          }}>
            {APPLICATIONS.map(app => (
              <a
                key={app.id}
                href={`#${app.id}`}
                style={{
                  fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
                  fontWeight: 400, color: 'var(--binge-text-muted)',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                  textDecoration: 'none', padding: '8px 20px 8px 0',
                  marginRight: '20px',
                  borderRight: '1px solid var(--binge-border)',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--binge-orange)')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--binge-text-muted)')}
              >
                {app.n} {app.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Five editorial application sections ── */}
      {APPLICATIONS.map((app, idx) => (
        <section key={app.id} id={app.id} style={{ backgroundColor: app.bg }}>

          {/* ── Full-width cinematic image — no text ever placed over it ── */}
          <div style={{ overflow: 'hidden', height: 'clamp(240px, 40vw, 580px)' }}>
            <img
              src={app.img}
              alt={app.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* ── Section number strip ── */}
          <div style={{
            backgroundColor: idx % 2 === 0 ? 'var(--binge-card-bg)' : 'var(--binge-border)',
            height: '3px',
          }} />

          {/* ── Text panel — entirely below the photograph ── */}
          <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: '48px var(--binge-pad-h) var(--binge-section-v)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

              {/* Left col: label + heading + body */}
              <div className="lg:col-span-7">
                <span style={sLabel}>{app.n} — {app.label}</span>
                <h2 style={{
                  fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)',
                  fontWeight: 700, color: 'var(--binge-text-primary)',
                  lineHeight: 'var(--binge-lh-heading)', margin: '0 0 24px', letterSpacing: '-0.02em',
                }}>
                  {app.heading}
                </h2>
                <p style={{
                  fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body-lg)', fontWeight: 300,
                  color: 'var(--binge-text-body)', lineHeight: 'var(--binge-lh-body)', margin: 0,
                }}>
                  {app.body}
                </p>
              </div>

              {/* Right col: product systems + CTA */}
              <div className="lg:col-span-5">
                <div style={{
                  borderLeft: '2px solid var(--binge-orange)',
                  paddingLeft: '24px',
                }}>
                  <p style={{
                    fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
                    fontWeight: 700, color: 'var(--binge-text-muted)',
                    letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase',
                    margin: '0 0 16px',
                  }}>
                    Typical systems specified
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {app.systems.map(sys => (
                      <li key={sys} style={{
                        fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 400,
                        color: 'var(--binge-text-primary)', lineHeight: 1.4,
                        display: 'flex', alignItems: 'flex-start', gap: '10px',
                      }}>
                        <span style={{ color: 'var(--binge-orange)', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>—</span>
                        {sys}
                      </li>
                    ))}
                  </ul>
                  <Link to="/products" style={{
                    fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
                    fontWeight: 700, color: 'var(--binge-orange)',
                    letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase',
                    textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
                  }}>
                    View Products <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Final CTA ── */}
      <section style={{ backgroundColor: 'var(--binge-dark)' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[400px]">

            {/* Text panel */}
            <div style={{
              padding: 'var(--binge-section-v) var(--binge-pad-h)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '28px',
            }}>
              <span style={sLabel}>Start the Conversation</span>
              <h2 style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)',
                fontWeight: 700, color: '#fff',
                lineHeight: 'var(--binge-lh-heading)', margin: 0, letterSpacing: '-0.02em',
              }}>
                Discuss your project<br />with our team.
              </h2>
              <p style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body-lg)', fontWeight: 300,
                color: 'rgba(255,255,255,0.6)', lineHeight: 'var(--binge-lh-body)', margin: 0, maxWidth: '420px',
              }}>
                Tell us the application, specification level and market. Our technical team
                will recommend the right profile system and arrange drawings and samples
                at no charge.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="mailto:info@bingeskirtingboard.com?subject=Technical Application Request" style={{
                  backgroundColor: 'var(--binge-orange)', color: '#fff',
                  fontFamily: 'var(--binge-font)', fontWeight: 700,
                  fontSize: 'var(--binge-size-button)', letterSpacing: 'var(--binge-tracking-button)',
                  textTransform: 'uppercase', textDecoration: 'none',
                  height: '48px', display: 'inline-flex', alignItems: 'center',
                  padding: '0 28px', borderRadius: 0,
                }}>
                  Discuss Your Project
                </a>
                <Link to="/products" style={{
                  backgroundColor: 'transparent', color: '#fff',
                  fontFamily: 'var(--binge-font)', fontWeight: 700,
                  fontSize: 'var(--binge-size-button)', letterSpacing: 'var(--binge-tracking-button)',
                  textTransform: 'uppercase', textDecoration: 'none',
                  height: '48px', display: 'inline-flex', alignItems: 'center',
                  padding: '0 28px', borderRadius: 0,
                  border: '1px solid rgba(255,255,255,0.3)',
                }}>
                  Browse All Products
                </Link>
              </div>
            </div>

            {/* Right panel: application summary grid */}
            <div style={{
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              {APPLICATIONS.map((app, i) => (
                <a
                  key={app.id}
                  href={`#${app.id}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '18px 40px',
                    borderBottom: i < APPLICATIONS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    textDecoration: 'none',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.03)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}
                >
                  <span style={{
                    fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)',
                    fontWeight: 400, color: 'rgba(255,255,255,0.65)',
                    display: 'flex', alignItems: 'center', gap: '12px',
                  }}>
                    <span style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', color: 'var(--binge-orange)', fontWeight: 700 }}>
                      {app.n}
                    </span>
                    {app.label}
                  </span>
                  <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
