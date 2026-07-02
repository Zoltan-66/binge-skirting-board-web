"use client";

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
  return (
    <section id="factory" style={{ backgroundColor: 'var(--binge-dark)', overflow: 'hidden' }}>
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
            <span style={{
              fontFamily: 'var(--binge-font)',
              fontSize: 'var(--binge-size-label)',
              fontWeight: 700,
              color: 'var(--binge-orange)',
              letterSpacing: 'var(--binge-tracking-label)',
              textTransform: 'uppercase',
            }}>
              OEM / ODM Capability
            </span>

            <h2 style={{
              fontFamily: 'var(--binge-font)',
              fontSize: 'var(--binge-size-display-md)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 'var(--binge-lh-heading)',
              margin: 0,
              letterSpacing: '-0.02em',
            }}>
              Built for your market,<br />
              brand and project.
            </h2>

            <p style={{
              fontFamily: 'var(--binge-font)',
              fontSize: 'var(--binge-size-body-lg)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 'var(--binge-lh-body)',
              margin: 0,
            }}>
              Our Zhejiang factory works directly with importers, distributors and
              architects to develop exclusive profiles, custom finishes and
              private-label product ranges.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {CAPABILITIES.map((c, i) => (
                <li key={i} style={{
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

            <div>
              <a href="/oem-odm" style={solidOrangeBtn}>Start a Custom Project</a>
            </div>
          </div>

          {/* ── Factory photograph — always visible, never under text ──
               Mobile: 260px below text. Desktop: fills full right column. */}
          <div style={{ position: 'relative', overflow: 'hidden', minHeight: '260px' }}>
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
