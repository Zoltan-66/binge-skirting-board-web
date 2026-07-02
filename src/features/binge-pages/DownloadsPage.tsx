"use client";

import { useMemo, useState } from 'react';
import {
  DOWNLOAD_CATEGORIES,
  DOWNLOAD_DOCUMENT_TYPES,
  DOWNLOAD_RESOURCES,
  type DocumentType,
} from '@/data/download-resources';
import { Link } from '@/lib/router-compat';
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Package,
  Ruler,
  Search,
  X,
} from 'lucide-react';

const DOC_TYPE_ICON: Record<DocumentType, React.FC<{ size?: number; style?: React.CSSProperties }>> = {
  'Product Catalogue': BookOpen,
  'Profile Drawing': Ruler,
  'Installation Instructions': BookMarked,
  'Test Report': ClipboardCheck,
  'Packaging Specifications': Package,
};

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  const active = value !== options[0];

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
          minWidth: '190px',
        } as React.CSSProperties}
      >
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <div style={{
        position: 'absolute',
        right: '12px',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        color: active ? 'var(--binge-orange)' : 'var(--binge-text-muted)',
      }}>
        <ChevronDown size={13} />
      </div>
    </div>
  );
}

export function DownloadsPage() {
  const [query, setQuery] = useState('');
  const [filterCat, setFilterCat] = useState<string>('All Categories');
  const [filterType, setFilterType] = useState<string>('All Types');

  const hasFilters = query !== '' || filterCat !== 'All Categories' || filterType !== 'All Types';

  const clearAll = () => {
    setQuery('');
    setFilterCat('All Categories');
    setFilterType('All Types');
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    return DOWNLOAD_RESOURCES.filter(resource => {
      const matchSearch =
        !q ||
        resource.title.toLowerCase().includes(q) ||
        resource.code.toLowerCase().includes(q) ||
        resource.note.toLowerCase().includes(q);
      const matchCat = filterCat === 'All Categories' || resource.category === filterCat;
      const matchType = filterType === 'All Types' || resource.docType === filterType;

      return matchSearch && matchCat && matchType;
    });
  }, [query, filterCat, filterType]);

  return (
    <>
      <div style={{ backgroundColor: 'var(--binge-white)', borderBottom: '1px solid var(--binge-border)' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: '40px var(--binge-pad-h) 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <Link to="/" style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400, color: 'var(--binge-text-muted)', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={12} style={{ color: 'var(--binge-border)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400, color: 'var(--binge-text-primary)' }}>Technical Downloads</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16" style={{ marginBottom: '40px' }}>
            <div>
              <span style={{
                fontFamily: 'var(--binge-font)',
                fontSize: 'var(--binge-size-label)',
                fontWeight: 700,
                color: 'var(--binge-orange)',
                letterSpacing: 'var(--binge-tracking-label)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '14px',
              }}>
                Technical Resources
              </span>
              <h1 style={{
                fontFamily: 'var(--binge-font)',
                fontSize: 'var(--binge-size-display-md)',
                fontWeight: 700,
                color: 'var(--binge-text-primary)',
                lineHeight: 'var(--binge-lh-heading)',
                margin: 0,
                letterSpacing: '-0.02em',
              }}>
                Request catalogue packs,<br />drawings and test data.
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <p style={{
                fontFamily: 'var(--binge-font)',
                fontSize: 'var(--binge-size-body-lg)',
                fontWeight: 300,
                color: 'var(--binge-text-body)',
                lineHeight: 'var(--binge-lh-body)',
                margin: 0,
              }}>
                Our final public download library is still being prepared. During
                pre-launch, BINGE shares tailored document packs after you confirm
                the product family, target market and project use. This keeps
                catalogue pages, drawings, test reports and packaging specs accurate.
              </p>
            </div>
          </div>

          <div style={{
            border: '1px solid var(--binge-border)',
            backgroundColor: 'var(--binge-warm-bg)',
            padding: '18px 20px',
            marginBottom: '22px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}>
            <div>
              <div style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 700, color: 'var(--binge-text-primary)', marginBottom: '4px' }}>
                Pre-launch document request mode
              </div>
              <div style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 300, color: 'var(--binge-text-body)', lineHeight: 1.5 }}>
                No placeholder PDF links are shown here. Buyers can request the right technical pack through the RFQ form.
              </div>
            </div>
            <Link to="/request-a-quote?source=downloads" style={{
              backgroundColor: 'var(--binge-orange)',
              color: '#fff',
              fontFamily: 'var(--binge-font)',
              fontWeight: 700,
              fontSize: 'var(--binge-size-button)',
              letterSpacing: 'var(--binge-tracking-button)',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '0 22px',
              height: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: 0,
              whiteSpace: 'nowrap',
            }}>
              Request Pack <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ paddingBottom: '0' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
              <div style={{ position: 'relative', flex: '1 1 260px', minWidth: '200px' }}>
                <Search size={15} style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--binge-text-muted)',
                  pointerEvents: 'none',
                }} />
                <input
                  type="text"
                  placeholder="Search by title, product code or document note…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  style={{
                    fontFamily: 'var(--binge-font)',
                    fontSize: 'var(--binge-size-body)',
                    fontWeight: 400,
                    color: 'var(--binge-text-primary)',
                    backgroundColor: 'var(--binge-white)',
                    border: '1px solid var(--binge-border)',
                    borderRadius: 0,
                    padding: '0 40px 0 44px',
                    height: '44px',
                    width: '100%',
                    outline: 'none',
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

              <FilterSelect label="Category" value={filterCat} options={DOWNLOAD_CATEGORIES} onChange={setFilterCat} />
              <FilterSelect label="Document type" value={filterType} options={DOWNLOAD_DOCUMENT_TYPES} onChange={setFilterType} />

              {hasFilters && (
                <button onClick={clearAll} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--binge-font)',
                  fontSize: 'var(--binge-size-label)',
                  fontWeight: 700,
                  color: 'var(--binge-text-muted)',
                  letterSpacing: '0.03em',
                  padding: '0 4px',
                  height: '44px',
                }}>
                  <X size={13} /> Clear
                </button>
              )}
            </div>

            <div style={{ display: 'flex', overflowX: 'auto', gap: 0, marginInline: 'calc(var(--binge-pad-h) * -1)', paddingInline: 'var(--binge-pad-h)', scrollbarWidth: 'none' } as React.CSSProperties}>
              {DOWNLOAD_DOCUMENT_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  style={{
                    fontFamily: 'var(--binge-font)',
                    fontSize: 'var(--binge-size-label)',
                    fontWeight: 700,
                    letterSpacing: 'var(--binge-tracking-label)',
                    textTransform: 'uppercase',
                    color: type === filterType ? 'var(--binge-orange)' : 'var(--binge-text-muted)',
                    background: 'none',
                    border: 'none',
                    borderBottom: type === filterType ? '2px solid var(--binge-orange)' : '2px solid transparent',
                    cursor: 'pointer',
                    padding: '0 20px',
                    height: '48px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    transition: 'color 0.15s, border-color 0.15s',
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--binge-white)', minHeight: '50vh' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: '32px var(--binge-pad-h) var(--binge-section-v)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '8px' }}>
            <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-muted)', margin: 0 }}>
              Showing <strong style={{ fontWeight: 700, color: 'var(--binge-text-primary)' }}>{filtered.length}</strong> of {DOWNLOAD_RESOURCES.length} resources
            </p>
            {hasFilters && (
              <button onClick={clearAll} style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700, color: 'var(--binge-orange)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <X size={12} /> Clear filters
              </button>
            )}
          </div>

          <div className="hidden md:grid" style={{
            gridTemplateColumns: '44px 1fr auto auto auto',
            gap: '0 20px',
            padding: '0 0 10px',
            borderBottom: '1px solid var(--binge-border)',
            marginBottom: '0',
          }}>
            <div />
            <div style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 700, color: 'var(--binge-text-muted)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase' }}>Resource</div>
            <div style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 700, color: 'var(--binge-text-muted)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase', textAlign: 'right' }}>Formats</div>
            <div style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 700, color: 'var(--binge-text-muted)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase', textAlign: 'right', minWidth: '132px' }}>Status</div>
            <div />
          </div>

          {filtered.length > 0 ? (
            <div style={{ borderTop: '1px solid var(--binge-border)' }}>
              {filtered.map(resource => {
                const TypeIcon = DOC_TYPE_ICON[resource.docType];

                return (
                  <div
                    key={resource.id}
                    className="group"
                    style={{
                      borderBottom: '1px solid var(--binge-border)',
                      padding: 'clamp(14px, 2vw, 22px) 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      transition: 'background 0.1s',
                    }}
                  >
                    <div style={{
                      width: '44px',
                      height: '44px',
                      flexShrink: 0,
                      backgroundColor: 'var(--binge-card-bg)',
                      border: '1px solid var(--binge-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <TypeIcon size={18} style={{ color: 'var(--binge-text-muted)' }} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'var(--binge-font)',
                        fontSize: 'var(--binge-size-body)',
                        fontWeight: 700,
                        color: 'var(--binge-text-primary)',
                        marginBottom: '6px',
                        lineHeight: 1.3,
                      }}>
                        {resource.title}
                      </div>
                      <p style={{
                        fontFamily: 'var(--binge-font)',
                        fontSize: 'var(--binge-size-caption)',
                        fontWeight: 300,
                        color: 'var(--binge-text-body)',
                        lineHeight: 1.5,
                        margin: '0 0 8px',
                      }}>
                        {resource.note}
                      </p>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{
                          fontFamily: 'var(--binge-font)',
                          fontSize: 'var(--binge-size-caption)',
                          fontWeight: 400,
                          color: 'var(--binge-text-muted)',
                          border: '1px solid var(--binge-border)',
                          padding: '2px 8px',
                          display: 'inline-block',
                        }}>
                          {resource.docType}
                        </span>
                        <span style={{
                          fontFamily: 'var(--binge-font)',
                          fontSize: 'var(--binge-size-caption)',
                          fontWeight: 700,
                          color: 'var(--binge-orange)',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                        }}>
                          {resource.code}
                        </span>
                      </div>
                    </div>

                    <div className="hidden md:block" style={{
                      fontFamily: 'var(--binge-font)',
                      fontSize: 'var(--binge-size-label)',
                      fontWeight: 700,
                      color: 'var(--binge-text-primary)',
                      letterSpacing: '0.05em',
                      flexShrink: 0,
                      minWidth: '84px',
                      textAlign: 'right',
                    }}>
                      {resource.formats.join(' / ')}
                    </div>

                    <div className="hidden md:block" style={{
                      fontFamily: 'var(--binge-font)',
                      fontSize: 'var(--binge-size-caption)',
                      fontWeight: 400,
                      color: 'var(--binge-text-body)',
                      flexShrink: 0,
                      minWidth: '132px',
                      textAlign: 'right',
                      lineHeight: 1.4,
                    }}>
                      {resource.availability}
                    </div>

                    <Link
                      to={`/request-a-quote?source=downloads&document=${encodeURIComponent(resource.title)}`}
                      style={{
                        fontFamily: 'var(--binge-font)',
                        fontSize: 'var(--binge-size-label)',
                        fontWeight: 700,
                        letterSpacing: 'var(--binge-tracking-label)',
                        textTransform: 'uppercase',
                        color: '#fff',
                        backgroundColor: 'var(--binge-orange)',
                        textDecoration: 'none',
                        flexShrink: 0,
                        height: '40px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0 16px',
                        borderRadius: 0,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span className="hidden sm:inline">Request Pack</span>
                      <span className="sm:hidden">Request</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{
              border: '1px solid var(--binge-border)',
              padding: '80px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '16px',
            }}>
              <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-title-md)', fontWeight: 700, color: 'var(--binge-text-primary)', margin: 0 }}>
                No resources match your search.
              </p>
              <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-muted)', margin: 0 }}>
                Try a different search term or clear your filters to see all available resource types.
              </p>
              <button
                onClick={clearAll}
                style={{
                  backgroundColor: 'var(--binge-orange)',
                  color: '#fff',
                  fontFamily: 'var(--binge-font)',
                  fontWeight: 700,
                  fontSize: 'var(--binge-size-button)',
                  letterSpacing: 'var(--binge-tracking-button)',
                  textTransform: 'uppercase',
                  padding: '0 28px',
                  height: '48px',
                  border: 'none',
                  borderRadius: 0,
                  cursor: 'pointer',
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}

          {filtered.length > 0 && (
            <div style={{
              marginTop: '32px',
              paddingTop: '28px',
              borderTop: '1px solid var(--binge-border)',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
            }}>
              <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-muted)', margin: 0 }}>
                Can&apos;t find a specific drawing, certificate or catalogue page?
              </p>
              <Link to="/request-a-quote?source=downloads" style={{
                fontFamily: 'var(--binge-font)',
                fontSize: 'var(--binge-size-body)',
                fontWeight: 700,
                color: 'var(--binge-orange)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                Request it through the RFQ form <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>

      <section style={{ backgroundColor: 'var(--binge-dark)' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: '72px var(--binge-pad-h)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <span style={{
                fontFamily: 'var(--binge-font)',
                fontSize: 'var(--binge-size-label)',
                fontWeight: 700,
                color: 'var(--binge-orange)',
                letterSpacing: 'var(--binge-tracking-label)',
                textTransform: 'uppercase',
              }}>
                Technical Support
              </span>
              <h2 style={{
                fontFamily: 'var(--binge-font)',
                fontSize: 'var(--binge-size-display-sm)',
                fontWeight: 700,
                color: '#fff',
                lineHeight: 'var(--binge-lh-heading)',
                margin: 0,
                letterSpacing: '-0.02em',
              }}>
                Need a specific drawing<br />or specification?
              </h2>
              <p style={{
                fontFamily: 'var(--binge-font)',
                fontSize: 'var(--binge-size-body-lg)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 'var(--binge-lh-body)',
                margin: 0,
                maxWidth: '480px',
              }}>
                During pre-launch, document packs are prepared manually so each buyer
                receives the right catalogue, profile drawings, material data, test
                reports and packaging specifications for the target market.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
              <Link to="/request-a-quote?source=downloads" style={{
                backgroundColor: 'var(--binge-orange)',
                color: '#fff',
                fontFamily: 'var(--binge-font)',
                fontWeight: 700,
                fontSize: 'var(--binge-size-button)',
                letterSpacing: 'var(--binge-tracking-button)',
                textTransform: 'uppercase',
                textDecoration: 'none',
                padding: '0 28px',
                height: '48px',
                display: 'inline-flex',
                alignItems: 'center',
                borderRadius: 0,
              }}>
                Request a Document Pack
              </Link>
              <Link to="/products" style={{
                backgroundColor: 'transparent',
                color: '#fff',
                fontFamily: 'var(--binge-font)',
                fontWeight: 700,
                fontSize: 'var(--binge-size-button)',
                letterSpacing: 'var(--binge-tracking-button)',
                textTransform: 'uppercase',
                textDecoration: 'none',
                padding: '0 28px',
                height: '48px',
                display: 'inline-flex',
                alignItems: 'center',
                borderRadius: 0,
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
