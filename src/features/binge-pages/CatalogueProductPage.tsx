import { ArrowRight, Check, ChevronRight, FileText, PackageCheck } from 'lucide-react';
import { Link } from '@/lib/router-compat';
import { PRODUCT_CATALOGUE, type Product } from '@/data/product-catalogue';

const container: React.CSSProperties = {
  maxWidth: 'var(--binge-content-max)',
  margin: '0 auto',
  padding: 'var(--binge-section-v) var(--binge-pad-h)',
};

const label: React.CSSProperties = {
  fontFamily: 'var(--binge-font)',
  fontSize: 'var(--binge-size-label)',
  fontWeight: 700,
  color: 'var(--binge-orange)',
  letterSpacing: 'var(--binge-tracking-label)',
  textTransform: 'uppercase',
};

const primaryButton: React.CSSProperties = {
  height: 50,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  padding: '0 26px',
  color: '#fff',
  background: 'var(--binge-orange)',
  textDecoration: 'none',
  textTransform: 'uppercase',
  letterSpacing: 'var(--binge-tracking-button)',
  fontFamily: 'var(--binge-font)',
  fontSize: 'var(--binge-size-button)',
  fontWeight: 700,
};

function relatedProducts(product: Product) {
  const sameCategory = PRODUCT_CATALOGUE.filter(item => item.code !== product.code && item.category === product.category);
  const fallback = PRODUCT_CATALOGUE.filter(item => item.code !== product.code && item.material === product.material);
  return [...sameCategory, ...fallback]
    .filter((item, index, items) => items.findIndex(candidate => candidate.code === item.code) === index)
    .slice(0, 3);
}

export function CatalogueProductPage({ product }: { product: Product }) {
  const related = relatedProducts(product);
  const quoteHref = `/request-a-quote?product=${encodeURIComponent(product.code)}`;

  return (
    <>
      <div style={{ borderBottom: '1px solid var(--binge-border)', background: 'var(--binge-white)' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: '16px var(--binge-pad-h)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: 'var(--binge-text-muted)', textDecoration: 'none', fontSize: 'var(--binge-size-caption)' }}>Home</Link>
            <ChevronRight size={12} color="var(--binge-border)" />
            <Link to="/products" style={{ color: 'var(--binge-text-muted)', textDecoration: 'none', fontSize: 'var(--binge-size-caption)' }}>Products</Link>
            <ChevronRight size={12} color="var(--binge-border)" />
            <span style={{ color: 'var(--binge-text-primary)', fontSize: 'var(--binge-size-caption)' }}>{product.name}</span>
          </div>
        </div>
      </div>

      <section style={{ background: 'var(--binge-white)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ ...container, gap: 'clamp(36px, 7vw, 88px)', alignItems: 'center' }}>
          <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', background: 'var(--binge-card-bg)' }}>
            <img src={product.img} alt={product.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>

          <div>
            <span style={label}>{product.category} · {product.code}</span>
            <h1 style={{ margin: '18px 0 20px', color: 'var(--binge-text-primary)', fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-xl)', lineHeight: 'var(--binge-lh-display)', letterSpacing: '-0.03em' }}>
              {product.name}
            </h1>
            <p style={{ margin: '0 0 28px', color: 'var(--binge-text-body)', fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body-lg)', fontWeight: 300, lineHeight: 1.7 }}>
              {product.desc}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', borderTop: '1px solid var(--binge-border)', borderLeft: '1px solid var(--binge-border)', marginBottom: 28 }}>
              {[
                ['Material', product.material],
                ['Installation', product.installation],
                ['Applications', product.applications.join(', ')],
                ['Specifications', 'Confirmed per project'],
              ].map(([key, value]) => (
                <div key={key} style={{ padding: '16px 18px', borderRight: '1px solid var(--binge-border)', borderBottom: '1px solid var(--binge-border)' }}>
                  <span style={{ ...label, display: 'block', fontSize: 'var(--binge-size-caption)', marginBottom: 6 }}>{key}</span>
                  <span style={{ color: 'var(--binge-text-primary)', fontSize: 'var(--binge-size-body)', lineHeight: 1.45 }}>{value}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to={quoteHref} style={primaryButton}>Request a quote <ArrowRight size={16} /></Link>
              <Link to="/downloads" style={{ ...primaryButton, color: 'var(--binge-text-primary)', background: 'transparent', border: '1px solid var(--binge-border)' }}>
                Technical documents <FileText size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--binge-dark)', color: '#fff' }}>
        <div style={container}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 'clamp(36px, 8vw, 100px)', alignItems: 'start' }}>
            <div>
              <span style={label}>Specification approach</span>
              <h2 style={{ margin: '18px 0 18px', fontSize: 'var(--binge-size-display-lg)', lineHeight: 'var(--binge-lh-display)', letterSpacing: '-0.025em' }}>
                Project-ready information, confirmed before quotation.
              </h2>
              <p style={{ margin: 0, maxWidth: 620, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, fontWeight: 300 }}>
                Exact dimensions, lengths, finishes, accessories, packing and compliance documents are matched to the selected factory configuration. This prevents provisional catalogue information from being mistaken for an approved project specification.
              </p>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.18)' }}>
              {['Profile drawing and dimensions', 'Available finishes and accessories', 'Packing, MOQ and production lead time', 'Current test reports and compliance documents'].map(item => (
                <div key={item} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.18)' }}>
                  <Check size={17} color="var(--binge-orange)" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--binge-warm-bg)' }}>
        <div style={container}>
          <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 40 }}>
            <div>
              <span style={label}>Related products</span>
              <h2 style={{ margin: '14px 0 0', color: 'var(--binge-text-primary)', fontSize: 'var(--binge-size-display-lg)', lineHeight: 'var(--binge-lh-display)' }}>Explore the same product family.</h2>
            </div>
            <Link to="/products" style={{ ...label, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>View all products <ArrowRight size={14} /></Link>
          </div>
          {related.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 1, background: 'var(--binge-border)' }}>
              {related.map(item => (
                <Link key={item.code} to={`/products/${item.slug}`} style={{ color: 'inherit', textDecoration: 'none', background: 'var(--binge-white)' }}>
                  <div style={{ aspectRatio: '4 / 3', overflow: 'hidden' }}><img src={item.img} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>
                  <div style={{ padding: 24 }}>
                    <span style={label}>{item.code}</span>
                    <h3 style={{ margin: '10px 0 0', fontSize: 'var(--binge-size-title-md)', lineHeight: 1.3 }}>{item.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ padding: 32, background: 'var(--binge-white)', display: 'flex', gap: 14, alignItems: 'center' }}><PackageCheck /> Additional related products are available on request.</div>
          )}
        </div>
      </section>
    </>
  );
}
