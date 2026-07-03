"use client";

import { useRef } from 'react';
import { DOWNLOAD_RESOURCES, FEATURED_DOWNLOAD_RESOURCES } from '@/data/download-resources';
import { ArrowRight, FileText } from 'lucide-react';
import { useBingeSectionMotion } from './useBingeSectionMotion';
import { useI18n } from '@/lib/i18n';
import { Link } from '@/lib/router-compat';

const DOCS = FEATURED_DOWNLOAD_RESOURCES.map(type => {
  const representative = DOWNLOAD_RESOURCES.find(resource => resource.documentType === type);

  return {
    type,
    desc: representative?.shortDescription ?? '',
    status: representative?.publicAvailability ?? 'Available after RFQ',
  };
});

export function TechnicalDownloads() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { t } = useI18n();
  useBingeSectionMotion(sectionRef, { imageParallax: false });

  return (
    <section ref={sectionRef} id="downloads" style={{ backgroundColor: 'var(--binge-white)' }}>
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
          <div data-tour="technical-downloads">
            <span data-binge-reveal style={{
              fontFamily: 'var(--binge-font)',
              fontSize: 'var(--binge-size-label)',
              fontWeight: 700,
              color: 'var(--binge-orange)',
              letterSpacing: 'var(--binge-tracking-label)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '14px',
            }}>
              {t('technicalResources')}
            </span>
            <h2 data-binge-reveal style={{
              fontFamily: 'var(--binge-font)',
              fontSize: 'var(--binge-size-display-sm)',
              fontWeight: 700,
              color: 'var(--binge-text-primary)',
              lineHeight: 'var(--binge-lh-display)',
              margin: 0,
              letterSpacing: '-0.02em',
            }}>
              {t('technicalHeading')}
            </h2>
            <p data-binge-reveal style={{
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
              catalogue pages and project resources for their market.
            </p>
          </div>
          <Link to="/downloads" data-binge-reveal style={{
            fontFamily: 'var(--binge-font)',
            fontSize: 'var(--binge-size-label)',
            fontWeight: 700,
            color: 'var(--binge-text-muted)',
            letterSpacing: 'var(--binge-tracking-label)',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            View All Resources ›
          </Link>
        </div>

        <div style={{ borderTop: '1px solid var(--binge-border)' }}>
          {DOCS.map(d => (
            <div
              key={d.type}
              className="group"
              data-binge-card
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

              <Link to="/downloads" style={{
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
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
