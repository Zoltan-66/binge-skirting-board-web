"use client";

import { useState, useMemo } from 'react';
import { Link } from '@/lib/router-compat';
import {
  Search, X, ChevronRight, ChevronDown,
  BookOpen, Ruler, BookMarked, ClipboardCheck, Package, ArrowRight,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type DocType   = 'Product Catalogue' | 'Profile Drawing' | 'Installation Instructions' | 'Test Report' | 'Packaging Specifications';
type ProdCat   = 'All Products' | 'Aluminium Skirting' | 'Recessed Systems' | 'LED Systems' | 'Solid Wood' | 'Stainless Steel' | 'WPC Skirting' | 'Trims & Profiles';
type FileFormat = 'PDF' | 'DXF' | 'STEP' | 'ZIP';

type Doc = {
  id: number;
  title: string;
  code: string;
  category: ProdCat;
  docType: DocType;
  format: FileFormat;
  updated: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const DOC_TYPE_ICON: Record<DocType, React.FC<{ size?: number; style?: React.CSSProperties }>> = {
  'Product Catalogue':       BookOpen,
  'Profile Drawing':         Ruler,
  'Installation Instructions': BookMarked,
  'Test Report':             ClipboardCheck,
  'Packaging Specifications': Package,
};

const DOCUMENTS: Doc[] = [
  // ─ Product Catalogues ─
  { id:  1, title: 'BINGE Full Product Catalogue 2025',             code: 'All Products', category: 'All Products',      docType: 'Product Catalogue',       format: 'PDF', updated: 'Jun 2025' },
  { id:  2, title: 'Aluminium Skirting Range Overview',             code: 'AS-Range',     category: 'Aluminium Skirting', docType: 'Product Catalogue',       format: 'PDF', updated: 'Apr 2025' },
  { id:  3, title: 'Solid Wood & WPC Skirting Catalogue',           code: 'WS/WP-Range',  category: 'Solid Wood',         docType: 'Product Catalogue',       format: 'PDF', updated: 'Mar 2025' },
  { id:  4, title: 'LED Skirting Systems Catalogue',                code: 'SL-Range',     category: 'LED Systems',        docType: 'Product Catalogue',       format: 'PDF', updated: 'May 2025' },
  // ─ Profile Drawings ─
  { id:  5, title: 'AS-FF Flat-Face Clip-On — Profile Drawing',     code: 'AS-FF',        category: 'Aluminium Skirting', docType: 'Profile Drawing',         format: 'DXF', updated: 'On request' },
  { id:  6, title: 'AS-DS Dual-Seal Aluminium — Profile Drawing',   code: 'AS-DS',        category: 'Aluminium Skirting', docType: 'Profile Drawing',         format: 'DXF', updated: 'On request' },
  { id:  7, title: 'RS-SG Shadow Gap System — Profile Drawing',     code: 'RS-SG',        category: 'Recessed Systems',   docType: 'Profile Drawing',         format: 'DXF', updated: 'On request' },
  { id:  8, title: 'RS-LED Recessed LED System — Profile Drawing',  code: 'RS-LED',       category: 'LED Systems',        docType: 'Profile Drawing',         format: 'DXF', updated: 'On request' },
  { id:  9, title: 'WS-TG TG Clip-On System — Profile Drawing',     code: 'WS-TG',        category: 'Solid Wood',         docType: 'Profile Drawing',         format: 'DXF', updated: 'On request' },
  { id: 10, title: 'SS-CL Classic Stainless Steel — Profile Drawing',code: 'SS-CL',       category: 'Stainless Steel',    docType: 'Profile Drawing',         format: 'DXF', updated: 'On request' },
  { id: 11, title: 'Complete Profile Drawing Pack — All Systems',   code: 'All Products', category: 'All Products',      docType: 'Profile Drawing',         format: 'ZIP', updated: 'On request' },
  // ─ Installation Instructions ─
  { id: 12, title: 'Aluminium Clip-On Skirting — Installation Guide',code: 'AS-Range',    category: 'Aluminium Skirting', docType: 'Installation Instructions', format: 'PDF', updated: 'Apr 2025' },
  { id: 13, title: 'WS-TG TG System — Installation Guide',          code: 'WS-TG',        category: 'Solid Wood',         docType: 'Installation Instructions', format: 'PDF', updated: 'Jun 2025' },
  { id: 14, title: 'Recessed & Shadow Gap Systems — Installation Guide',code:'RS-Range',   category: 'Recessed Systems',   docType: 'Installation Instructions', format: 'PDF', updated: 'Mar 2025' },
  { id: 15, title: 'LED Skirting Systems — Installation Guide',     code: 'SL-Range',     category: 'LED Systems',        docType: 'Installation Instructions', format: 'PDF', updated: 'May 2025' },
  { id: 16, title: 'Stainless Steel Skirting — Installation Guide', code: 'SS-Range',     category: 'Stainless Steel',    docType: 'Installation Instructions', format: 'PDF', updated: 'Feb 2025' },
  // ─ Test Reports ─
  { id: 17, title: 'AS-FF Aluminium Material Test Report',          code: 'AS-FF',        category: 'Aluminium Skirting', docType: 'Test Report',             format: 'PDF', updated: 'On request' },
  { id: 18, title: 'SS-CL Stainless Steel Grade Test Report',       code: 'SS-CL',        category: 'Stainless Steel',    docType: 'Test Report',             format: 'PDF', updated: 'On request' },
  { id: 19, title: 'WS-TG Timber Performance Data Sheet',           code: 'WS-TG',        category: 'Solid Wood',         docType: 'Test Report',             format: 'PDF', updated: 'On request' },
  // ─ Packaging Specifications ─
  { id: 20, title: 'Standard Export Carton Specification',          code: 'All Products', category: 'All Products',      docType: 'Packaging Specifications', format: 'PDF', updated: 'Mar 2025' },
  { id: 21, title: 'OEM Packaging Specification Template',          code: 'OEM',          category: 'All Products',      docType: 'Packaging Specifications', format: 'PDF', updated: 'On request' },
  { id: 22, title: 'Pallet & Container Loading Guide',              code: 'All Products', category: 'All Products',      docType: 'Packaging Specifications', format: 'PDF', updated: 'Jan 2025' },
];

const CATEGORIES: ('All Categories' | ProdCat)[] = [
  'All Categories', 'All Products', 'Aluminium Skirting', 'Recessed Systems',
  'LED Systems', 'Solid Wood', 'Stainless Steel', 'WPC Skirting', 'Trims & Profiles',
];
const DOC_TYPES: ('All Types' | DocType)[] = [
  'All Types', 'Product Catalogue', 'Profile Drawing',
  'Installation Instructions', 'Test Report', 'Packaging Specifications',
];

// ─── FilterSelect ─────────────────────────────────────────────────────────────

function FilterSelect({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  const active = value !== options[0];
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label={label}
        style={{
          fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
          fontWeight: active ? 700 : 400,
          color: active ? 'var(--binge-orange)' : 'var(--binge-text-body)',
          backgroundColor: 'var(--binge-white)',
          border: `1px solid ${active ? 'var(--binge-orange)' : 'var(--binge-border)'}`,
          borderRadius: 0, padding: '0 36px 0 14px', height: '44px',
          appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer', outline: 'none',
          minWidth: '190px',
        } as React.CSSProperties}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <div style={{ position: 'absolute', right: '12px', pointerEvents: 'none', display: 'flex', alignItems: 'center', color: active ? 'var(--binge-orange)' : 'var(--binge-text-muted)' }}>
        <ChevronDown size={13} />
      </div>
    </div>
  );
}

// ─── DownloadsPage ────────────────────────────────────────────────────────────

export function DownloadsPage() {
  const [query,       setQuery]       = useState('');
  const [filterCat,  setFilterCat]   = useState<string>('All Categories');
  const [filterType, setFilterType]  = useState<string>('All Types');

  const hasFilters = query !== '' || filterCat !== 'All Categories' || filterType !== 'All Types';

  const clearAll = () => { setQuery(''); setFilterCat('All Categories'); setFilterType('All Types'); };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return DOCUMENTS.filter(d => {
      const matchSearch = !q || d.title.toLowerCase().includes(q) || d.code.toLowerCase().includes(q);
      const matchCat    = filterCat  === 'All Categories' || d.category === filterCat;
      const matchType   = filterType === 'All Types'      || d.docType  === filterType;
      return matchSearch && matchCat && matchType;
    });
  }, [query, filterCat, filterType]);

  return (
    <>
      {/* ── Page header ── */}
      <div style={{ backgroundColor: 'var(--binge-white)', borderBottom: '1px solid var(--binge-border)' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: '40px var(--binge-pad-h) 0' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <Link to="/" style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400, color: 'var(--binge-text-muted)', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={12} style={{ color: 'var(--binge-border)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400, color: 'var(--binge-text-primary)' }}>Technical Downloads</span>
          </div>

          {/* Heading + intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16" style={{ marginBottom: '40px' }}>
            <div>
              <span style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700,
                color: 'var(--binge-orange)', letterSpacing: 'var(--binge-tracking-label)',
                textTransform: 'uppercase', display: 'block', marginBottom: '14px',
              }}>Technical Resources</span>
              <h1 style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-md)',
                fontWeight: 700, color: 'var(--binge-text-primary)',
                lineHeight: 'var(--binge-lh-heading)', margin: 0, letterSpacing: '-0.02em',
              }}>
                Product documentation<br />and technical drawings.
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <p style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body-lg)', fontWeight: 300,
                color: 'var(--binge-text-body)', lineHeight: 'var(--binge-lh-body)', margin: 0,
              }}>
                Product catalogues, profile drawings, installation guides and test data
                for all BINGE systems. Profile drawings and test reports are available
                on request — use the button on each row to contact our technical team.
              </p>
            </div>
          </div>

          {/* ── Search + filters ── */}
          <div style={{ paddingBottom: '0' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>

              {/* Search */}
              <div style={{ position: 'relative', flex: '1 1 260px', minWidth: '200px' }}>
                <Search size={15} style={{
                  position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                  color: 'var(--binge-text-muted)', pointerEvents: 'none',
                }} />
                <input
                  type="text"
                  placeholder="Search by title or product code…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  style={{
                    fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 400,
                    color: 'var(--binge-text-primary)', backgroundColor: 'var(--binge-white)',
                    border: '1px solid var(--binge-border)', borderRadius: 0,
                    padding: '0 40px 0 44px', height: '44px', width: '100%', outline: 'none',
                    boxSizing: 'border-box',
                  } as React.CSSProperties}
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--binge-text-muted)', padding: '4px' }}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Category filter */}
              <FilterSelect label="Category" value={filterCat} options={CATEGORIES} onChange={setFilterCat} />

              {/* Type filter */}
              <FilterSelect label="Document type" value={filterType} options={DOC_TYPES} onChange={setFilterType} />

              {/* Clear all */}
              {hasFilters && (
                <button onClick={clearAll} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
                  fontWeight: 700, color: 'var(--binge-text-muted)', letterSpacing: '0.03em',
                  padding: '0 4px', height: '44px',
                }}>
                  <X size={13} /> Clear
                </button>
              )}
            </div>

            {/* Document type quick-tabs */}
            <div style={{ display: 'flex', overflowX: 'auto', gap: 0, marginInline: 'calc(var(--binge-pad-h) * -1)', paddingInline: 'var(--binge-pad-h)', scrollbarWidth: 'none' } as React.CSSProperties}>
              {DOC_TYPES.map(t => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  style={{
                    fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
                    fontWeight: 700, letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase',
                    color: t === filterType ? 'var(--binge-orange)' : 'var(--binge-text-muted)',
                    background: 'none', border: 'none',
                    borderBottom: t === filterType ? '2px solid var(--binge-orange)' : '2px solid transparent',
                    cursor: 'pointer', padding: '0 20px', height: '48px',
                    whiteSpace: 'nowrap', flexShrink: 0, transition: 'color 0.15s, border-color 0.15s',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Document library ── */}
      <div style={{ backgroundColor: 'var(--binge-white)', minHeight: '50vh' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: '32px var(--binge-pad-h) var(--binge-section-v)' }}>

          {/* Result count */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '8px' }}>
            <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-muted)', margin: 0 }}>
              Showing{' '}
              <strong style={{ fontWeight: 700, color: 'var(--binge-text-primary)' }}>{filtered.length}</strong>
              {' '}of {DOCUMENTS.length} documents
            </p>
            {hasFilters && (
              <button onClick={clearAll} style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700, color: 'var(--binge-orange)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <X size={12} /> Clear filters
              </button>
            )}
          </div>

          {/* Column headers — desktop only */}
          <div className="hidden md:grid" style={{
            gridTemplateColumns: '44px 1fr auto auto auto',
            gap: '0 20px', padding: '0 0 10px',
            borderBottom: '1px solid var(--binge-border)', marginBottom: '0',
          }}>
            <div />
            <div style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 700, color: 'var(--binge-text-muted)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase' }}>Document</div>
            <div style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 700, color: 'var(--binge-text-muted)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase', textAlign: 'right' }}>Format</div>
            <div style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 700, color: 'var(--binge-text-muted)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase', textAlign: 'right', minWidth: '90px' }}>Updated</div>
            <div />
          </div>

          {/* Document rows */}
          {filtered.length > 0 ? (
            <div style={{ borderTop: '1px solid var(--binge-border)' }}>
              {filtered.map(doc => {
                const TypeIcon = DOC_TYPE_ICON[doc.docType];
                const isOnRequest = doc.updated === 'On request';
                return (
                  <div
                    key={doc.id}
                    className="group"
                    style={{
                      borderBottom: '1px solid var(--binge-border)',
                      padding: 'clamp(14px, 2vw, 22px) 0',
                      display: 'flex', alignItems: 'center', gap: '16px',
                      transition: 'background 0.1s',
                    }}
                  >
                    {/* Icon */}
                    <div style={{
                      width: '44px', height: '44px', flexShrink: 0,
                      backgroundColor: 'var(--binge-card-bg)', border: '1px solid var(--binge-border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <TypeIcon size={18} style={{ color: 'var(--binge-text-muted)' }} />
                    </div>

                    {/* Title + badges */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)',
                        fontWeight: 700, color: 'var(--binge-text-primary)',
                        marginBottom: '6px', lineHeight: 1.3,
                      }}>
                        {doc.title}
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                        {/* Doc type badge */}
                        <span style={{
                          fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400,
                          color: 'var(--binge-text-muted)', border: '1px solid var(--binge-border)',
                          padding: '2px 8px', display: 'inline-block',
                        }}>
                          {doc.docType}
                        </span>
                        {/* Product code badge */}
                        <span style={{
                          fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 700,
                          color: 'var(--binge-orange)', letterSpacing: '0.06em', textTransform: 'uppercase',
                        }}>
                          {doc.code}
                        </span>
                      </div>
                    </div>

                    {/* Format */}
                    <div className="hidden md:block" style={{
                      fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700,
                      color: 'var(--binge-text-primary)', letterSpacing: '0.05em',
                      flexShrink: 0, minWidth: '44px', textAlign: 'right',
                    }}>
                      {doc.format}
                    </div>

                    {/* Updated */}
                    <div className="hidden md:block" style={{
                      fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400,
                      color: isOnRequest ? 'var(--binge-text-muted)' : 'var(--binge-text-body)',
                      flexShrink: 0, minWidth: '90px', textAlign: 'right', lineHeight: 1.4,
                      fontStyle: isOnRequest ? 'italic' : 'normal',
                    }}>
                      {doc.updated}
                    </div>

                    {/* Request button */}
                    <a
                      href={`mailto:technical@binge-profiles.com?subject=Document Request: ${encodeURIComponent(doc.title)}`}
                      style={{
                        fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
                        fontWeight: 700, letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase',
                        color: '#fff', backgroundColor: 'var(--binge-orange)',
                        textDecoration: 'none', flexShrink: 0,
                        height: '40px', display: 'inline-flex', alignItems: 'center',
                        padding: '0 16px', borderRadius: 0, whiteSpace: 'nowrap',
                      }}
                    >
                      <span className="hidden sm:inline">Request Document</span>
                      <span className="sm:hidden">Request</span>
                    </a>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty state */
            <div style={{
              border: '1px solid var(--binge-border)', padding: '80px 24px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px',
            }}>
              <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-title-md)', fontWeight: 700, color: 'var(--binge-text-primary)', margin: 0 }}>
                No documents match your search.
              </p>
              <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-muted)', margin: 0 }}>
                Try a different search term or clear your filters to see all documents.
              </p>
              <button
                onClick={clearAll}
                style={{
                  backgroundColor: 'var(--binge-orange)', color: '#fff',
                  fontFamily: 'var(--binge-font)', fontWeight: 700, fontSize: 'var(--binge-size-button)',
                  letterSpacing: 'var(--binge-tracking-button)', textTransform: 'uppercase',
                  padding: '0 28px', height: '48px', border: 'none', borderRadius: 0, cursor: 'pointer',
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Can't find note */}
          {filtered.length > 0 && (
            <div style={{
              marginTop: '32px', paddingTop: '28px', borderTop: '1px solid var(--binge-border)',
              display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px',
            }}>
              <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-muted)', margin: 0 }}>
                Can&apos;t find a specific document?
              </p>
              <a href="mailto:technical@binge-profiles.com" style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 700,
                color: 'var(--binge-orange)', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '6px',
              }}>
                Contact our technical team <ArrowRight size={14} />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: 'var(--binge-dark)' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: '72px var(--binge-pad-h)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <span style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700,
                color: 'var(--binge-orange)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase',
              }}>Technical Support</span>
              <h2 style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)',
                fontWeight: 700, color: '#fff', lineHeight: 'var(--binge-lh-heading)',
                margin: 0, letterSpacing: '-0.02em',
              }}>
                Need a specific drawing<br />or specification?
              </h2>
              <p style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body-lg)', fontWeight: 300,
                color: 'rgba(255,255,255,0.6)', lineHeight: 'var(--binge-lh-body)', margin: 0, maxWidth: '440px',
              }}>
                Our technical team can supply profile drawings in DXF or PDF format,
                material data sheets, test reports and BIM-ready STEP models. All
                supplied at no charge for confirmed projects.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
              <a href="mailto:technical@binge-profiles.com" style={{
                backgroundColor: 'var(--binge-orange)', color: '#fff',
                fontFamily: 'var(--binge-font)', fontWeight: 700,
                fontSize: 'var(--binge-size-button)', letterSpacing: 'var(--binge-tracking-button)',
                textTransform: 'uppercase', textDecoration: 'none',
                padding: '0 28px', height: '48px', display: 'inline-flex',
                alignItems: 'center', borderRadius: 0,
              }}>
                Request a Document Pack
              </a>
              <Link to="/products" style={{
                backgroundColor: 'transparent', color: '#fff',
                fontFamily: 'var(--binge-font)', fontWeight: 700,
                fontSize: 'var(--binge-size-button)', letterSpacing: 'var(--binge-tracking-button)',
                textTransform: 'uppercase', textDecoration: 'none',
                padding: '0 28px', height: '48px', display: 'inline-flex',
                alignItems: 'center', borderRadius: 0,
                border: '1px solid rgba(255,255,255,0.3)',
              }}>
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
