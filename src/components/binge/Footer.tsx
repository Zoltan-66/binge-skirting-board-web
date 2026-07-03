"use client";

import { localizeHref, useI18n } from '@/lib/i18n';

const WHATSAPP_LABEL = '+44 7879 937232';
const WHATSAPP_HREF = 'https://wa.me/447879937232';
const CONTACT_EMAIL = 'info@bingeskirtingboard.com';

const COLUMNS = [
  {
    heading: 'Products',
    links: [
      'Aluminium Skirting',
      'Recessed Systems',
      'LED Systems',
      'Solid Wood',
      'Stainless Steel',
      'Trims & Profiles',
    ],
  },
  {
    heading: 'Resources',
    links: [
      'Product Catalogue',
      'Technical Drawings',
      'Installation Guides',
      'Test Reports',
    ],
  },
  {
    heading: 'Company',
    links: [
      'About Factory',
      'OEM / ODM',
      'Applications',
      'Contact',
    ],
  },
  {
    heading: 'Contact',
    links: [
      'Zhejiang, China',
      CONTACT_EMAIL,
      WHATSAPP_LABEL,
      'Mon–Fri, 09:00–18:00 CST',
    ],
  },
];

const colHeadStyle: React.CSSProperties = {
  fontFamily: 'var(--binge-font)',
  fontSize: 'var(--binge-size-label)',
  fontWeight: 700,
  color: 'var(--binge-text-primary)',
  letterSpacing: 'var(--binge-tracking-label)',
  textTransform: 'uppercase',
  marginBottom: '20px',
  display: 'block',
};

const footLinkStyle: React.CSSProperties = {
  fontFamily: 'var(--binge-font)',
  fontSize: 'var(--binge-size-body)',
  fontWeight: 300,
  color: 'var(--binge-text-body)',
  textDecoration: 'none',
  lineHeight: 1.5,
};

const footerHref = (label: string) => {
  const routes: Record<string, string> = {
    'Aluminium Skirting': '/products/aluminum-skirting',
    'Recessed Systems': '/products',
    'LED Systems': '/products',
    'Solid Wood': '/products/tg-clip-on-solid-wood-skirting-system',
    'Stainless Steel': '/products',
    'Trims & Profiles': '/products',
    'Product Catalogue': '/downloads',
    'Technical Drawings': '/downloads',
    'Installation Guides': '/downloads',
    'Test Reports': '/downloads',
    'About Factory': '/oem-odm#factory',
    'OEM / ODM': '/oem-odm',
    'Applications': '/applications',
    'Contact': '/request-a-quote',
    'Zhejiang, China': '/oem-odm#factory',
    [CONTACT_EMAIL]: `mailto:${CONTACT_EMAIL}`,
    [WHATSAPP_LABEL]: WHATSAPP_HREF,
    'Mon–Fri, 09:00–18:00 CST': '/request-a-quote',
  };
  return routes[label] ?? '/';
};

export function Footer() {
  const { locale } = useI18n();
  const translations: Partial<Record<typeof locale, Record<string, string>>> = {
    zh: { Products: '产品', Resources: '资料', Company: '公司', Contact: '联系', 'Aluminium Skirting': '铝合金踢脚线', 'Recessed Systems': '嵌入式系统', 'LED Systems': 'LED 系统', 'Solid Wood': '实木踢脚线', 'Stainless Steel': '不锈钢踢脚线', 'Trims & Profiles': '收边条与型材', 'Product Catalogue': '产品目录', 'Technical Drawings': '技术图纸', 'Installation Guides': '安装指南', 'Test Reports': '测试报告', 'About Factory': '工厂介绍', Applications: '应用场景', 'Zhejiang, China': '中国浙江' },
    de: { Products: 'Produkte', Resources: 'Unterlagen', Company: 'Unternehmen', Contact: 'Kontakt', 'Aluminium Skirting': 'Aluminium-Sockelleisten', 'Recessed Systems': 'Einbausysteme', 'LED Systems': 'LED-Systeme', 'Solid Wood': 'Massivholz', 'Stainless Steel': 'Edelstahl', 'Trims & Profiles': 'Abschluss- & Profilsysteme', 'Product Catalogue': 'Produktkatalog', 'Technical Drawings': 'Technische Zeichnungen', 'Installation Guides': 'Montageanleitungen', 'Test Reports': 'Prüfberichte', 'About Factory': 'Über das Werk', Applications: 'Anwendungen' },
    es: { Products: 'Productos', Resources: 'Recursos', Company: 'Empresa', Contact: 'Contacto', 'Aluminium Skirting': 'Rodapiés de aluminio', 'Recessed Systems': 'Sistemas empotrados', 'LED Systems': 'Sistemas LED', 'Solid Wood': 'Madera maciza', 'Stainless Steel': 'Acero inoxidable', 'Trims & Profiles': 'Remates y perfiles', 'Product Catalogue': 'Catálogo de productos', 'Technical Drawings': 'Planos técnicos', 'Installation Guides': 'Guías de instalación', 'Test Reports': 'Informes de ensayo', 'About Factory': 'Nuestra fábrica', Applications: 'Aplicaciones' },
    fr: { Products: 'Produits', Resources: 'Ressources', Company: 'Entreprise', Contact: 'Contact', 'Aluminium Skirting': 'Plinthes aluminium', 'Recessed Systems': 'Systèmes encastrés', 'LED Systems': 'Systèmes LED', 'Solid Wood': 'Bois massif', 'Stainless Steel': 'Acier inoxydable', 'Trims & Profiles': 'Finitions et profilés', 'Product Catalogue': 'Catalogue produits', 'Technical Drawings': 'Plans techniques', 'Installation Guides': 'Guides de pose', 'Test Reports': 'Rapports d’essai', 'About Factory': 'Notre usine', Applications: 'Applications' },
  };
  const label = (value: string) => translations[locale]?.[value] ?? value;
  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Use', href: '/terms-of-use' },
    { label: 'Cookie Settings', href: '/cookie-settings' },
  ];
  const legalLabel = (value: string) => {
    if (locale !== 'zh') return value;
    return ({ 'Privacy Policy': '隐私政策', 'Terms of Use': '使用条款', 'Cookie Settings': 'Cookie 设置' }[value] ?? value);
  };
  const footerCopy = {
    en: { tagline: 'Profiles Made for Modern Interiors. — Manufactured in Zhejiang, China.', quote: 'Request a Quote', legal: '© 2026 BINGE Architectural Profile Systems. All rights reserved.' },
    zh: { tagline: '为现代室内空间打造型材。— 中国浙江制造。', quote: '获取报价', legal: '© 2026 BINGE 建筑型材系统。保留所有权利。' },
    de: { tagline: 'Profile für moderne Innenräume. — Hergestellt in Zhejiang, China.', quote: 'Angebot anfordern', legal: '© 2026 BINGE Architektonische Profilsysteme. Alle Rechte vorbehalten.' },
    es: { tagline: 'Perfiles para interiores modernos. — Fabricado en Zhejiang, China.', quote: 'Solicitar presupuesto', legal: '© 2026 BINGE Sistemas de perfiles arquitectónicos. Todos los derechos reservados.' },
    fr: { tagline: 'Des profilés pour les intérieurs modernes. — Fabriqués dans le Zhejiang, en Chine.', quote: 'Demander un devis', legal: '© 2026 BINGE Systèmes de profilés architecturaux. Tous droits réservés.' },
  }[locale];
  return (
    <footer style={{
      backgroundColor: 'var(--binge-warm-bg)',
      borderTop: '1px solid var(--binge-border)',
    }}>
      <div style={{
        maxWidth: 'var(--binge-content-max)',
        margin: '0 auto',
        padding: '64px var(--binge-pad-h)',
      }}>
        {/* ── Logo + tagline ── */}
        <div style={{
          marginBottom: '48px',
          paddingBottom: '48px',
          borderBottom: '1px solid var(--binge-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '24px',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--binge-font)',
              fontSize: '22px',
              fontWeight: 700,
              color: 'var(--binge-text-primary)',
              letterSpacing: '-0.01em',
              marginBottom: '6px',
            }}>
              BINGE
            </div>
            <div style={{
              fontFamily: 'var(--binge-font)',
              fontSize: 'var(--binge-size-body)',
              fontWeight: 300,
              color: 'var(--binge-text-muted)',
            }}>
              {footerCopy.tagline}
            </div>
          </div>

          <a href={localizeHref('/request-a-quote', locale, true)} style={{
            backgroundColor: 'var(--binge-orange)',
            color: '#fff',
            fontFamily: 'var(--binge-font)',
            fontWeight: 700,
            fontSize: 'var(--binge-size-button)',
            letterSpacing: 'var(--binge-tracking-button)',
            textTransform: 'uppercase',
            textDecoration: 'none',
            padding: '0 24px',
            height: '44px',
            display: 'inline-flex',
            alignItems: 'center',
            borderRadius: 0,
            flexShrink: 0,
          }}>
            {footerCopy.quote}
          </a>
        </div>

        {/* ── 4-column link grid ── */}
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: '40px', marginBottom: '48px' }}
        >
          {COLUMNS.map(col => (
            <div key={col.heading}>
              <span style={colHeadStyle}>{label(col.heading)}</span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map((link, i) => (
                  <li key={i}>
                    <a href={localizeHref(footerHref(link), locale, true)} style={footLinkStyle}
                      onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--binge-text-primary)')}
                      onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--binge-text-body)')}
                    >
                      {label(link)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          borderTop: '1px solid var(--binge-border)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <span style={{
            fontFamily: 'var(--binge-font)',
            fontSize: 'var(--binge-size-caption)',
            fontWeight: 400,
            color: 'var(--binge-text-muted)',
          }}>
            {footerCopy.legal}
          </span>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {legalLinks.map(link => (
              <a key={link.href} href={localizeHref(link.href, locale, true)} style={{
                fontFamily: 'var(--binge-font)',
                fontSize: 'var(--binge-size-caption)',
                fontWeight: 400,
                color: 'var(--binge-text-muted)',
                textDecoration: 'none',
              }}>
                {legalLabel(link.label)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
