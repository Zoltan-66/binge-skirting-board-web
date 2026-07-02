"use client";

import { useRef } from 'react';
import { useBingeSectionMotion } from './useBingeSectionMotion';
import { useI18n } from '@/lib/i18n';
import { Link } from '@/lib/router-compat';

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { locale, t } = useI18n();
  const copy = {
    en: { body: 'Our technical team works directly with architects, distributors and project managers to find the right profile for every application and specification.', quote: 'Request a Quote', sample: 'Request a Sample' },
    zh: { body: '我们的技术团队直接与建筑师、经销商和项目经理合作，为不同应用与规格寻找合适的型材。', quote: '获取报价', sample: '索取样品' },
    de: { body: 'Unser Technikteam arbeitet direkt mit Architekten, Händlern und Projektleitern zusammen, um für jede Anwendung das passende Profil zu finden.', quote: 'Angebot anfordern', sample: 'Muster anfordern' },
    es: { body: 'Nuestro equipo técnico colabora con arquitectos, distribuidores y responsables de proyecto para encontrar el perfil adecuado para cada aplicación.', quote: 'Solicitar presupuesto', sample: 'Solicitar muestra' },
    fr: { body: 'Notre équipe technique collabore avec architectes, distributeurs et chefs de projet afin de trouver le profilé adapté à chaque application.', quote: 'Demander un devis', sample: 'Demander un échantillon' },
  }[locale];
  useBingeSectionMotion(sectionRef);

  return (
    <section ref={sectionRef} id="quote">
      {/* ── Full-width photograph band — NO text placed over it ── */}
      <div data-binge-media style={{ position: 'relative', height: 'clamp(200px, 40vw, 420px)', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1628744876497-eb30460be9f6?w=1920&q=80&fit=crop"
          alt="Premium minimal interior — architectural wall-to-floor detail"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* ── Dark text panel — entirely separate from the photograph ── */}
      <div style={{ backgroundColor: 'var(--binge-dark)' }}>
        <div data-tour="quote-cta" style={{
          maxWidth: 'var(--binge-content-max)',
          margin: '0 auto',
          padding: '80px var(--binge-pad-h)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '24px',
        }}>
          <h2 data-binge-reveal style={{
            fontFamily: 'var(--binge-font)',
            fontSize: 'var(--binge-size-display-lg)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 'var(--binge-lh-display)',
            margin: 0,
            letterSpacing: '-0.025em',
          }}>
            {t('finalHeading')}
          </h2>

          <p data-binge-reveal style={{
            fontFamily: 'var(--binge-font)',
            fontSize: 'var(--binge-size-body-lg)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 'var(--binge-lh-body)',
            margin: 0,
            maxWidth: '480px',
          }}>
            {copy.body}
          </p>

          <div data-binge-reveal style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/request-a-quote" style={{
              backgroundColor: 'var(--binge-orange)',
              color: '#fff',
              fontFamily: 'var(--binge-font)',
              fontWeight: 700,
              fontSize: 'var(--binge-size-button)',
              letterSpacing: 'var(--binge-tracking-button)',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '0 32px',
              height: '48px',
              display: 'inline-flex',
              alignItems: 'center',
              borderRadius: 0,
            }}>
              {copy.quote}
            </Link>
            <a href="mailto:info@bingeskirtingboard.com?subject=Sample Request" style={{
              backgroundColor: 'transparent',
              color: '#fff',
              fontFamily: 'var(--binge-font)',
              fontWeight: 700,
              fontSize: 'var(--binge-size-button)',
              letterSpacing: 'var(--binge-tracking-button)',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '0 32px',
              height: '48px',
              display: 'inline-flex',
              alignItems: 'center',
              borderRadius: 0,
              border: '1px solid rgba(255,255,255,0.3)',
            }}>
              {copy.sample}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
