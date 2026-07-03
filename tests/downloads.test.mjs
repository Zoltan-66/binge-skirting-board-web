import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const downloadsPage = new URL("../src/features/binge-pages/DownloadsPage.tsx", import.meta.url);
const technicalDownloads = new URL("../src/components/binge/TechnicalDownloads.tsx", import.meta.url);
const downloadResources = new URL("../src/data/download-resources.ts", import.meta.url);

test("pre-launch downloads do not advertise fake direct downloads or placeholder email", async () => {
  const sources = await Promise.all([
    readFile(downloadsPage, "utf8"),
    readFile(technicalDownloads, "utf8"),
  ]);
  const combined = sources.join("\n");

  assert.doesNotMatch(combined, /mailto:technical@binge-profiles\.com/);
  assert.doesNotMatch(combined, /Updated (Jan|Feb|Mar|Apr|May|Jun) 2025/);
  assert.match(combined, /RFQ/i);
  assert.match(combined, /request-a-quote\?source=downloads/);
});

test("download resource data is request-oriented and complete enough for filtering", async () => {
  const source = await readFile(downloadResources, "utf8");

  assert.match(source, /DOWNLOAD_RESOURCES/);
  assert.match(source, /Product catalogue/);
  assert.match(source, /Technical drawing/);
  assert.match(source, /Installation manual/);
  assert.match(source, /Test report/);
  assert.match(source, /Packaging specification/);
  assert.match(source, /Public download|Available after RFQ|Internal \/ project only/);
});
