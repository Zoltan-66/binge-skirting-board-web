"use client";

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
      'info@binge-profiles.com',
      'WhatsApp on request',
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
    'info@binge-profiles.com': 'mailto:info@binge-profiles.com',
    'WhatsApp on request': 'mailto:info@binge-profiles.com?subject=WhatsApp Contact Request',
    'Mon–Fri, 09:00–18:00 CST': '/request-a-quote',
  };
  return routes[label] ?? '/';
};

export function Footer() {
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
              Profiles Made for Modern Interiors. — Manufactured in Zhejiang, China.
            </div>
          </div>

          <a href="/request-a-quote" style={{
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
            Request a Quote
          </a>
        </div>

        {/* ── 4-column link grid ── */}
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: '40px', marginBottom: '48px' }}
        >
          {COLUMNS.map(col => (
            <div key={col.heading}>
              <span style={colHeadStyle}>{col.heading}</span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map((link, i) => (
                  <li key={i}>
                    <a href={footerHref(link)} style={footLinkStyle}
                      onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--binge-text-primary)')}
                      onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--binge-text-body)')}
                    >
                      {link}
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
            © 2026 BINGE Architectural Profile Systems. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Use', 'Cookie Settings'].map(l => (
              <a key={l} href={`mailto:info@binge-profiles.com?subject=${encodeURIComponent(l)}`} style={{
                fontFamily: 'var(--binge-font)',
                fontSize: 'var(--binge-size-caption)',
                fontWeight: 400,
                color: 'var(--binge-text-muted)',
                textDecoration: 'none',
              }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
