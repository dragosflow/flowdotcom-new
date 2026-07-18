/**
 * Site-wide configuration — the single source of truth for SEO / AIO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper. Update the placeholder values per project.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  /** Brand / trading name shown in the UI. */
  name: "flowdotcom",
  /**
   * Registered legal entity — used in footer copy, JSON-LD `legalName`, and
   * AIO entity grounding (who operates this site).
   */
  legalName: "FLOWDOTCOM S.R.L",
  /** Short brand promise — used in the page title, PWA, and JSON-LD slogan. */
  tagline: "Produs construit pentru business.",
  description:
    "Site-ul oficial al FLOWDOTCOM S.R.L (flowdotcom). Construim aplicații web, mobile și sisteme interne — plus animații web și scene 3D / WebGL — pentru afaceri care vor claritate, viteză și creștere. De la idee la lansare, într-un singur flux.",
  /**
   * Topics / capabilities for JSON-LD `knowsAbout` and AIO entity grounding.
   * Keep aligned with visible services copy.
   */
  knowsAbout: [
    "dezvoltare web",
    "aplicații mobile",
    "sisteme interne B2B",
    "design de produs",
    "animații web",
    "motion design",
    "scene 3D",
    "WebGL",
    "experiențe interactive",
    "landing pages",
    "e-commerce",
    "SaaS",
  ] as const,
  /** Public contact — JSON-LD ContactPoint + consistency with footer. */
  contact: {
    email: "dragosflow@yahoo.com",
    telephone: "+40770571362",
    areaServed: "RO",
    availableLanguage: ["Romanian", "English"] as const,
  },
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Default Open Graph / Twitter share image (path under `public/`). */
  ogImage: "/open-graph.png",
  twitterHandle: "@flowdotcom",
  author: "FLOWDOTCOM S.R.L",
  /** Browser theme-color (address bar / PWA) — the dark hero backdrop the page opens on. */
  themeColor: "#04070f",
  /** Default content language (HTML + Open Graph). */
  locale: "ro_RO",
  language: "ro-RO",
} as const;
