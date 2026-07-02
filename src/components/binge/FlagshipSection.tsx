"use client";

import { useRef } from 'react';
import { Link } from '@/lib/router-compat';
import { useBingeSectionMotion } from './useBingeSectionMotion';
import { useI18n } from '@/lib/i18n';

/*
 * FlagshipSection stacks on mobile: text → wood photograph.
 * On desktop: dark split — text left, photograph right.
 * Text is NEVER placed over the photograph.
 */

const BENEFITS = [
  'Separate wall-fixed base and visible face board',
  'Concealed connection detail after installation',
  'Coordinated installation sequence for long runs',
  'Multiple face colours and profile options',
  'OEM dimensions and packaging discussed on request',
];

const darkBtn = (solid: boolean): React.CSSProperties => ({
  backgroundColor: solid ? 'var(--binge-orange)' : 'transparent',
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
  border: solid ? 'none' : '1px solid rgba(255,255,255,0.3)',
});

export function FlagshipSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { t } = useI18n();
  useBingeSectionMotion(sectionRef);

  return (
    <section ref={sectionRef} style={{ backgroundColor: 'var(--binge-dark)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto' }}>

        {/* ── Stacks on mobile, side-by-side on lg ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[580px]">

          {/* Text panel */}
          <div style={{
            padding: 'var(--binge-section-v) var(--binge-pad-h)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '28px',
          }}>
            <div data-tour="flagship-system" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <span data-binge-reveal style={{
                fontFamily: 'var(--binge-font)',
                fontSize: 'var(--binge-size-label)',
                fontWeight: 700,
                color: 'var(--binge-orange)',
                letterSpacing: 'var(--binge-tracking-label)',
                textTransform: 'uppercase',
              }}>
                {t('featuredSystem')}
              </span>

              <h2 data-binge-reveal style={{
                fontFamily: 'var(--binge-font)',
                fontSize: 'var(--binge-size-display-md)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 'var(--binge-lh-heading)',
                margin: 0,
                letterSpacing: '-0.02em',
              }}>
                {t('featuredTitle')}
              </h2>
            </div>

            <p data-binge-reveal style={{
              fontFamily: 'var(--binge-font)',
              fontSize: 'var(--binge-size-body-lg)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 'var(--binge-lh-body)',
              margin: 0,
            }}>
              A clip-on solid wood system developed around a separate base and face board,
              creating a clean wall-to-floor detail with concealed connection points.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {BENEFITS.map((b, i) => (
                <li key={i} data-binge-reveal style={{
                  fontFamily: 'var(--binge-font)',
                  fontSize: 'var(--binge-size-body)',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.55,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}>
                  <span style={{ color: 'var(--binge-orange)', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>—</span>
                  {b}
                </li>
              ))}
            </ul>

            <div data-binge-reveal style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/products/tg-clip-on-solid-wood-skirting-system" style={darkBtn(true)}>View TG System</Link>
              <a href="mailto:samples@binge-profiles.com?subject=WS-TG Sample Request" style={darkBtn(false)}>Request a Sample</a>
            </div>
          </div>

          {/* ── Wood photograph — always visible, never under text ──
               Mobile: 260px below text. Desktop: fills full right column. */}
          <div data-binge-media style={{ position: 'relative', overflow: 'hidden', minHeight: '260px' }}>
            <img
              src="/images/products/ws-tg-scene.jpg"
              alt="TG clip-on solid wood skirting system installation sequence"
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
    </section>
  );
}
