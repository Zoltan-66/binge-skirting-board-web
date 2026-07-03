import Fuse, { type IFuseOptions } from "fuse.js";
import { DOWNLOAD_RESOURCES } from "../data/download-resources.ts";
import { PRODUCT_CATALOGUE } from "../data/product-catalogue.ts";

export type SearchLocale = "en" | "zh" | "de" | "es" | "fr";

export type SearchGroup = "Products" | "Technical Resources" | "Pages";

export type SearchItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
  group: SearchGroup;
  code?: string;
  views?: number;
  clicks?: number;
  createdAt?: string;
};

export type RecommendationContext = {
  category?: string;
  tags?: string[];
};

const PAGE_ITEMS: SearchItem[] = [
  { id: "page-products", title: "Products", description: "Browse BINGE skirting, recessed, LED and architectural profile systems.", category: "Products", tags: ["产品", "踢脚线", "型材", "catalogue"], url: "/products", group: "Pages" },
  { id: "page-applications", title: "Applications", description: "Solutions for residential, hospitality, workplace, healthcare and commercial projects.", category: "Applications", tags: ["应用场景", "住宅", "酒店", "办公", "医疗", "商业"], url: "/applications", group: "Pages" },
  { id: "page-oem", title: "OEM / ODM", description: "Custom profiles, finishes, packaging and manufacturing support.", category: "OEM / ODM", tags: ["定制", "代工", "制造", "factory"], url: "/oem-odm", group: "Pages" },
  { id: "page-downloads", title: "Downloads", description: "Product catalogues, drawings, installation guides and project resources.", category: "Technical Resources", tags: ["技术资料", "下载", "图纸", "安装说明", "目录"], url: "/downloads", group: "Pages" },
  { id: "page-quote", title: "Request a Quote", description: "Tell BINGE about your product, quantity and project requirements.", category: "Contact", tags: ["获取报价", "询价", "联系", "project"], url: "/request-a-quote", group: "Pages" },
];

const PRODUCT_TAGS: Record<string, string[]> = {
  Aluminum: ["aluminium", "铝合金"],
  "Stainless Steel": ["不锈钢"],
  "Solid Wood": ["实木"],
  WPC: ["木塑"],
  Recessed: ["嵌入式", "暗装"],
  "Surface-Mounted": ["明装"],
  "Clip-on": ["卡扣式"],
  LED: ["灯带", "照明"],
  Trims: ["收边条", "型材"],
};

const DOCUMENT_TAGS: Record<string, string[]> = {
  "Product catalogue": ["产品目录"],
  "Category brochure": ["产品目录", "分类册"],
  "System brochure": ["系统册"],
  "Capability guide": ["定制指南"],
  "Application guide": ["应用指南"],
  "Product datasheet": ["规格书"],
  "Technical drawing": ["型材图纸", "图纸"],
  "Installation manual": ["安装说明", "安装指南"],
  "Packaging specification": ["包装规范"],
};

export const SITE_SEARCH_ITEMS: SearchItem[] = [
  ...PRODUCT_CATALOGUE.map((product): SearchItem => ({
    id: `product-${product.code}`,
    title: product.name,
    description: product.desc,
    category: product.category,
    code: product.code,
    tags: [
      product.code,
      product.material,
      product.materialGroup,
      product.installationMethod,
      ...product.applications,
      ...(PRODUCT_TAGS[product.materialGroup] ?? []),
      ...(PRODUCT_TAGS[product.installation] ?? []),
      ...(PRODUCT_TAGS[product.category] ?? []),
    ],
    url: `/products/${product.slug}`,
    group: "Products",
  })),
  ...DOWNLOAD_RESOURCES.map((resource): SearchItem => ({
    id: `resource-${resource.id}`,
    title: resource.title,
    description: resource.buyerFacingNote,
    category: resource.documentType,
    code: resource.productCodeOrRange,
    tags: [resource.productCodeOrRange, resource.category, resource.documentType, resource.fileFormat, resource.publicAvailability, ...(DOCUMENT_TAGS[resource.documentType] ?? []), "技术资料", "下载"],
    url: "/downloads",
    group: "Technical Resources",
  })),
  ...PAGE_ITEMS,
];

const fuseOptions: IFuseOptions<SearchItem> = {
  includeScore: true,
  ignoreLocation: true,
  minMatchCharLength: 1,
  threshold: 0.38,
  keys: [
    { name: "title", weight: 0.35 },
    { name: "code", weight: 0.25 },
    { name: "category", weight: 0.15 },
    { name: "tags", weight: 0.15 },
    { name: "description", weight: 0.1 },
  ],
};

const searchIndex = new Fuse(SITE_SEARCH_ITEMS, fuseOptions);

export function searchSite(query: string, limit = 18): SearchItem[] {
  const normalized = query.trim();
  if (!normalized) return [];
  return searchIndex.search(normalized, { limit }).map(({ item }) => item);
}

export function localizedSearchUrl(item: Pick<SearchItem, "url">, locale: SearchLocale): string {
  if (!item.url.startsWith("/") || item.url.startsWith("//")) return item.url;
  const [pathAndQuery, hash = ""] = item.url.split("#");
  const bare = pathAndQuery.replace(/^\/(en|zh|de|es|fr)(?=\/|$)/, "") || "/";
  const localized = `/${locale}${bare === "/" ? "" : bare}`;
  return hash ? `${localized}#${hash}` : localized;
}

export function recommendItems(
  items: SearchItem[],
  context: RecommendationContext = {},
  limit = 6,
): Array<SearchItem & { score: number }> {
  const wantedTags = new Set((context.tags ?? []).map(tag => tag.toLowerCase()));
  const now = Date.now();

  return items
    .map(item => {
      const categoryMatch = context.category && item.category.toLowerCase() === context.category.toLowerCase() ? 30 : 0;
      const tagMatch = item.tags.reduce((score, tag) => score + (wantedTags.has(tag.toLowerCase()) ? 8 : 0), 0);
      const popularity = Math.log1p(Math.max(0, item.views ?? 0)) * 2 + Math.log1p(Math.max(0, item.clicks ?? 0)) * 3;
      const createdAt = item.createdAt ? Date.parse(item.createdAt) : Number.NaN;
      const ageDays = Number.isFinite(createdAt) ? Math.max(0, (now - createdAt) / 86_400_000) : 365;
      const recency = Math.max(0, 10 - ageDays / 30);
      return { ...item, score: categoryMatch + tagMatch + popularity + recency };
    })
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}
