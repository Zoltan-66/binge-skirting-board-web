import type { MetadataRoute } from "next";
import { PRODUCT_CATALOGUE } from "@/data/product-catalogue";
import { absoluteUrl, localizedPath, localizedStaticSlugs, supportedLocales } from "@/lib/seo";

export const dynamic = "force-static";

const productSlugs = PRODUCT_CATALOGUE.map(product => ["products", product.slug]);
const allSlugs = [...localizedStaticSlugs, ...productSlugs];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return supportedLocales.flatMap(locale =>
    allSlugs.map(slug => ({
      url: absoluteUrl(localizedPath(locale, slug)),
      lastModified,
      changeFrequency: slug.length === 0 ? "weekly" : "monthly",
      priority: slug.length === 0 ? 1 : slug[0] === "products" ? 0.8 : 0.7,
      alternates: {
        languages: {
          en: absoluteUrl(localizedPath("en", slug)),
          "zh-CN": absoluteUrl(localizedPath("zh", slug)),
          de: absoluteUrl(localizedPath("de", slug)),
          es: absoluteUrl(localizedPath("es", slug)),
          fr: absoluteUrl(localizedPath("fr", slug)),
        },
      },
    })),
  );
}
