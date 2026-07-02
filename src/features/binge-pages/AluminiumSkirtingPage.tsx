"use client";

import { useState, useMemo } from 'react';
import { Link } from '@/lib/router-compat';
import { ChevronRight, ChevronDown, X, ArrowRight, FileText, Download } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Height       = 'Multiple sizes';
type Finish       = 'Multiple finishes';
type Installation = 'Clip-on';
type Style        = 'Decorative Face' | 'Flat Face' | 'Soft Radius' | 'Woodgrain';

type Product = {
  code: string;
  name: string;
  desc: string;
  height: Height;
  finish: Finish;
  installation: Installation;
  style: Style;
  feature: string;       // one-line key differentiator
  applications: string;
  img: string;
  alt: string;
};

// ─── Product data (8 AS-Series profiles) ─────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    code: 'AS-CR', name: 'Crystal-Face Aluminium Skirting',
    desc: 'Decorative aluminium skirting family with a polished face treatment and clip-on installation.',
    height: 'Multiple sizes', finish: 'Multiple finishes', installation: 'Clip-on', style: 'Decorative Face',
    feature: 'Polished decorative face', applications: 'Residential, Hospitality',
    img: '/images/products/as-crystal.jpg', alt: 'Crystal-face aluminium skirting installed at a wall and floor junction',
  },
  {
    code: 'AS-MD', name: 'Morandi Finish Aluminium Skirting',
    desc: 'Muted colour aluminium range developed for contemporary residential and interior fit-out projects.',
    height: 'Multiple sizes', finish: 'Multiple finishes', installation: 'Clip-on', style: 'Flat Face',
    feature: 'Muted contemporary colour range', applications: 'Residential, Workplace, Hospitality',
    img: '/images/products/as-morandi.jpg', alt: 'Morandi colour aluminium skirting in a modern interior',
  },
  {
    code: 'AS-WU', name: 'Woodgrain Upturned Aluminium Skirting',
    desc: 'Wood-effect aluminium face with a raised upper edge for a more decorative wall transition.',
    height: 'Multiple sizes', finish: 'Multiple finishes', installation: 'Clip-on', style: 'Woodgrain',
    feature: 'Wood-effect raised-edge face', applications: 'Residential, Hospitality',
    img: '/images/products/as-woodgrain-upturned.jpg', alt: 'Woodgrain aluminium skirting with an upturned top edge',
  },
  {
    code: 'AS-DS', name: 'Dual-Seal Aluminium Skirting',
    desc: 'Aluminium profile family with upper and lower sealing strips; final dimensions are confirmed per enquiry.',
    height: 'Multiple sizes', finish: 'Multiple finishes', installation: 'Clip-on', style: 'Flat Face',
    feature: 'Upper and lower sealing strips', applications: 'Residential, Commercial',
    img: '/images/products/as-dual-seal.jpg', alt: 'Dual-seal aluminium skirting installed against wall and floor',
  },
  {
    code: 'AS-FF', name: 'Flat-Face Clip-On Aluminium Skirting',
    desc: 'Straight architectural face available in multiple heights, colours and clip configurations.',
    height: 'Multiple sizes', finish: 'Multiple finishes', installation: 'Clip-on', style: 'Flat Face',
    feature: 'Straight architectural face', applications: 'Residential, Commercial, Workplace',
    img: '/images/products/as-flat-face.jpg', alt: 'Flat-face aluminium skirting profile range',
  },
  {
    code: 'AS-SR', name: 'Soft-Radius Aluminium Skirting',
    desc: 'Straight aluminium face with a small-radius edge for a softer transition at the top of the profile.',
    height: 'Multiple sizes', finish: 'Multiple finishes', installation: 'Clip-on', style: 'Soft Radius',
    feature: 'Small-radius upper edge', applications: 'Residential, Commercial',
    img: '/images/products/as-soft-radius.jpg', alt: 'Soft-radius aluminium skirting installed in an interior',
  },
  {
    code: 'AS-MW', name: 'Minimal Woodgrain Aluminium Skirting',
    desc: 'Minimal straight aluminium profile finished with a wood-effect decorative surface.',
    height: 'Multiple sizes', finish: 'Multiple finishes', installation: 'Clip-on', style: 'Woodgrain',
    feature: 'Minimal wood-effect face', applications: 'Residential, Hospitality',
    img: '/images/products/as-minimal-woodgrain.jpg', alt: 'Minimal woodgrain aluminium skirting profile',
  },
  {
    code: 'AS-AT', name: 'Aluminium-Titanium Alloy Skirting',
    desc: 'Metal skirting family supplied in several profile heights and finish options for project selection.',
    height: 'Multiple sizes', finish: 'Multiple finishes', installation: 'Clip-on', style: 'Flat Face',
    feature: 'Multi-height metal profile family', applications: 'Residential, Commercial, Workplace',
    img: '/images/products/as-aluminium-titanium.jpg', alt: 'Aluminium-titanium alloy skirting installed at floor level',
  },
];

// ─── Filter constants ─────────────────────────────────────────────────────────

const HEIGHTS:       ('All' | Height)[]       = ['All', 'Multiple sizes'];
const FINISHES:      ('All' | Finish)[]       = ['All', 'Multiple finishes'];
const INSTALLATIONS: ('All' | Installation)[] = ['All', 'Clip-on'];
const STYLES:        ('All' | Style)[]        = ['All', 'Decorative Face', 'Flat Face', 'Soft Radius', 'Woodgrain'];

// ─── Comparison table rows ─────────────────────────────────────────────────────

const COMPARE_COLS = ['Code', 'Size Range', 'Installation', 'Finish Options', 'Key Feature', 'Applications'];
const COMPARE_ROWS = PRODUCTS.map(p => [
  p.code, p.height, p.installation, p.finish, p.feature, p.applications,
]);

// ─── Accessories ─────────────────────────────────────────────────────────────

const ACCESSORIES = [
  { code: 'AS-BC', name: 'Base Clip / Channel',    desc: 'Wall-fixed base component selected to match the chosen aluminium face profile.' },
  { code: 'AS-EC', name: 'External Corner',        desc: 'External corner component available for selected profile families.' },
  { code: 'AS-IC', name: 'Internal Corner',        desc: 'Internal corner component available for selected profile families.' },
  { code: 'AS-EP', name: 'End Cap',                desc: 'End finishing component coordinated with the chosen profile and colour.' },
  { code: 'AS-JS', name: 'Joint Piece',            desc: 'Profile joint component for selected straight-run systems.' },
  { code: 'AS-FS', name: 'Seal Strip',             desc: 'Upper or lower seal supplied with the applicable sealed profile family.' },
];

// ─── Shared style helpers ─────────────────────────────────────────────────────

const sLabel: React.CSSProperties = {
  fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700,
  color: 'var(--binge-orange)', letterSpacing: 'var(--binge-tracking-label)',
  textTransform: 'uppercase', display: 'block', marginBottom: '14px',
};

const wrap = (pad = 'var(--binge-section-v)'): React.CSSProperties => ({
  maxWidth: 'var(--binge-content-max)', margin: '0 auto',
  padding: `${pad} var(--binge-pad-h)`,
});

const orangeBtn: React.CSSProperties = {
  backgroundColor: 'var(--binge-orange)', color: '#fff',
  fontFamily: 'var(--binge-font)', fontWeight: 700,
  fontSize: 'var(--binge-size-button)', letterSpacing: 'var(--binge-tracking-button)',
  textTransform: 'uppercase', textDecoration: 'none',
  height: '48px', display: 'inline-flex', alignItems: 'center',
  padding: '0 28px', borderRadius: 0, border: 'none', cursor: 'pointer',
};

const outlineLight: React.CSSProperties = {
  ...orangeBtn, backgroundColor: 'transparent', color: '#fff',
  border: '1px solid rgba(255,255,255,0.3)',
};

// ─── FilterSelect ─────────────────────────────────────────────────────────────

function FilterSelect({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  const active = value !== 'All';
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <select value={value} onChange={e => onChange(e.target.value)} aria-label={label} style={{
        fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
        fontWeight: active ? 700 : 400,
        color: active ? 'var(--binge-orange)' : 'var(--binge-text-body)',
        backgroundColor: 'var(--binge-white)',
        border: `1px solid ${active ? 'var(--binge-orange)' : 'var(--binge-border)'}`,
        borderRadius: 0, padding: '0 36px 0 14px', height: '44px',
        appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer',
        outline: 'none', minWidth: '168px',
      } as React.CSSProperties}>
        <option value="All">{label}: All</option>
        {options.filter(o => o !== 'All').map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <div style={{ position: 'absolute', right: '12px', pointerEvents: 'none', display: 'flex', alignItems: 'center', color: active ? 'var(--binge-orange)' : 'var(--binge-text-muted)' }}>
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
        <img src={p.img} alt={p.alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.45s ease' }}
          className="group-hover:scale-105" />
      </div>
      <div style={{ padding: 'clamp(16px, 3vw, 24px)', backgroundColor: 'var(--binge-card-bg)' }}>
        <div style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 700, color: 'var(--binge-orange)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase', marginBottom: '8px' }}>
          {p.code}
        </div>
        <h3 style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-title-md)', fontWeight: 700, color: 'var(--binge-text-primary)', lineHeight: 1.25, margin: '0 0 8px' }}>
          {p.name}
        </h3>
        <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-body)', lineHeight: 'var(--binge-lh-body)', margin: '0 0 14px' }}>
          {p.desc}
        </p>
        {/* Spec tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {[p.height, p.installation, p.finish].map(tag => (
            <span key={tag} style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400, color: 'var(--binge-text-muted)', border: '1px solid var(--binge-border)', padding: '2px 8px' }}>
              {tag}
            </span>
          ))}
        </div>
        <a href="mailto:technical@binge-profiles.com" style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700, color: 'var(--binge-orange)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          View Product <ArrowRight size={13} />
        </a>
      </div>
    </div>
  );
}

// ─── AluminiumSkirtingPage ────────────────────────────────────────────────────

export function AluminiumSkirtingPage() {
  const [filterH, setFilterH] = useState<string>('All');
  const [filterF, setFilterF] = useState<string>('All');
  const [filterI, setFilterI] = useState<string>('All');
  const [filterS, setFilterS] = useState<string>('All');

  const hasFilters = filterH !== 'All' || filterF !== 'All' || filterI !== 'All' || filterS !== 'All';
  const clearAll   = () => { setFilterH('All'); setFilterF('All'); setFilterI('All'); setFilterS('All'); };

  const filtered = useMemo(() => PRODUCTS.filter(p => {
    const hOk = filterH === 'All' || p.height       === filterH;
    const fOk = filterF === 'All' || p.finish        === filterF;
    const iOk = filterI === 'All' || p.installation  === filterI;
    const sOk = filterS === 'All' || p.style         === filterS;
    return hOk && fOk && iOk && sOk;
  }), [filterH, filterF, filterI, filterS]);

  return (
    <>
      {/* ── Breadcrumb ── */}
      <div style={{ backgroundColor: 'var(--binge-white)', borderBottom: '1px solid var(--binge-border)' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: '16px var(--binge-pad-h)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {[{ label: 'Home', to: '/' }, { label: 'Products', to: '/products' }].map(({ label, to }) => (
              <span key={to} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Link to={to} style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400, color: 'var(--binge-text-muted)', textDecoration: 'none' }}>{label}</Link>
                <ChevronRight size={12} style={{ color: 'var(--binge-border)', flexShrink: 0 }} />
              </span>
            ))}
            <span style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400, color: 'var(--binge-text-primary)' }}>Aluminium Skirting</span>
          </div>
        </div>
      </div>

      {/* ── Category Hero — text and image in separate panels ── */}
      <section style={{ backgroundColor: 'var(--binge-dark)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[560px]">
            {/* Text panel */}
            <div style={{ padding: 'var(--binge-section-v) var(--binge-pad-h)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
              <span style={sLabel}>AS-Series — Aluminium Skirting Systems</span>
              <h1 style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-lg)', fontWeight: 700, color: '#fff', lineHeight: 'var(--binge-lh-display)', margin: 0, letterSpacing: '-0.025em' }}>
                Aluminium skirting<br />for every specification.
              </h1>
              <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body-lg)', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 'var(--binge-lh-body)', margin: 0, maxWidth: '440px' }}>
                Eight current surface-mounted and clip-on aluminium profile families for
                residential, hospitality, workplace and commercial interiors. Available
                sizes, colours and accessories are confirmed with each enquiry.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="mailto:samples@binge-profiles.com" style={orangeBtn}>Request a Sample</a>
                <a href="mailto:quote@binge-profiles.com" style={outlineLight}>Request a Quote</a>
              </div>
            </div>
            {/* Photograph — never under text */}
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: '300px' }}>
              <img
                src="/images/products/as-flat-face.jpg"
                alt="BINGE flat-face aluminium skirting profile family"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
        <div style={{ height: '3px', backgroundColor: 'var(--binge-orange)' }} />
      </section>

      {/* ── Technical Introduction ── */}
      <section style={{ backgroundColor: 'var(--binge-white)' }}>
        <div style={wrap()}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span style={sLabel}>Technical Overview</span>
              <h2 style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)', fontWeight: 700, color: 'var(--binge-text-primary)', lineHeight: 'var(--binge-lh-heading)', margin: 0, letterSpacing: '-0.02em' }}>
                Engineered for the wall-floor interface.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body-lg)', fontWeight: 300, color: 'var(--binge-text-body)', lineHeight: 'var(--binge-lh-body)', margin: 0 }}>
                The AS-Series brings together eight aluminium skirting families currently shown
                in the factory product material, including flat, decorative, wood-effect,
                soft-radius and sealed face options.
              </p>
              <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-body)', lineHeight: 'var(--binge-lh-body)', margin: 0 }}>
                Specific profile heights, projections and finish specifications are confirmed
                at the order stage. We do not publish dimensions on this page to prevent
                out-of-date information from reaching project specifications. Contact our
                technical team for a current drawing pack.
              </p>
              {/* Quick attributes grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3" style={{ gap: '1px', backgroundColor: 'var(--binge-border)', marginTop: '8px' }}>
                {[
                  ['Material', 'Aluminium-based profile range'],
                  ['Surface', 'Current finish range on request'],
                  ['Installation', 'Clip-on / system dependent'],
                  ['Profile Sizes', 'Available on request'],
                  ['Colours', 'Current colour range on request'],
                  ['OEM Options', 'Discussed per project'],
                ].map(([k, v]) => (
                  <div key={k} style={{ backgroundColor: 'var(--binge-card-bg)', padding: '16px 18px' }}>
                    <div style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 700, color: 'var(--binge-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>{k}</div>
                    <div style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 400, color: 'var(--binge-text-primary)', lineHeight: 1.4 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters + Product Grid ── */}
      <section style={{ backgroundColor: 'var(--binge-warm-bg)' }}>
        <div style={wrap()}>
          <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={sLabel}>AS-Series Profiles</span>
              <h2 style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)', fontWeight: 700, color: 'var(--binge-text-primary)', lineHeight: 'var(--binge-lh-heading)', margin: 0, letterSpacing: '-0.02em' }}>
                Eight aluminium profile families.
              </h2>
            </div>
            <Link to="/products" style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700, color: 'var(--binge-text-muted)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase', textDecoration: 'none' }}>
              All Product Systems ›
            </Link>
          </div>

          {/* Filter bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700, color: 'var(--binge-text-muted)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase', flexShrink: 0, marginRight: '4px' }}>Filter:</span>
            <FilterSelect label="Height"       value={filterH} options={HEIGHTS}       onChange={setFilterH} />
            <FilterSelect label="Finish"        value={filterF} options={FINISHES}      onChange={setFilterF} />
            <FilterSelect label="Installation"  value={filterI} options={INSTALLATIONS} onChange={setFilterI} />
            <FilterSelect label="Style"         value={filterS} options={STYLES}        onChange={setFilterS} />
            {hasFilters && (
              <button onClick={clearAll} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700, color: 'var(--binge-text-muted)', padding: '0 4px', height: '44px' }}>
                <X size={13} /> Clear
              </button>
            )}
          </div>

          {/* Result count */}
          <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-muted)', margin: '0 0 24px' }}>
            Showing <strong style={{ fontWeight: 700, color: 'var(--binge-text-primary)' }}>{filtered.length}</strong> of {PRODUCTS.length} profiles
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '1px', backgroundColor: 'var(--binge-border)' }}>
              {filtered.map(p => <ProductCard key={p.code} p={p} />)}
            </div>
          ) : (
            <div style={{ border: '1px solid var(--binge-border)', backgroundColor: 'var(--binge-white)', padding: '64px 24px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-title-md)', fontWeight: 700, color: 'var(--binge-text-primary)', margin: '0 0 12px' }}>No profiles match your filters.</p>
              <button onClick={clearAll} style={{ ...orangeBtn, cursor: 'pointer' }}>Clear Filters</button>
            </div>
          )}
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section style={{ backgroundColor: 'var(--binge-white)' }}>
        <div style={wrap()}>
          <span style={sLabel}>Comparison</span>
          <h2 style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)', fontWeight: 700, color: 'var(--binge-text-primary)', lineHeight: 'var(--binge-lh-heading)', margin: '0 0 40px', letterSpacing: '-0.02em' }}>
            Compare all AS-Series profiles.
          </h2>

          <div style={{ overflowX: 'auto', borderTop: '1px solid var(--binge-border)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--binge-border)' }}>
                  {COMPARE_COLS.map(col => (
                    <th key={col} style={{
                      fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 700,
                      color: 'var(--binge-text-muted)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase',
                      textAlign: 'left', padding: '12px 16px 12px 0', whiteSpace: 'nowrap',
                    }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={i} className="group" style={{ borderBottom: '1px solid var(--binge-border)' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{
                        fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', padding: '16px 16px 16px 0',
                        fontWeight: j === 0 ? 700 : 300,
                        color: j === 0 ? 'var(--binge-orange)' : 'var(--binge-text-body)',
                        letterSpacing: j === 0 ? '0.06em' : 0,
                        textTransform: j === 0 ? 'uppercase' : 'none',
                        verticalAlign: 'top', lineHeight: 1.5,
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400, color: 'var(--binge-text-muted)', marginTop: '16px', fontStyle: 'italic' }}>
            Profile heights listed are indicative — confirmed specifications are provided at the quotation stage.
          </p>
        </div>
      </section>

      {/* ── Compatible Accessories ── */}
      <section style={{ backgroundColor: 'var(--binge-warm-bg)' }}>
        <div style={wrap()}>
          <span style={sLabel}>Compatible Accessories</span>
          <h2 style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)', fontWeight: 700, color: 'var(--binge-text-primary)', lineHeight: 'var(--binge-lh-heading)', margin: '0 0 40px', letterSpacing: '-0.02em' }}>
            Complete the AS-Series system.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '1px', backgroundColor: 'var(--binge-border)' }}>
            {ACCESSORIES.map(a => (
              <div key={a.code} style={{ backgroundColor: 'var(--binge-white)', padding: '28px' }}>
                <div style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 700, color: 'var(--binge-orange)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase', marginBottom: '8px' }}>{a.code}</div>
                <div style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 700, color: 'var(--binge-text-primary)', marginBottom: '8px' }}>{a.name}</div>
                <div style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-body)', lineHeight: 'var(--binge-lh-body)' }}>{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Downloads + CTA ── */}
      <section style={{ backgroundColor: 'var(--binge-dark)' }}>
        <div style={wrap()}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Catalogue + drawings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <span style={sLabel}>Technical Resources</span>
                <h2 style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)', fontWeight: 700, color: '#fff', lineHeight: 'var(--binge-lh-heading)', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  Catalogue and drawings on request.
                </h2>
                <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body-lg)', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 'var(--binge-lh-body)', margin: 0 }}>
                  The full AS-Series product data sheet, profile drawings in DXF and PDF,
                  installation guide and STEP model are available at no charge on request.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { icon: FileText, label: 'AS-Series Product Catalogue' },
                  { icon: Download, label: 'Profile Drawing Pack (DXF + PDF)' },
                  { icon: FileText, label: 'AS-Series Installation Guide' },
                  { icon: Download, label: '3D Model Pack (STEP)' },
                ].map(({ icon: Icon, label }) => (
                  <a key={label} href="mailto:technical@binge-profiles.com?subject=Document Request: AS-Series" style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '14px 16px', border: '1px solid rgba(255,255,255,0.1)',
                    textDecoration: 'none', transition: 'border-color 0.15s',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                  }}>
                    <Icon size={16} style={{ color: 'var(--binge-orange)', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 400, color: 'rgba(255,255,255,0.75)', flex: 1 }}>{label}</span>
                    <span style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700, color: 'var(--binge-orange)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase', flexShrink: 0 }}>Request</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Sample + quote */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
              <div>
                <span style={sLabel}>Start Your Project</span>
                <h2 style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)', fontWeight: 700, color: '#fff', lineHeight: 'var(--binge-lh-heading)', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  Request a sample or submit an RFQ.
                </h2>
                <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body-lg)', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 'var(--binge-lh-body)', margin: 0 }}>
                  Our technical team will confirm profile sizes, finishes and lead times
                  and dispatch physical samples for project sign-off.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                <a href="mailto:samples@binge-profiles.com?subject=Sample Request: AS-Series Aluminium Skirting" style={orangeBtn}>
                  Request a Sample
                </a>
                <a href="mailto:quote@binge-profiles.com?subject=RFQ: AS-Series Aluminium Skirting" style={outlineLight}>
                  Request a Quote
                </a>
                <Link to="/downloads" style={{
                  fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700,
                  color: 'rgba(255,255,255,0.45)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '4px',
                }}>
                  All Technical Downloads <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
