"use client";

import { FileText, Download } from 'lucide-react';

const DOCS = [
  {
    type: 'Product Catalogue',
    desc: 'Full range overview — aluminium, solid wood, stainless steel and trim profiles.',
    date: 'Updated Jun 2025',
    size: 'PDF · 18 MB',
  },
  {
    type: 'Profile Drawings',
    desc: 'DXF and PDF technical drawings for all current profile families.',
    date: 'Updated Apr 2025',
    size: 'ZIP · 42 MB',
  },
  {
    type: 'Installation Instructions',
    desc: 'Step-by-step installation guides for each skirting system type.',
    date: 'Updated Mar 2025',
    size: 'PDF · 6 MB',
  },
  {
    type: 'Test Reports',
    desc: 'Material test certificates and performance data for key profiles.',
    date: 'Updated Jan 2025',
    size: 'PDF · 4 MB',
  },
];

export function TechnicalDownloads() {
  return (
    <section id="downloads" style={{ backgroundColor: 'var(--binge-white)' }}>
      <div style={{
        maxWidth: 'var(--binge-content-max)',
        margin: '0 auto',
        padding: 'var(--binge-section-v) var(--binge-pad-h)',
      }}>
        {/* ── Section header ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '48px',
        }}>
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
            <h2 style={{
              fontFamily: 'var(--binge-font)',
              fontSize: 'var(--binge-size-display-sm)',
              fontWeight: 700,
              color: 'var(--binge-text-primary)',
              lineHeight: 'var(--binge-lh-display)',
              margin: 0,
              letterSpacing: '-0.02em',
            }}>
              Specifications, drawings<br />and documentation.
            </h2>
          </div>
          <a href="/downloads" style={{
            fontFamily: 'var(--binge-font)',
            fontSize: 'var(--binge-size-label)',
            fontWeight: 700,
            color: 'var(--binge-text-muted)',
            letterSpacing: 'var(--binge-tracking-label)',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            View All Resources ›
          </a>
        </div>

        {/* ── Download rows ── */}
        <div style={{ borderTop: '1px solid var(--binge-border)' }}>
          {DOCS.map((d, i) => (
            <div
              key={i}
              className="group"
              style={{
                borderBottom: '1px solid var(--binge-border)',
                padding: 'clamp(16px, 3vw, 28px) 0',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                transition: 'background 0.15s',
              }}
            >
              {/* Icon */}
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'var(--binge-card-bg)',
                border: '1px solid var(--binge-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <FileText size={20} style={{ color: 'var(--binge-text-muted)' }} />
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: 'var(--binge-font)',
                  fontSize: 'var(--binge-size-title-md)',
                  fontWeight: 700,
                  color: 'var(--binge-text-primary)',
                  marginBottom: '4px',
                }}>
                  {d.type}
                </div>
                <div style={{
                  fontFamily: 'var(--binge-font)',
                  fontSize: 'var(--binge-size-body)',
                  fontWeight: 300,
                  color: 'var(--binge-text-body)',
                  lineHeight: 1.5,
                }}>
                  {d.desc}
                </div>
              </div>

              {/* Meta */}
              <div className="hidden md:block" style={{
                fontFamily: 'var(--binge-font)',
                fontSize: 'var(--binge-size-caption)',
                fontWeight: 400,
                color: 'var(--binge-text-muted)',
                textAlign: 'right',
                flexShrink: 0,
                lineHeight: 1.6,
              }}>
                <div>{d.date}</div>
                <div>{d.size}</div>
              </div>

              {/* Download link */}
              <a href={`mailto:technical@binge-profiles.com?subject=${encodeURIComponent(`Document Request: ${d.type}`)}`} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--binge-font)',
                fontSize: 'var(--binge-size-label)',
                fontWeight: 700,
                color: 'var(--binge-orange)',
                letterSpacing: 'var(--binge-tracking-label)',
                textTransform: 'uppercase',
                textDecoration: 'none',
                flexShrink: 0,
              }}>
                <span className="hidden sm:inline">Download</span>
                <Download size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
