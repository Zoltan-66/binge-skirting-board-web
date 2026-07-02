"use client";

import { useRef } from 'react';
import { useBingeSectionMotion } from './useBingeSectionMotion';
import { useI18n } from '@/lib/i18n';
import { Link } from '@/lib/router-compat';

/*
 * Hero uses a grid that stacks on mobile:
 *   - Row 1: dark text panel (full width)
 *   - Row 2: photograph (full width, 300px tall)
 * On desktop: 2-column split — text left, photo right, never overlapping.
 */

const heroText: React.CSSProperties = {
  padding: 'var(--binge-section-v) var(--binge-pad-h)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '28px',
};

const ctaBase: React.CSSProperties = {
  fontFamily: 'var(--binge-font)',
  fontWeight: 700,
  fontSize: 'var(--binge-size-button)',
  letterSpacing: 'var(--binge-tracking-button)',
  textTransform: 'uppercase',
  textDecoration: 'none',
  height: '48px',
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: 0,
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { t } = useI18n();
  useBingeSectionMotion(sectionRef, { hero: true });

  return (
    <section ref={sectionRef} style={{ backgroundColor: 'var(--binge-dark)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto' }}>

        {/* ── Stacks (text → photo) on mobile; side-by-side on lg ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[620px]">

          {/* Text panel */}
          <div style={heroText}>
            <span data-binge-reveal style={{
              fontFamily: 'var(--binge-font)',
              fontSize: 'var(--binge-size-label)',
              fontWeight: 700,
              color: 'var(--binge-orange)',
              letterSpacing: 'var(--binge-tracking-label)',
              textTransform: 'uppercase',
            }}>
              {t('heroLabel')}
            </span>

            <h1 data-binge-reveal style={{
              fontFamily: 'var(--binge-font)',
              fontSize: 'var(--binge-size-display-xl)',
              fontWeight: 700,
              lineHeight: 'var(--binge-lh-display)',
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.025em',
            }}>
              {t('heroTitle')}
            </h1>

            <p data-binge-reveal style={{
              fontFamily: 'var(--binge-font)',
              fontSize: 'var(--binge-size-body-lg)',
              fontWeight: 300,
              lineHeight: 'var(--binge-lh-body)',
              color: 'rgba(255,255,255,0.6)',
              margin: 0,
              maxWidth: '420px',
            }}>
              {t('heroBody')}
            </p>

            {/* ── CTAs — 48px touch targets ── */}
            <div data-binge-reveal style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="#products" data-tour="product-entry" style={{
                ...ctaBase,
                backgroundColor: 'var(--binge-orange)',
                color: '#fff',
                padding: '0 28px',
              }}>
                {t('exploreProducts')}
              </Link>
              <Link to="/downloads" style={{
                ...ctaBase,
                backgroundColor: 'transparent',
                color: '#fff',
                padding: '0 28px',
                border: '1px solid rgba(255,255,255,0.3)',
              }}>
                {t('requestCatalogue')}
              </Link>
            </div>
          </div>

          {/* ── Photograph — always visible, never under text ──
               Mobile: stacks below text at 300px tall.
               Desktop: fills full right column height. */}
          <div data-binge-media style={{ position: 'relative', overflow: 'hidden', minHeight: '300px' }}>
            <img
              src="https://images.unsplash.com/photo-1771462883654-ed6d8fa42ae7?w=1080&q=80&fit=crop"
              alt="Minimalist interior — dark engineered floor meets a clean white wall junction"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Orange accent rule ── */}
      <div data-binge-rule style={{ height: '3px', backgroundColor: 'var(--binge-orange)' }} />
    </section>
  );
}
