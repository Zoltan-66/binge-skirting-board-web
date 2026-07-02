import { existsSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

function fail(message) {
  console.error(`Cloudflare Pages output check failed: ${message}`);
  process.exit(1);
}

function assertFile(path, label = path) {
  if (!existsSync(path) || !statSync(path).isFile()) {
    fail(`missing ${label}`);
  }
}

function assertDirectory(path, label = path) {
  if (!existsSync(path) || !statSync(path).isDirectory()) {
    fail(`missing ${label}`);
  }
}

const root = process.cwd();
const wranglerPath = join(root, "wrangler.toml");
assertFile(wranglerPath, "wrangler.toml");

const wrangler = readFileSync(wranglerPath, "utf8");
const outputMatch = wrangler.match(/^\s*pages_build_output_dir\s*=\s*"([^"]+)"/m);
if (!outputMatch) {
  fail("wrangler.toml must set pages_build_output_dir");
}

const outputRelativePath = outputMatch[1];
const outputPath = resolve(root, outputRelativePath);
assertDirectory(outputPath, outputRelativePath);
assertDirectory(join(outputPath, "_next", "static"), `${outputRelativePath}/_next/static`);

for (const page of ["index.html", "en.html", "zh.html", "products.html", "downloads.html", "request-a-quote.html"]) {
  assertFile(join(outputPath, page), `${outputRelativePath}/${page}`);
}

const homepage = readFileSync(join(outputPath, "index.html"), "utf8");
const requiredHomepageMarkers = [
  ["site shell", 'class="binge-site-shell"'],
  ["language selector", 'aria-label="Select language"'],
  ["search action", 'aria-label="Open search"'],
  ["guided tour target", 'data-tour="product-entry"'],
  ["section animation reveal marker", "data-binge-reveal"],
];

for (const [label, marker] of requiredHomepageMarkers) {
  if (!homepage.includes(marker)) {
    fail(`homepage output is missing ${label}: ${marker}`);
  }
}

console.log(`Cloudflare Pages output check passed for ${outputRelativePath}`);
