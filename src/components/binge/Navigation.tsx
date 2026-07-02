"use client";

import { useEffect, useState } from 'react';
import { NavLink, Link } from '@/lib/router-compat';
import { Menu, X, Search, Globe, ChevronRight } from 'lucide-react';

const NAV_LINKS = ['Products', 'Applications', 'OEM / ODM', 'Downloads', 'About'];

const linkStyle: React.CSSProperties = {
  fontFamily: 'var(--binge-font)',
  fontSize: 'var(--binge-size-label)',
  fontWeight: 400,
  color: 'var(--binge-text-body)',
  letterSpacing: '0.03em',
  textDecoration: 'none',
  transition: 'color 0.15s',
};

const orangeBtn: React.CSSProperties = {
  backgroundColor: 'var(--binge-orange)',
  color: '#fff',
  fontFamily: 'var(--binge-font)',
  fontWeight: 700,
  fontSize: 'var(--binge-size-button)',
  letterSpacing: 'var(--binge-tracking-button)',
  textTransform: 'uppercase' as const,
  textDecoration: 'none',
  padding: '0 20px',
  height: '40px',
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: 0,
  border: 'none',
  cursor: 'pointer',
  whiteSpace: 'nowrap' as const,
};

export function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--binge-white)',
        borderBottom: '1px solid var(--binge-border)',
        height: 'var(--binge-nav-h)',
      }}>
        <div style={{
          maxWidth: 'var(--binge-content-max)',
          margin: '0 auto',
          padding: '0 var(--binge-pad-h)',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}>
          {/* ── Wordmark ── */}
          <NavLink to="/" onClick={() => setOpen(false)} style={{
            fontFamily: 'var(--binge-font)',
            fontWeight: 700,
            fontSize: '20px',
            color: 'var(--binge-text-primary)',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
            flexShrink: 0,
          }}>
            BINGE
          </NavLink>

          {/* ── Desktop nav ── */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {NAV_LINKS.map(l => {
              const ROUTES: Record<string, string> = {
                'Products':     '/products',
                'Applications': '/applications',
                'OEM / ODM':    '/oem-odm',
                'Downloads':    '/downloads',
                'About':        '/oem-odm#factory',
              };
              const to = ROUTES[l];
              return to ? (
                <NavLink
                  key={l}
                  to={to}
                  style={({ isActive }) => ({
                    ...linkStyle,
                    color: isActive ? 'var(--binge-orange)' : 'var(--binge-text-body)',
                    fontWeight: isActive ? 700 : 400,
                  })}
                >
                  {l}
                </NavLink>
              ) : (
                <a
                  key={l}
                  href="#"
                  style={linkStyle}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--binge-text-primary)')}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--binge-text-body)')}
                >
                  {l}
                </a>
              );
            })}
          </div>

          {/* ── Desktop actions ── */}
          <div className="hidden lg:flex items-center gap-1 flex-shrink-0">
            <button style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--binge-text-muted)', padding: '8px',
              display: 'flex', alignItems: 'center',
            }} aria-label="Select language">
              <Globe size={17} />
            </button>
            <button style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--binge-text-muted)', padding: '8px',
              display: 'flex', alignItems: 'center',
            }} aria-label="Search">
              <Search size={17} />
            </button>
            <Link to="/request-a-quote" style={{ ...orangeBtn, marginLeft: '12px' }}>
              Request a Quote
            </Link>
          </div>

          {/* ── Mobile hamburger — 48×48 touch target ── */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(o => !o)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--binge-text-primary)',
              /* 48×48 touch target per WCAG */
              minWidth: '48px',
              minHeight: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '-12px',
            }}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Full-screen mobile menu ── */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--binge-nav-h)',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--binge-white)',
            zIndex: 49,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          {/* Orange brand rule at top */}
          <div style={{ height: '3px', backgroundColor: 'var(--binge-orange)', flexShrink: 0 }} />

          {/* Nav links — 48px min touch targets */}
          <nav style={{ flex: 1 }}>
            {NAV_LINKS.map(l => {
              const mobileStyle = {
                fontFamily: 'var(--binge-font)',
                fontSize: '17px',
                fontWeight: 400,
                textDecoration: 'none',
                minHeight: '48px',
                padding: '0 24px',
                borderBottom: '1px solid var(--binge-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              };
              const ROUTES: Record<string, string> = {
                'Products':     '/products',
                'Applications': '/applications',
                'OEM / ODM':    '/oem-odm',
                'Downloads':    '/downloads',
                'About':        '/oem-odm#factory',
              };
              const to = ROUTES[l];
              return to ? (
                <NavLink
                  key={l}
                  to={to}
                  onClick={() => setOpen(false)}
                  style={({ isActive }) => ({
                    ...mobileStyle,
                    color: isActive ? 'var(--binge-orange)' : 'var(--binge-text-primary)',
                    fontWeight: isActive ? 700 : 400,
                  })}
                >
                  {l}
                  <ChevronRight size={16} style={{ color: 'var(--binge-text-muted)', flexShrink: 0 }} />
                </NavLink>
              ) : (
                <a
                  key={l}
                  href="#"
                  onClick={() => setOpen(false)}
                  style={{ ...mobileStyle, color: 'var(--binge-text-primary)' }}
                >
                  {l}
                  <ChevronRight size={16} style={{ color: 'var(--binge-text-muted)', flexShrink: 0 }} />
                </a>
              );
            })}
          </nav>

          {/* CTA area */}
          <div style={{
            padding: '24px',
            borderTop: '1px solid var(--binge-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            <Link
              to="/request-a-quote"
              onClick={() => setOpen(false)}
              style={{
                backgroundColor: 'var(--binge-orange)',
                color: '#fff',
                fontFamily: 'var(--binge-font)',
                fontWeight: 700,
                fontSize: 'var(--binge-size-button)',
                letterSpacing: 'var(--binge-tracking-button)',
                textTransform: 'uppercase',
                textDecoration: 'none',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 0,
              }}
            >
              Request a Quote
            </Link>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--binge-text-muted)', padding: '8px',
                display: 'flex', alignItems: 'center', gap: '6px',
                fontFamily: 'var(--binge-font)',
                fontSize: 'var(--binge-size-caption)',
                fontWeight: 400,
              }}>
                <Globe size={15} /> EN
              </button>
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--binge-text-muted)', padding: '8px',
                display: 'flex', alignItems: 'center', gap: '6px',
                fontFamily: 'var(--binge-font)',
                fontSize: 'var(--binge-size-caption)',
                fontWeight: 400,
              }}>
                <Search size={15} /> Search
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
