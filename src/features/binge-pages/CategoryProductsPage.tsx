import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from '@/lib/router-compat';
import { getProductCategoryRoute, getProductsForCategoryRoute } from '@/data/product-catalogue';

const label: React.CSSProperties = {
  fontFamily: 'var(--binge-font)',
  fontSize: 'var(--binge-size-label)',
  fontWeight: 700,
  color: 'var(--binge-orange)',
  letterSpacing: 'var(--binge-tracking-label)',
  textTransform: 'uppercase',
};

export function CategoryProductsPage({ slug }: { slug: string }) {
  const route = getProductCategoryRoute(slug);
  const products = getProductsForCategoryRoute(slug);

  if (!route) return null;

  return (
    <>
      <div style={{ backgroundColor: 'var(--binge-white)', borderBottom: '1px solid var(--binge-border)' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: '16px var(--binge-pad-h)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: 'var(--binge-text-muted)', textDecoration: 'none', fontSize: 'var(--binge-size-caption)' }}>Home</Link>
            <ChevronRight size={12} color="var(--binge-border)" />
            <Link to="/products" style={{ color: 'var(--binge-text-muted)', textDecoration: 'none', fontSize: 'var(--binge-size-caption)' }}>Products</Link>
            <ChevronRight size={12} color="var(--binge-border)" />
            <span style={{ color: 'var(--binge-text-primary)', fontSize: 'var(--binge-size-caption)' }}>{route.title}</span>
          </div>
        </div>
      </div>

      <section style={{ background: 'var(--binge-white)' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: 'var(--binge-section-v) var(--binge-pad-h) 48px' }}>
          <span style={label}>Product range</span>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 'clamp(24px, 6vw, 72px)', alignItems: 'end', marginTop: 16 }}>
            <h1 style={{ margin: 0, color: 'var(--binge-text-primary)', fontSize: 'var(--binge-size-display-lg)', lineHeight: 'var(--binge-lh-display)', letterSpacing: '-0.025em' }}>
              {route.title}
            </h1>
            <p style={{ margin: 0, color: 'var(--binge-text-body)', fontSize: 'var(--binge-size-body-lg)', lineHeight: 1.7, fontWeight: 300 }}>
              {route.description} Technical drawings, finish samples and project specifications are available on request.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--binge-warm-bg)' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: '48px var(--binge-pad-h) var(--binge-section-v)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 1, background: 'var(--binge-border)' }}>
            {products.map(product => (
              <article key={product.code} style={{ background: 'var(--binge-white)' }}>
                <Link to={`/products/${product.slug}`} style={{ display: 'block', aspectRatio: '4 / 3', overflow: 'hidden', background: 'var(--binge-card-bg)' }}>
                  <img src={product.img} alt={product.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </Link>
                <div style={{ padding: 24 }}>
                  <span style={label}>{product.code}</span>
                  <h2 style={{ margin: '10px 0 10px', fontSize: 'var(--binge-size-title-md)', lineHeight: 1.3, color: 'var(--binge-text-primary)' }}>
                    {product.name}
                  </h2>
                  <p style={{ margin: '0 0 16px', color: 'var(--binge-text-body)', lineHeight: 1.6 }}>
                    {product.keySellingPoint}
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
                    {[product.safeMaterial, product.publicDimensions].map(value => (
                      <span key={value} style={{ border: '1px solid var(--binge-border)', padding: '3px 8px', color: 'var(--binge-text-muted)', fontSize: 'var(--binge-size-caption)' }}>
                        {value}
                      </span>
                    ))}
                  </div>
                  <Link to={`/products/${product.slug}`} style={{ ...label, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    View Product <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
