"use client";

import { useState, useMemo } from 'react';
import { Link } from '@/lib/router-compat';
import { ChevronRight, ChevronDown, X, ArrowRight } from 'lucide-react';
import { PRODUCT_CATALOGUE, type Application, type Category, type Installation, type Material, type Product } from '@/data/product-catalogue';
import { useI18n } from '@/lib/i18n';
import { translateCopy } from '@/lib/localized-copy';

// ─── Filter Options ───────────────────────────────────────────────────────────

const CATEGORIES: ('All' | Category)[] = [
  'All',
  'Surface-Mounted Aluminum',
  'Stainless Steel',
  'Solid Wood',
  'WPC',
  'Recessed & Shadow Gap',
  'LED Skirting',
  'Plaster-In',
  'Trims & Profiles',
];
const MATERIALS:     ('All' | Material)[]      = ['All', 'Aluminum', 'Stainless Steel', 'Solid Wood', 'WPC'];
const INSTALLATIONS: ('All' | Installation)[]  = ['All', 'Surface-Mounted', 'Recessed', 'Clip-on', 'Adhesive', 'Embedded'];
const APPLICATIONS:  ('All' | Application)[]   = ['All', 'Residential', 'Hospitality', 'Workplace', 'Commercial'];

// ─── FilterSelect ─────────────────────────────────────────────────────────────

function FilterSelect({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  const { locale } = useI18n();
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
        <option value="All">{translateCopy(label, locale)}: {translateCopy('All', locale)}</option>
        {options.filter(o => o !== 'All').map(o => <option key={o} value={o}>{translateCopy(o, locale)}</option>)}
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
  const { locale } = useI18n();
  const detailHref = `/products/${p.slug}`;

  return (
    <div className="group" data-binge-card style={{ backgroundColor: 'var(--binge-white)' }}>
      <Link
        to={detailHref}
        aria-label={`${translateCopy('View Product', locale)} ${translateCopy(p.name, locale)}`}
        style={{ display: 'block', overflow: 'hidden', aspectRatio: '4 / 3', backgroundColor: 'var(--binge-card-bg)' }}
      >
        <img
          src={p.img} alt={translateCopy(p.alt, locale)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.45s ease' }}
          className="group-hover:scale-105"
        />
      </Link>
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
          {translateCopy(p.name, locale)}
        </h3>
        <p style={{
          fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)',
          fontWeight: 300, color: 'var(--binge-text-body)',
          lineHeight: 'var(--binge-lh-body)', margin: '0 0 16px',
        }}>
          {translateCopy(p.desc, locale)}
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {[p.materialGroup, p.installation].map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)',
              fontWeight: 400, color: 'var(--binge-text-muted)',
              backgroundColor: 'var(--binge-white)', border: '1px solid var(--binge-border)',
              padding: '2px 8px',
            }}>
              {translateCopy(tag, locale)}
            </span>
          ))}
        </div>
        <Link to={detailHref} style={{
            fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
            fontWeight: 700, color: 'var(--binge-orange)',
            letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px',
          }}>
            {translateCopy('View Product', locale)} <ArrowRight size={13} />
          </Link>
      </div>
    </div>
  );
}

// ─── ProductsPage ─────────────────────────────────────────────────────────────

export function ProductsPage() {
  const { locale } = useI18n();
  const [activeCat,          setActiveCat]          = useState<'All' | Category>('All');
  const [filterMaterial,     setFilterMaterial]     = useState<'All' | Material>('All');
  const [filterInstallation, setFilterInstallation] = useState<'All' | Installation>('All');
  const [filterApplication,  setFilterApplication]  = useState<'All' | Application>('All');

  const hasFilters = activeCat !== 'All' || filterMaterial !== 'All' || filterInstallation !== 'All' || filterApplication !== 'All';

  const clearAll = () => {
    setActiveCat('All'); setFilterMaterial('All');
    setFilterInstallation('All'); setFilterApplication('All');
  };

  const filtered = useMemo(() => PRODUCT_CATALOGUE.filter(p => {
    const catOk  = activeCat          === 'All' || p.category     === activeCat;
    const matOk  = filterMaterial     === 'All' || p.materialGroup  === filterMaterial;
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
              {translateCopy('Home', locale)}
            </Link>
            <ChevronRight size={12} style={{ color: 'var(--binge-border)', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)',
              fontWeight: 400, color: 'var(--binge-text-primary)',
            }}>
              {translateCopy('Products', locale)}
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
                {translateCopy('Product Catalogue', locale)}
              </span>
              <h1 style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-md)',
                fontWeight: 700, color: 'var(--binge-text-primary)',
                lineHeight: 'var(--binge-lh-heading)', margin: 0, letterSpacing: '-0.02em',
              }}>
                {translateCopy('Architectural Skirting & Profile Systems', locale)}
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <p style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body-lg)',
                fontWeight: 300, color: 'var(--binge-text-body)',
                lineHeight: 'var(--binge-lh-body)', margin: 0,
              }}>
                {translateCopy('Our complete range of aluminium, solid wood, stainless steel and composite profiles — manufactured for professional specification. Request technical drawings, order samples or submit an RFQ for any system in this catalogue.', locale)}
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
              {translateCopy('Filter by:', locale)}
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
                <X size={13} /> {translateCopy('Clear', locale)}
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
                {translateCopy(cat === 'All' ? 'All Products' : cat, locale)}
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
              <a href="mailto:info@bingeskirtingboard.com?subject=Technical Product Request" style={{
                backgroundColor: 'var(--binge-orange)', color: '#fff',
                fontFamily: 'var(--binge-font)', fontWeight: 700,
                fontSize: 'var(--binge-size-button)', letterSpacing: 'var(--binge-tracking-button)',
                textTransform: 'uppercase', textDecoration: 'none',
                padding: '0 28px', height: '48px',
                display: 'inline-flex', alignItems: 'center', borderRadius: 0,
              }}>
                Contact Our Technical Team
              </a>
              <a href="mailto:info@bingeskirtingboard.com?subject=Product Sample Request" style={{
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
              <Link to="/downloads" style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
                fontWeight: 700, color: 'rgba(255,255,255,0.5)',
                letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
                gap: '6px', marginTop: '4px',
              }}>
                Download Full Catalogue <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
