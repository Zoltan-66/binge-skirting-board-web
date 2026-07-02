"use client";

import { Link } from '@/lib/router-compat';

const PRODUCTS = [
  {
    id: 1,
    category: 'Surface-Mounted Aluminium',
    desc: 'Clip-on profiles for clean, precise wall-to-floor transitions.',
    img: '/images/products/as-flat-face.jpg',
    alt: 'Flat-face aluminium skirting product family',
    slug: '/products/aluminum-skirting',
  },
  {
    id: 2,
    category: 'Recessed & Shadow Gap',
    desc: 'Invisible skirting systems that create sharp architectural shadow lines.',
    img: '/images/products/rs-seamless.jpg',
    alt: 'Seamless recessed aluminium skirting product',
    slug: '/products',
  },
  {
    id: 3,
    category: 'LED Skirting Systems',
    desc: 'Integrated LED channels for ambient and accent lighting at floor level.',
    img: '/images/products/rs-led.jpg',
    alt: 'Recessed aluminium skirting with integrated LED lighting',
    slug: '/products',
  },
  {
    id: 4,
    category: 'Solid Wood Skirting',
    desc: 'Engineered and solid timber boards with concealed clip systems.',
    img: '/images/products/ws-tg-scene.jpg',
    alt: 'TG clip-on solid wood skirting installation system',
    slug: '/products/tg-clip-on-solid-wood-skirting-system',
  },
  {
    id: 5,
    category: 'Stainless Steel Skirting',
    desc: 'Stainless steel skirting families in several heights and finishes.',
    img: '/images/products/ss-201-new.jpg',
    alt: 'Stainless steel skirting product range',
    slug: '/products',
  },
  {
    id: 6,
    category: 'Trims & Finishing Profiles',
    desc: 'Transition strips, edge trims and architectural finishing details.',
    img: '/images/products/tr-tu-transition.jpg',
    alt: 'T-shaped aluminium transition trim',
    slug: '/products',
  },
];

const exploreLinkStyle: React.CSSProperties = {
  fontFamily: 'var(--binge-font)',
  fontSize: 'var(--binge-size-label)',
  fontWeight: 700,
  color: 'var(--binge-orange)',
  letterSpacing: 'var(--binge-tracking-label)',
  textTransform: 'uppercase',
  textDecoration: 'none',
};

export function ProductGrid() {
  return (
    <section id="products" style={{ backgroundColor: 'var(--binge-white)' }}>
      <div style={{
        maxWidth: 'var(--binge-content-max)',
        margin: '0 auto',
        padding: 'var(--binge-section-v) var(--binge-pad-h)',
      }}>
        {/* ── Section header ── */}
        <div style={{ marginBottom: '56px' }}>
          <span style={{
            fontFamily: 'var(--binge-font)',
            fontSize: 'var(--binge-size-label)',
            fontWeight: 700,
            color: 'var(--binge-orange)',
            letterSpacing: 'var(--binge-tracking-label)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '16px',
          }}>
            Product Systems
          </span>
          <h2 style={{
            fontFamily: 'var(--binge-font)',
            fontSize: 'var(--binge-size-display-lg)',
            fontWeight: 700,
            color: 'var(--binge-text-primary)',
            lineHeight: 'var(--binge-lh-display)',
            margin: 0,
            letterSpacing: '-0.025em',
          }}>
            One manufacturing partner.<br />
            Multiple architectural solutions.
          </h2>
        </div>

        {/* ── Card grid — hairline-separated ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '1px', backgroundColor: 'var(--binge-border)' }}
        >
          {PRODUCTS.map(p => (
            <div
              key={p.id}
              className="group"
              style={{ backgroundColor: 'var(--binge-white)' }}
            >
              {/* Photo */}
              <div style={{ overflow: 'hidden', aspectRatio: '4 / 3' }}>
                <img
                  src={p.img}
                  alt={p.alt}
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

              {/* Card body */}
              <div style={{ padding: 'clamp(16px, 4vw, 28px)', backgroundColor: 'var(--binge-card-bg)' }}>
                <h3 style={{
                  fontFamily: 'var(--binge-font)',
                  fontSize: 'var(--binge-size-title-md)',
                  fontWeight: 700,
                  color: 'var(--binge-text-primary)',
                  margin: '0 0 10px',
                  lineHeight: 1.25,
                }}>
                  {p.category}
                </h3>
                <p style={{
                  fontFamily: 'var(--binge-font)',
                  fontSize: 'var(--binge-size-body)',
                  fontWeight: 300,
                  color: 'var(--binge-text-body)',
                  lineHeight: 'var(--binge-lh-body)',
                  margin: '0 0 20px',
                }}>
                  {p.desc}
                </p>
                <Link to={p.slug} style={exploreLinkStyle}>Explore System ›</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
