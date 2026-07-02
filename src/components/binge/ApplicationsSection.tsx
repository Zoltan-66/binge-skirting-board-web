"use client";

import { useRef } from 'react';
import { useBingeSectionMotion } from './useBingeSectionMotion';
import { useI18n } from '@/lib/i18n';

const APPLICATIONS = [
  {
    id: 1,
    label: 'Residential',
    desc: 'Premium apartments, houses and residential developments across all specification tiers.',
    img: 'https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=800&q=80&fit=crop',
    alt: 'Modern minimal living room with architectural interior design',
  },
  {
    id: 2,
    label: 'Hospitality',
    desc: 'Hotels, resorts, restaurants and premium guest-facing environments.',
    img: 'https://images.unsplash.com/photo-1692153142524-60285a93c249?w=800&q=80&fit=crop',
    alt: 'Elegant hotel interior with refined architectural detailing',
  },
  {
    id: 3,
    label: 'Workplace',
    desc: 'Commercial offices, co-working spaces and corporate interior fit-outs.',
    img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80&fit=crop',
    alt: 'Modern open-plan office with clean architectural interior',
  },
  {
    id: 4,
    label: 'Healthcare & Commercial',
    desc: 'Hospitals, clinics, retail and high-traffic commercial buildings.',
    img: 'https://images.unsplash.com/photo-1558959356-2f36c7322d3b?w=800&q=80&fit=crop',
    alt: 'Clean commercial building interior with architectural staircase detail',
  },
];

export function ApplicationsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { locale } = useI18n();
  const sectionCopy = {
    en: { label: 'Applications', heading: 'Made for residential and commercial interiors.' },
    zh: { label: '应用场景', heading: '为住宅与商业室内空间而设计。' },
    de: { label: 'Anwendungen', heading: 'Für Wohn- und Gewerbeinnenräume entwickelt.' },
    es: { label: 'Aplicaciones', heading: 'Diseñado para interiores residenciales y comerciales.' },
    fr: { label: 'Applications', heading: 'Conçu pour les intérieurs résidentiels et commerciaux.' },
  }[locale];
  const translatedCards = {
    zh: [['住宅空间', '适用于不同定位的高端公寓、住宅与居住开发项目。'], ['酒店与餐饮', '适用于酒店、度假村、餐厅及高品质宾客空间。'], ['办公空间', '适用于商业办公室、共享办公及企业室内装修。'], ['医疗与商业', '适用于医院、诊所、零售及高人流商业建筑。']],
    de: [['Wohnen', 'Premiumwohnungen, Häuser und Wohnprojekte für alle Spezifikationsstufen.'], ['Hotellerie', 'Hotels, Resorts, Restaurants und hochwertige Gästebereiche.'], ['Arbeitswelten', 'Büros, Coworking-Flächen und gewerblicher Innenausbau.'], ['Gesundheit & Gewerbe', 'Kliniken, Einzelhandel und stark frequentierte Gewerbebauten.']],
    es: [['Residencial', 'Apartamentos, viviendas y promociones residenciales de alta calidad.'], ['Hostelería', 'Hoteles, complejos turísticos, restaurantes y espacios premium para huéspedes.'], ['Espacios de trabajo', 'Oficinas, coworking e interiores corporativos.'], ['Salud y comercio', 'Hospitales, clínicas, comercios y edificios de alto tránsito.']],
    fr: [['Résidentiel', 'Appartements, maisons et programmes résidentiels haut de gamme.'], ['Hôtellerie', 'Hôtels, complexes, restaurants et espaces d’accueil premium.'], ['Espaces de travail', 'Bureaux, coworking et aménagements intérieurs d’entreprise.'], ['Santé et commerce', 'Hôpitaux, cliniques, commerces et bâtiments à forte fréquentation.']],
  } as const;
  const applications = locale === 'en' ? APPLICATIONS : APPLICATIONS.map((app, index) => ({ ...app, label: translatedCards[locale][index][0], desc: translatedCards[locale][index][1] }));
  useBingeSectionMotion(sectionRef);

  return (
    <section ref={sectionRef} style={{ backgroundColor: 'var(--binge-warm-bg)' }}>
      <div style={{
        maxWidth: 'var(--binge-content-max)',
        margin: '0 auto',
        padding: 'var(--binge-section-v) var(--binge-pad-h)',
      }}>
        {/* ── Section header ── */}
        <div style={{ marginBottom: '56px' }}>
          <span data-binge-reveal style={{
            fontFamily: 'var(--binge-font)',
            fontSize: 'var(--binge-size-label)',
            fontWeight: 700,
            color: 'var(--binge-orange)',
            letterSpacing: 'var(--binge-tracking-label)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '16px',
          }}>
            {sectionCopy.label}
          </span>
          <h2 data-binge-reveal style={{
            fontFamily: 'var(--binge-font)',
            fontSize: 'var(--binge-size-display-md)',
            fontWeight: 700,
            color: 'var(--binge-text-primary)',
            lineHeight: 'var(--binge-lh-display)',
            margin: 0,
            letterSpacing: '-0.025em',
          }}>
            {sectionCopy.heading}
          </h2>
        </div>

        {/* ── 4-col image blocks — labels ALWAYS below the image ── */}
        {/* 2-col on mobile (compact portrait blocks), 4-col on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {applications.map(app => (
            <div key={app.id} className="group" data-binge-card>
              {/* Image — label always below, never over */}
              <div data-binge-media style={{ overflow: 'hidden', aspectRatio: '2 / 3', marginBottom: '14px' }}>
                <img
                  src={app.img}
                  alt={app.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.45s ease',
                  }}
                  className="group-hover:scale-105"
                />
              </div>

              {/* Label and description — fully separate from the image */}
              <h3 style={{
                fontFamily: 'var(--binge-font)',
                fontSize: 'var(--binge-size-title-lg)',
                fontWeight: 700,
                color: 'var(--binge-text-primary)',
                margin: '0 0 8px',
              }}>
                {app.label}
              </h3>
              <p style={{
                fontFamily: 'var(--binge-font)',
                fontSize: 'var(--binge-size-body)',
                fontWeight: 300,
                color: 'var(--binge-text-body)',
                lineHeight: 'var(--binge-lh-body)',
                margin: 0,
              }}>
                {app.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
