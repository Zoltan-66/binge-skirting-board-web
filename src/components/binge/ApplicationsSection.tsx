"use client";

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
  return (
    <section style={{ backgroundColor: 'var(--binge-warm-bg)' }}>
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
            Applications
          </span>
          <h2 style={{
            fontFamily: 'var(--binge-font)',
            fontSize: 'var(--binge-size-display-md)',
            fontWeight: 700,
            color: 'var(--binge-text-primary)',
            lineHeight: 'var(--binge-lh-display)',
            margin: 0,
            letterSpacing: '-0.025em',
          }}>
            Made for residential and commercial interiors.
          </h2>
        </div>

        {/* ── 4-col image blocks — labels ALWAYS below the image ── */}
        {/* 2-col on mobile (compact portrait blocks), 4-col on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {APPLICATIONS.map(app => (
            <div key={app.id} className="group">
              {/* Image — label always below, never over */}
              <div style={{ overflow: 'hidden', aspectRatio: '2 / 3', marginBottom: '14px' }}>
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
