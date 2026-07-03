import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CatalogueProductPage } from '@/features/binge-pages/CatalogueProductPage';
import { PRODUCT_CATALOGUE, getProductBySlug } from '@/data/product-catalogue';
import { metadataAlternates } from '@/lib/seo';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCT_CATALOGUE
    .filter(product => product.slug !== 'tg-clip-on-solid-wood-skirting-system')
    .map(product => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.desc,
    alternates: metadataAlternates(["products", product.slug]),
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <CatalogueProductPage product={product} />;
}
