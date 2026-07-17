/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper. Update the placeholder values per project.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "flowdotcom",
  /** Short brand promise — used in the page title, PWA, and JSON-LD slogan. */
  tagline: "Produs construit pentru business.",
  description:
    "flowdotcom construiește aplicații digitale de calitate — mobile, web și desktop — pentru afaceri care vor să crească. De la idee la lansare, într-un singur flux.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Default Open Graph / Twitter share image (path under `public/`). */
  ogImage: "/open-graph.png",
  twitterHandle: "@flowdotcom",
  author: "flowdotcom",
  /** Browser theme-color (address bar / PWA) — the dark hero backdrop the page opens on. */
  themeColor: "#04070f",
} as const;
