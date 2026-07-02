"use client";

import { useState, useMemo } from 'react';
import { Link } from '@/lib/router-compat';
import { ChevronRight, ChevronDown, X, ArrowRight } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type Material     = 'Aluminium' | 'Stainless Steel' | 'Solid Wood' | 'WPC';
type Installation = 'Surface-Mounted' | 'Recessed' | 'Clip-on';
type Application  = 'Residential' | 'Hospitality' | 'Workplace' | 'Healthcare' | 'Commercial';
type Category     = 'Aluminium' | 'Recessed' | 'LED' | 'Solid Wood' | 'Stainless Steel' | 'WPC' | 'Trims';

type Product = {
  code: string;
  name: string;
  desc: string;
  material: Material;
  installation: Installation;
  applications: Application[];
  category: Category;
  img: string;
  alt: string;
  slug?: string; // set when a dedicated product page exists
};

// ─── Filter Options ───────────────────────────────────────────────────────────

const CATEGORIES: ('All' | Category)[] = [
  'All', 'Aluminium', 'Recessed', 'LED', 'Solid Wood', 'Stainless Steel', 'WPC', 'Trims',
];
const MATERIALS:     ('All' | Material)[]      = ['All', 'Aluminium', 'Stainless Steel', 'Solid Wood', 'WPC'];
const INSTALLATIONS: ('All' | Installation)[]  = ['All', 'Surface-Mounted', 'Recessed', 'Clip-on'];
const APPLICATIONS:  ('All' | Application)[]   = ['All', 'Residential', 'Hospitality', 'Workplace', 'Healthcare', 'Commercial'];

// ─── Product Data ─────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  { code: 'AS-CR', name: 'Crystal-Face Aluminium Skirting', desc: 'Decorative aluminium skirting family with a polished face treatment and clip-on installation.', material: 'Aluminium', installation: 'Clip-on', applications: ['Residential', 'Hospitality'], category: 'Aluminium', img: '/images/products/as-crystal.jpg', alt: 'Crystal-face aluminium skirting installed at a wall and floor junction' },
  { code: 'AS-MD', name: 'Morandi Finish Aluminium Skirting', desc: 'Muted colour aluminium range developed for contemporary residential and interior fit-out projects.', material: 'Aluminium', installation: 'Clip-on', applications: ['Residential', 'Workplace', 'Hospitality'], category: 'Aluminium', img: '/images/products/as-morandi.jpg', alt: 'Morandi colour aluminium skirting in a modern interior' },
  { code: 'AS-WU', name: 'Woodgrain Upturned Aluminium Skirting', desc: 'Wood-effect aluminium face with a raised upper edge for a more decorative wall transition.', material: 'Aluminium', installation: 'Clip-on', applications: ['Residential', 'Hospitality'], category: 'Aluminium', img: '/images/products/as-woodgrain-upturned.jpg', alt: 'Woodgrain aluminium skirting with an upturned top edge' },
  { code: 'AS-DS', name: 'Dual-Seal Aluminium Skirting', desc: 'Aluminium profile family with upper and lower sealing strips; final dimensions are confirmed per enquiry.', material: 'Aluminium', installation: 'Clip-on', applications: ['Residential', 'Commercial'], category: 'Aluminium', img: '/images/products/as-dual-seal.jpg', alt: 'Dual-seal aluminium skirting installed against wall and floor' },
  { code: 'AS-FF', name: 'Flat-Face Aluminium Skirting', desc: 'Straight architectural face available in multiple heights, colours and clip configurations.', material: 'Aluminium', installation: 'Clip-on', applications: ['Residential', 'Commercial', 'Workplace'], category: 'Aluminium', img: '/images/products/as-flat-face.jpg', alt: 'Flat-face aluminium skirting profile range' },
  { code: 'AS-SR', name: 'Soft-Radius Aluminium Skirting', desc: 'Straight aluminium face with a small-radius edge for a softer transition at the top of the profile.', material: 'Aluminium', installation: 'Clip-on', applications: ['Residential', 'Commercial'], category: 'Aluminium', img: '/images/products/as-soft-radius.jpg', alt: 'Soft-radius aluminium skirting installed in an interior' },
  { code: 'AS-MW', name: 'Minimal Woodgrain Aluminium Skirting', desc: 'Minimal straight aluminium profile finished with a wood-effect decorative surface.', material: 'Aluminium', installation: 'Clip-on', applications: ['Residential', 'Hospitality'], category: 'Aluminium', img: '/images/products/as-minimal-woodgrain.jpg', alt: 'Minimal woodgrain aluminium skirting profile' },
  { code: 'AS-AT', name: 'Aluminium-Titanium Alloy Skirting', desc: 'Metal skirting family supplied in several profile heights and finish options for project selection.', material: 'Aluminium', installation: 'Clip-on', applications: ['Residential', 'Commercial', 'Workplace'], category: 'Aluminium', img: '/images/products/as-aluminium-titanium.jpg', alt: 'Aluminium-titanium alloy skirting installed at floor level' },

  { code: 'RS-SM', name: 'Seamless Recessed Aluminium Skirting', desc: 'Recessed profile designed for a low-visibility transition between the finished wall and floor.', material: 'Aluminium', installation: 'Recessed', applications: ['Residential', 'Hospitality'], category: 'Recessed', img: '/images/products/rs-seamless.jpg', alt: 'Black seamless recessed aluminium skirting profile' },
  { code: 'RS-RE', name: 'Standard Recessed Aluminium Skirting', desc: 'Recessed aluminium family with separate base and visible face components for interior specification.', material: 'Aluminium', installation: 'Recessed', applications: ['Residential', 'Commercial'], category: 'Recessed', img: '/images/products/rs-recessed.jpg', alt: 'Standard recessed black aluminium skirting at an internal corner' },
  { code: 'RS-FL', name: 'Flush-Mount Recessed Aluminium Skirting', desc: 'Flush-mounted recessed face for clean junctions in modern wall and panel systems.', material: 'Aluminium', installation: 'Recessed', applications: ['Residential', 'Hospitality', 'Workplace'], category: 'Recessed', img: '/images/products/rs-flush.jpg', alt: 'Flush-mount recessed black aluminium skirting profiles' },
  { code: 'RS-PL', name: 'Plaster-In Aluminium Skirting', desc: 'Perforated plaster-in base profile with a visible lower face; sizes and finishes are confirmed on request.', material: 'Aluminium', installation: 'Recessed', applications: ['Residential', 'Commercial'], category: 'Recessed', img: '/images/products/rs-plaster-in.jpg', alt: 'Black plaster-in aluminium skirting with perforated fixing flange' },
  { code: 'RS-LED', name: 'Recessed LED Aluminium Skirting', desc: 'Recessed aluminium profile with an integrated channel for floor-level linear lighting.', material: 'Aluminium', installation: 'Recessed', applications: ['Residential', 'Hospitality', 'Commercial'], category: 'LED', img: '/images/products/rs-led.jpg', alt: 'Recessed aluminium skirting with integrated LED lighting' },

  { code: 'WS-TG', name: 'TG Clip-On Solid Wood Skirting', desc: 'BINGE TG system with a separate base and solid-wood face board for concealed installation.', material: 'Solid Wood', installation: 'Clip-on', applications: ['Residential', 'Hospitality'], category: 'Solid Wood', img: '/images/products/ws-tg-scene.jpg', alt: 'TG clip-on solid wood skirting system installation sequence', slug: 'tg-clip-on-solid-wood-skirting-system' },
  { code: 'WS-P3', name: 'Three-Side Painted Solid Wood Skirting', desc: 'Solid-wood skirting range with painted faces and several profile heights for interior projects.', material: 'Solid Wood', installation: 'Surface-Mounted', applications: ['Residential', 'Hospitality'], category: 'Solid Wood', img: '/images/products/ws-three-side-painted.jpg', alt: 'Three-side painted solid wood skirting in black and white finishes' },
  { code: 'WS-XQ', name: 'Xuanwu & Qilin Solid Wood Series', desc: 'Decorative solid-wood profile family supplied in multiple heights and face geometries.', material: 'Solid Wood', installation: 'Surface-Mounted', applications: ['Residential', 'Hospitality'], category: 'Solid Wood', img: '/images/products/ws-xuanwu-qilin.jpg', alt: 'Decorative solid wood skirting installed around an internal corner' },

  { code: 'SS-201', name: 'Classic 201 Stainless Steel Skirting', desc: 'Classic stainless-steel skirting family available in several heights and surface colours.', material: 'Stainless Steel', installation: 'Surface-Mounted', applications: ['Commercial', 'Hospitality'], category: 'Stainless Steel', img: '/images/products/ss-201-classic.jpg', alt: 'Classic stainless steel skirting installed in an interior' },
  { code: 'SS-201N', name: 'New-Series 201 Stainless Steel Skirting', desc: 'Updated stainless-steel face profile with coordinated accessories and finish options.', material: 'Stainless Steel', installation: 'Surface-Mounted', applications: ['Commercial', 'Hospitality'], category: 'Stainless Steel', img: '/images/products/ss-201-new.jpg', alt: 'New-series stainless steel skirting in multiple finishes' },

  { code: 'WP-55/100', name: 'WPC Skirting — 55 mm & 100 mm Series', desc: 'Clip-on WPC skirting family offered in two principal height groups and multiple decorative surfaces.', material: 'WPC', installation: 'Clip-on', applications: ['Residential', 'Commercial'], category: 'WPC', img: '/images/products/wp-55-100.jpg', alt: 'WPC skirting profile with concealed wall clip' },

  { code: 'TR-L', name: 'L-Shaped Aluminium Edge Trim', desc: 'L-shaped aluminium trim family for exposed edges, panel junctions and finishing details.', material: 'Aluminium', installation: 'Surface-Mounted', applications: ['Residential', 'Commercial', 'Hospitality'], category: 'Trims', img: '/images/products/tr-l-edge.jpg', alt: 'L-shaped aluminium edge trim installed at a panel edge' },
  { code: 'TR-FC', name: 'F / C-Shaped Aluminium Trim', desc: 'F- and C-shaped aluminium finishing profiles for tile and panel edge conditions.', material: 'Aluminium', installation: 'Surface-Mounted', applications: ['Residential', 'Commercial'], category: 'Trims', img: '/images/products/tr-fc-edge.jpg', alt: 'Black C-shaped aluminium finishing trim with profile dimensions' },
  { code: 'TR-TU', name: 'T / U-Shaped Aluminium Transition Trim', desc: 'T- and U-shaped transition profiles for joining and finishing adjacent surface materials.', material: 'Aluminium', installation: 'Surface-Mounted', applications: ['Residential', 'Commercial', 'Hospitality'], category: 'Trims', img: '/images/products/tr-tu-transition.jpg', alt: 'Black T-shaped aluminium transition trim with profile dimensions' },
];

// ─── FilterSelect ─────────────────────────────────────────────────────────────

function FilterSelect({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  const active = value !== 'All';
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label={label}
        style={{
          fontFamily: 'var(--binge-font)',
          fontSize: 'var(--binge-size-label)',
          fontWeight: active ? 700 : 400,
          color: active ? 'var(--binge-orange)' : 'var(--binge-text-body)',
          backgroundColor: 'var(--binge-white)',
          border: `1px solid ${active ? 'var(--binge-orange)' : 'var(--binge-border)'}`,
          borderRadius: 0,
          padding: '0 36px 0 14px',
          height: '44px',
          appearance: 'none',
          WebkitAppearance: 'none',
          cursor: 'pointer',
          outline: 'none',
          minWidth: '172px',
        } as React.CSSProperties}
      >
        <option value="All">{label}: All</option>
        {options.filter(o => o !== 'All').map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <div style={{
        position: 'absolute', right: '12px', pointerEvents: 'none',
        color: active ? 'var(--binge-orange)' : 'var(--binge-text-muted)',
        display: 'flex', alignItems: 'center',
      }}>
        <ChevronDown size={13} />
      </div>
    </div>
  );
}

// ─── ProductCard ──────────────────────────────────────────────────────────────

function ProductCard({ p }: { p: Product }) {
  return (
    <div className="group" style={{ backgroundColor: 'var(--binge-white)' }}>
      <div style={{ overflow: 'hidden', aspectRatio: '4 / 3', backgroundColor: 'var(--binge-card-bg)' }}>
        <img
          src={p.img} alt={p.alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.45s ease' }}
          className="group-hover:scale-105"
        />
      </div>
      <div style={{ padding: 'clamp(16px, 3vw, 24px)', backgroundColor: 'var(--binge-card-bg)' }}>
        <div style={{
          fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)',
          fontWeight: 700, color: 'var(--binge-orange)',
          letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase',
          marginBottom: '8px',
        }}>
          {p.code}
        </div>
        <h3 style={{
          fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-title-md)',
          fontWeight: 700, color: 'var(--binge-text-primary)',
          lineHeight: 1.25, margin: '0 0 8px',
        }}>
          {p.name}
        </h3>
        <p style={{
          fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)',
          fontWeight: 300, color: 'var(--binge-text-body)',
          lineHeight: 'var(--binge-lh-body)', margin: '0 0 16px',
        }}>
          {p.desc}
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {[p.material, p.installation].map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)',
              fontWeight: 400, color: 'var(--binge-text-muted)',
              backgroundColor: 'var(--binge-white)', border: '1px solid var(--binge-border)',
              padding: '2px 8px',
            }}>
              {tag}
            </span>
          ))}
        </div>
        {p.slug ? (
          <Link to={`/products/${p.slug}`} style={{
            fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
            fontWeight: 700, color: 'var(--binge-orange)',
            letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px',
          }}>
            View Product <ArrowRight size={13} />
          </Link>
        ) : (
          <a href={`/request-a-quote?product=${encodeURIComponent(p.code)}`} style={{
            fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
            fontWeight: 700, color: 'var(--binge-orange)',
            letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px',
          }}>
            View Product <ArrowRight size={13} />
          </a>
        )}
      </div>
    </div>
  );
}

// ─── ProductsPage ─────────────────────────────────────────────────────────────

export function ProductsPage() {
  const [activeCat,          setActiveCat]          = useState<'All' | Category>('All');
  const [filterMaterial,     setFilterMaterial]     = useState<'All' | Material>('All');
  const [filterInstallation, setFilterInstallation] = useState<'All' | Installation>('All');
  const [filterApplication,  setFilterApplication]  = useState<'All' | Application>('All');

  const hasFilters = activeCat !== 'All' || filterMaterial !== 'All' || filterInstallation !== 'All' || filterApplication !== 'All';

  const clearAll = () => {
    setActiveCat('All'); setFilterMaterial('All');
    setFilterInstallation('All'); setFilterApplication('All');
  };

  const filtered = useMemo(() => PRODUCTS.filter(p => {
    const catOk  = activeCat          === 'All' || p.category     === activeCat;
    const matOk  = filterMaterial     === 'All' || p.material      === filterMaterial;
    const instOk = filterInstallation === 'All' || p.installation  === filterInstallation;
    const appOk  = filterApplication  === 'All' || p.applications.includes(filterApplication as Application);
    return catOk && matOk && instOk && appOk;
  }), [activeCat, filterMaterial, filterInstallation, filterApplication]);

  return (
    <>
      {/* ── Page header ── */}
      <div style={{ backgroundColor: 'var(--binge-white)', borderBottom: '1px solid var(--binge-border)' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: '40px var(--binge-pad-h) 0' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '28px' }}>
            <Link to="/" style={{
              fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)',
              fontWeight: 400, color: 'var(--binge-text-muted)', textDecoration: 'none',
            }}>
              Home
            </Link>
            <ChevronRight size={12} style={{ color: 'var(--binge-border)', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)',
              fontWeight: 400, color: 'var(--binge-text-primary)',
            }}>
              Products
            </span>
          </div>

          {/* Heading + intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ marginBottom: '40px' }}>
            <div>
              <span style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
                fontWeight: 700, color: 'var(--binge-orange)',
                letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase',
                display: 'block', marginBottom: '14px',
              }}>
                Product Catalogue
              </span>
              <h1 style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-md)',
                fontWeight: 700, color: 'var(--binge-text-primary)',
                lineHeight: 'var(--binge-lh-heading)', margin: 0, letterSpacing: '-0.02em',
              }}>
                Architectural Skirting &amp; Profile Systems
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <p style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body-lg)',
                fontWeight: 300, color: 'var(--binge-text-body)',
                lineHeight: 'var(--binge-lh-body)', margin: 0,
              }}>
                Our complete range of aluminium, solid wood, stainless steel and
                composite profiles — manufactured for professional specification.
                Request technical drawings, order samples or submit an RFQ for any
                system in this catalogue.
              </p>
            </div>
          </div>

          {/* Filter bar */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px', paddingBottom: '20px' }}>
            <span style={{
              fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
              fontWeight: 700, color: 'var(--binge-text-muted)',
              letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase',
              flexShrink: 0, marginRight: '4px',
            }}>
              Filter by:
            </span>
            <FilterSelect label="Material"     value={filterMaterial}     options={MATERIALS}     onChange={v => setFilterMaterial(v as 'All' | Material)} />
            <FilterSelect label="Installation" value={filterInstallation} options={INSTALLATIONS} onChange={v => setFilterInstallation(v as 'All' | Installation)} />
            <FilterSelect label="Application"  value={filterApplication}  options={APPLICATIONS}  onChange={v => setFilterApplication(v as 'All' | Application)} />
            {hasFilters && (
              <button onClick={clearAll} style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
                fontWeight: 700, color: 'var(--binge-text-muted)',
                letterSpacing: '0.03em', padding: '0 4px', height: '44px',
              }}>
                <X size={13} /> Clear
              </button>
            )}
          </div>

          {/* Category tabs — horizontally scrollable on mobile */}
          <div style={{
            display: 'flex', overflowX: 'auto', gap: 0,
            marginInline: 'calc(var(--binge-pad-h) * -1)',
            paddingInline: 'var(--binge-pad-h)',
            scrollbarWidth: 'none',
          } as React.CSSProperties}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                style={{
                  fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
                  fontWeight: 700, letterSpacing: 'var(--binge-tracking-label)',
                  textTransform: 'uppercase',
                  color: cat === activeCat ? 'var(--binge-orange)' : 'var(--binge-text-muted)',
                  background: 'none', border: 'none',
                  borderBottom: cat === activeCat ? '2px solid var(--binge-orange)' : '2px solid transparent',
                  cursor: 'pointer', padding: '0 20px', height: '48px',
                  whiteSpace: 'nowrap', flexShrink: 0,
                  transition: 'color 0.15s, border-color 0.15s',
                }}
              >
                {cat === 'All' ? 'All Products' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Product grid ── */}
      <div style={{ backgroundColor: 'var(--binge-white)' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: '40px var(--binge-pad-h) var(--binge-section-v)' }}>

          {/* Result count */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '8px' }}>
            <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-muted)', margin: 0 }}>
              Showing{' '}
              <strong style={{ fontWeight: 700, color: 'var(--binge-text-primary)' }}>{filtered.length}</strong>
              {' '}{filtered.length === 1 ? 'system' : 'systems'}
            </p>
            {hasFilters && (
              <button onClick={clearAll} style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
                fontWeight: 700, color: 'var(--binge-orange)', background: 'none',
                border: 'none', cursor: 'pointer', padding: 0,
                display: 'inline-flex', alignItems: 'center', gap: '4px',
              }}>
                <X size={12} /> Clear filters
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              style={{ gap: '1px', backgroundColor: 'var(--binge-border)' }}
            >
              {filtered.map(p => <ProductCard key={p.code} p={p} />)}
            </div>
          ) : (
            <div style={{
              padding: '80px 24px', display: 'flex', flexDirection: 'column',
              alignItems: 'center', textAlign: 'center', gap: '16px',
              border: '1px solid var(--binge-border)',
            }}>
              <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-title-md)', fontWeight: 700, color: 'var(--binge-text-primary)', margin: 0 }}>
                No products match your filters.
              </p>
              <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-muted)', margin: 0 }}>
                Try adjusting your selection or clearing all filters to see the full range.
              </p>
              <button onClick={clearAll} style={{
                backgroundColor: 'var(--binge-orange)', color: '#fff',
                fontFamily: 'var(--binge-font)', fontWeight: 700,
                fontSize: 'var(--binge-size-button)', letterSpacing: 'var(--binge-tracking-button)',
                textTransform: 'uppercase', padding: '0 28px', height: '48px',
                border: 'none', borderRadius: 0, cursor: 'pointer', marginTop: '8px',
              }}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <section style={{ backgroundColor: 'var(--binge-dark)' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: '80px var(--binge-pad-h)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <span style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
                fontWeight: 700, color: 'var(--binge-orange)',
                letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase',
              }}>
                Technical Support
              </span>
              <h2 style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)',
                fontWeight: 700, color: '#fff',
                lineHeight: 'var(--binge-lh-heading)', margin: 0, letterSpacing: '-0.02em',
              }}>
                Need help selecting a profile?
              </h2>
              <p style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body-lg)',
                fontWeight: 300, color: 'rgba(255,255,255,0.6)',
                lineHeight: 'var(--binge-lh-body)', margin: 0, maxWidth: '440px',
              }}>
                Our technical team works directly with architects, specifiers and
                procurement managers to recommend the right system for every project
                and application. Drawings, samples and RFQs at no charge.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
              <a href="mailto:technical@binge-profiles.com" style={{
                backgroundColor: 'var(--binge-orange)', color: '#fff',
                fontFamily: 'var(--binge-font)', fontWeight: 700,
                fontSize: 'var(--binge-size-button)', letterSpacing: 'var(--binge-tracking-button)',
                textTransform: 'uppercase', textDecoration: 'none',
                padding: '0 28px', height: '48px',
                display: 'inline-flex', alignItems: 'center', borderRadius: 0,
              }}>
                Contact Our Technical Team
              </a>
              <a href="mailto:samples@binge-profiles.com?subject=Product Sample Request" style={{
                backgroundColor: 'transparent', color: '#fff',
                fontFamily: 'var(--binge-font)', fontWeight: 700,
                fontSize: 'var(--binge-size-button)', letterSpacing: 'var(--binge-tracking-button)',
                textTransform: 'uppercase', textDecoration: 'none',
                padding: '0 28px', height: '48px',
                display: 'inline-flex', alignItems: 'center', borderRadius: 0,
                border: '1px solid rgba(255,255,255,0.3)',
              }}>
                Request a Sample
              </a>
              <a href="/downloads" style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
                fontWeight: 700, color: 'rgba(255,255,255,0.5)',
                letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
                gap: '6px', marginTop: '4px',
              }}>
                Download Full Catalogue <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
