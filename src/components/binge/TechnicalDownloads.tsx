"use client";

import { DOWNLOAD_RESOURCES, FEATURED_DOWNLOAD_RESOURCES } from '@/data/download-resources';
import { ArrowRight, FileText } from 'lucide-react';

const DOCS = FEATURED_DOWNLOAD_RESOURCES.map(type => {
  const representative = DOWNLOAD_RESOURCES.find(resource => resource.docType === type);

  return {
    type,
    desc: representative?.note ?? '',
    status: representative?.availability ?? 'Available on request',
  };
});

export function TechnicalDownloads() {
  return (
    <section id="downloads" style={{ backgroundColor: 'var(--binge-white)' }}>
      <div style={{
        maxWidth: 'var(--binge-content-max)',
        margin: '0 auto',
        padding: 'var(--binge-section-v) var(--binge-pad-h)',
      }}>
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
            <p style={{
              fontFamily: 'var(--binge-font)',
              fontSize: 'var(--binge-size-body)',
              fontWeight: 300,
              color: 'var(--binge-text-body)',
              lineHeight: 1.6,
              margin: '16px 0 0',
              maxWidth: '560px',
            }}>
              The public download library is being prepared. Pre-launch document packs
              are shared on request so distributors receive the correct drawings,
              catalogue pages and compliance references for their market.
            </p>
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

        <div style={{ borderTop: '1px solid var(--binge-border)' }}>
          {DOCS.map(d => (
            <div
              key={d.type}
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

              <div className="hidden md:block" style={{
                fontFamily: 'var(--binge-font)',
                fontSize: 'var(--binge-size-caption)',
                fontWeight: 400,
                color: 'var(--binge-text-muted)',
                textAlign: 'right',
                flexShrink: 0,
                lineHeight: 1.6,
              }}>
                <div>{d.status}</div>
                <div>PDF / DXF by product</div>
              </div>

              <a href="/downloads" style={{
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
                <span className="hidden sm:inline">Request</span>
                <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
