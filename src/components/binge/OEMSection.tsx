"use client";

import { useRef } from 'react';
import { useBingeSectionMotion } from './useBingeSectionMotion';
import { useI18n } from '@/lib/i18n';
import { Link } from '@/lib/router-compat';

/*
 * OEMSection stacks on mobile: text → factory photograph.
 * On desktop: dark split — text left, factory photograph right.
 * Text is NEVER placed over the photograph.
 */

const CAPABILITIES = [
  'Custom profile development and tooling',
  'Bespoke cross-sections, lengths and dimensions',
  'Surface finish development — anodise, powder coat, timber veneer',
  'Private-label packaging and OEM product branding',
  'Samples and full technical drawings on request',
  'Export packaging support for all major markets',
];

const solidOrangeBtn: React.CSSProperties = {
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
};

export function OEMSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { locale } = useI18n();
  const copy = {
    en: { label: 'OEM / ODM Capability', title: 'Built for your market, brand and project.', body: 'Our Zhejiang factory works directly with importers, distributors and architects to develop exclusive profiles, custom finishes and private-label product ranges.', cta: 'Start a Custom Project' },
    zh: { label: 'OEM / ODM 能力', title: '为您的市场、品牌与项目定制。', body: '我们的浙江工厂直接与进口商、经销商和建筑师合作，开发专属型材、定制表面处理和自有品牌产品系列。', cta: '开始定制项目' },
    de: { label: 'OEM-/ODM-Kompetenz', title: 'Für Ihren Markt, Ihre Marke und Ihr Projekt.', body: 'Unser Werk in Zhejiang entwickelt gemeinsam mit Importeuren, Händlern und Architekten exklusive Profile, Oberflächen und Private-Label-Sortimente.', cta: 'Individuelles Projekt starten' },
    es: { label: 'Capacidad OEM / ODM', title: 'Creado para su mercado, marca y proyecto.', body: 'Nuestra fábrica de Zhejiang trabaja con importadores, distribuidores y arquitectos para desarrollar perfiles exclusivos, acabados personalizados y gamas de marca privada.', cta: 'Iniciar un proyecto personalizado' },
    fr: { label: 'Capacités OEM / ODM', title: 'Conçu pour votre marché, votre marque et votre projet.', body: 'Notre usine du Zhejiang collabore avec importateurs, distributeurs et architectes pour développer des profilés exclusifs, des finitions sur mesure et des gammes en marque blanche.', cta: 'Démarrer un projet sur mesure' },
  }[locale];
  const capabilitiesByLocale = {
    zh: ['定制型材开发与模具制造', '定制截面、长度与尺寸', '阳极氧化、粉末喷涂及木饰面开发', '私有品牌包装与 OEM 产品标识', '按需提供样品与完整技术图纸', '支持主要出口市场包装要求'],
    de: ['Individuelle Profil- und Werkzeugentwicklung', 'Sonderquerschnitte, Längen und Abmessungen', 'Entwicklung von Eloxal-, Pulverbeschichtungs- und Holzoberflächen', 'Private-Label-Verpackung und OEM-Kennzeichnung', 'Muster und technische Zeichnungen auf Anfrage', 'Exportverpackungen für wichtige Märkte'],
    es: ['Desarrollo de perfiles y utillajes personalizados', 'Secciones, longitudes y dimensiones a medida', 'Desarrollo de acabados anodizados, lacados y de madera', 'Embalaje de marca privada e identidad OEM', 'Muestras y planos técnicos bajo solicitud', 'Embalaje de exportación para los principales mercados'],
    fr: ['Développement de profilés et d’outillages sur mesure', 'Sections, longueurs et dimensions personnalisées', 'Développement de finitions anodisées, thermolaquées et bois', 'Emballage en marque blanche et identité OEM', 'Échantillons et plans techniques sur demande', 'Emballage export pour les principaux marchés'],
  } as const;
  const capabilities = locale === 'en' ? CAPABILITIES : capabilitiesByLocale[locale];
  useBingeSectionMotion(sectionRef);

  return (
    <section ref={sectionRef} id="factory" style={{ backgroundColor: 'var(--binge-dark)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto' }}>

        {/* ── Stacks on mobile, side-by-side on lg ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[560px]">

          {/* Text panel */}
          <div style={{
            padding: 'var(--binge-section-v) var(--binge-pad-h)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '28px',
          }}>
            <span data-binge-reveal style={{
              fontFamily: 'var(--binge-font)',
              fontSize: 'var(--binge-size-label)',
              fontWeight: 700,
              color: 'var(--binge-orange)',
              letterSpacing: 'var(--binge-tracking-label)',
              textTransform: 'uppercase',
            }}>
              {copy.label}
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
              {copy.title}
            </h2>

            <p data-binge-reveal style={{
              fontFamily: 'var(--binge-font)',
              fontSize: 'var(--binge-size-body-lg)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 'var(--binge-lh-body)',
              margin: 0,
            }}>
              {copy.body}
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {capabilities.map((c, i) => (
                <li key={i} data-binge-reveal style={{
                  fontFamily: 'var(--binge-font)',
                  fontSize: 'var(--binge-size-body)',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.55,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}>
                  <span style={{ color: 'var(--binge-orange)', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>—</span>
                  {c}
                </li>
              ))}
            </ul>

            <div data-binge-reveal>
              <Link to="/oem-odm" style={solidOrangeBtn}>{copy.cta}</Link>
            </div>
          </div>

          {/* ── Factory photograph — always visible, never under text ──
               Mobile: 260px below text. Desktop: fills full right column. */}
          <div data-binge-media style={{ position: 'relative', overflow: 'hidden', minHeight: '260px' }}>
            <img
              src="https://images.unsplash.com/photo-1717386255773-1e3037c81788?w=1080&q=80&fit=crop"
              alt="Precision manufacturing facility — large-scale production equipment"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(23,27,32,0.2)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
