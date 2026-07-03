import assert from "node:assert/strict";
import test from "node:test";
import {
  localizedSearchUrl,
  recommendItems,
  searchSite,
  SITE_SEARCH_ITEMS,
} from "../src/lib/site-search.ts";

test("site search matches product code, taxonomy and Chinese keywords", () => {
  assert.equal(searchSite("WS-TG")[0]?.code, "WS-TG");
  assert.ok(searchSite("recessed").some(item => item.group === "Products"));
  assert.ok(searchSite("铝合金").some(item => item.category === "Surface-Mounted Aluminum"));
  assert.ok(searchSite("安装说明").some(item => item.group === "Technical Resources"));
});

test("search index is generated from catalogue and resource data", () => {
  assert.ok(SITE_SEARCH_ITEMS.some(item => item.id === "product-AS-SC"));
  assert.ok(SITE_SEARCH_ITEMS.some(item => item.id === "resource-1"));
  assert.ok(SITE_SEARCH_ITEMS.some(item => item.id === "page-quote"));
  assert.deepEqual(searchSite("   "), []);
});

test("localized search URLs preserve the selected locale", () => {
  const item = { url: "/products/example-profile" };
  assert.equal(localizedSearchUrl(item, "en"), "/en/products/example-profile");
  assert.equal(localizedSearchUrl(item, "zh"), "/zh/products/example-profile");
});

test("recommendations combine category, tags, engagement and recency", () => {
  const recommendations = recommendItems([
    { id: "a", title: "A", description: "", category: "LED", tags: ["hotel"], url: "/a", group: "Products", views: 10, clicks: 2, createdAt: "2026-06-30" },
    { id: "b", title: "B", description: "", category: "WPC", tags: ["retail"], url: "/b", group: "Products", views: 1, clicks: 0, createdAt: "2020-01-01" },
  ], { category: "LED", tags: ["hotel"] });

  assert.equal(recommendations[0]?.id, "a");
  assert.ok(recommendations[0].score > recommendations[1].score);
});
