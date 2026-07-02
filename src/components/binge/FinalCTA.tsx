"use client";

export function FinalCTA() {
  return (
    <section id="quote">
      {/* ── Full-width photograph band — NO text placed over it ── */}
      <div style={{ position: 'relative', height: 'clamp(200px, 40vw, 420px)', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1628744876497-eb30460be9f6?w=1920&q=80&fit=crop"
          alt="Premium minimal interior — architectural wall-to-floor detail"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* ── Dark text panel — entirely separate from the photograph ── */}
      <div style={{ backgroundColor: 'var(--binge-dark)' }}>
        <div style={{
          maxWidth: 'var(--binge-content-max)',
          margin: '0 auto',
          padding: '80px var(--binge-pad-h)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '24px',
        }}>
          <h2 style={{
            fontFamily: 'var(--binge-font)',
            fontSize: 'var(--binge-size-display-lg)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 'var(--binge-lh-display)',
            margin: 0,
            letterSpacing: '-0.025em',
          }}>
            Tell us what your project needs.
          </h2>

          <p style={{
            fontFamily: 'var(--binge-font)',
            fontSize: 'var(--binge-size-body-lg)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 'var(--binge-lh-body)',
            margin: 0,
            maxWidth: '480px',
          }}>
            Our technical team works directly with architects, distributors and project
            managers to find the right profile for every application and specification.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="/request-a-quote" style={{
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
              Request a Quote
            </a>
            <a href="mailto:samples@binge-profiles.com" style={{
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
              Request a Sample
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
