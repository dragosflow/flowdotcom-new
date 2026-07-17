#!/usr/bin/env node
// Capture nav hover screenshots. Requires Playwright + a running `yarn dev`.
//   npx --yes playwright@1.49.0 install chromium
//   yarn capture-nav-previews
// Set NAV_PREVIEW_BASE if the app isn’t on http://localhost:3000
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const base = process.env.NAV_PREVIEW_BASE ?? "http://localhost:3000";
const outDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public/assets/images/nav-preview",
);
const pages = [
  { path: "/?nav-preview=1", file: "home.png" },
  { path: "/servicii?nav-preview=1", file: "servicii.png" },
  { path: "/colaborare?nav-preview=1", file: "colaborare.png" },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 800 },
});

for (const { path: route, file } of pages) {
  await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2800);
  await page.screenshot({ path: path.join(outDir, file), type: "png" });
  console.log("wrote", file);
}

await browser.close();
