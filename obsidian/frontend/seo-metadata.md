---
tags: [frontend, seo, stable]
updated: 2026-07-18
---

# SEO & Metadata

## Site config

`src/lib/site.ts` (`siteConfig`) is the **single source of truth** for SEO /
AIO — `name` (brand), `legalName` (`FLOWDOTCOM S.R.L`), `tagline`, `description`
(mentions web / mobile / animații / 3D WebGL), `knowsAbout`, `contact`
(email / phone), origin URL, OG image, Twitter handle, `locale` / `language`,
theme colour. The metadata generator, `robots.ts`, `sitemap.ts`, and the JSON-LD
helper all read from it.

`siteConfig.url` comes from `NEXT_PUBLIC_SITE_URL` (see [[environment-variables]]),
falling back to `http://localhost:3000`.
> [!important] `#todo` `NEXT_PUBLIC_SITE_URL` is still the placeholder
> `https://example.com` in `.env` — it drives **every** absolute URL (canonical,
> OG, JSON-LD `@id`). Set it to the real production domain before launch.

## Metadata generator

`src/utils/seo/generate-page-metadata.ts` exports two builders:

```ts
import {
  generateMetadata,
  generateViewport,
} from "@/utils/seo/generate-page-metadata";

export const metadata = generateMetadata({ title: "…", description: "…" });
export const viewport = generateViewport();
```

- `generateMetadata(props?)` → Next.js `Metadata`: title (string or
  `{ default, template }`), description, OpenGraph (`locale: ro_RO`, image alt),
  Twitter, canonical + `alternates.languages["ro-RO"]`, icons, manifest, robots /
  `googleBot` preview caps, `formatDetection`, `publisher` = legalName.
- `generateViewport()` → `Viewport` with `themeColor`.

Root layout uses a title **template** (`%s · flowdotcom`); `/`, `/servicii`,
`/colaborare` each export route metadata + page-level JSON-LD.

## robots.txt & sitemap.xml

- `src/app/robots.ts` → allows `*` plus common AI crawlers (GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended, …); sitemap + host from `siteConfig.url`.
- `src/app/sitemap.ts` → `/`, `/servicii`, `/colaborare`.

## Structured data (JSON-LD)

`src/utils/seo/structured-data.ts`:

| Helper | Role |
|--------|------|
| `getSiteStructuredData()` | Root graph: Organization (`legalName`, `knowsAbout`, ContactPoint), WebSite, ProfessionalService, ItemList of Service offers — mount once via `<JsonLd>` in `layout.tsx` |
| `getWebPageStructuredData()` | Per-route WebPage |
| `getBreadcrumbStructuredData()` | BreadcrumbList for interior pages |
| `jsonLdScript()` | Safe `JSON.stringify` for script tags |

`<JsonLd>` (`components/common/json-ld.tsx`) is a Server Component that emits
`application/ld+json` script(s). **No microdata / RDFa** — see [[html-semantics]].

Visible entity copy also lives in the footer (`entityNote` + contact `company`)
for AIO grounding in HTML.

Root `<html lang="ro">`; skip link “Sari la conținut” → `#top`.

## Bot detection

`src/utils/is-bot.ts` exports `isBot()` — a **server-only** async helper that
reads the `user-agent` header and returns `true` for Lighthouse, Googlebot,
PageSpeed, HeadlessChrome, GTmetrix, Pingdom, Bingbot, Yandexbot.

> [!caution]
> Calling `isBot()` (or any `headers()` reader) in a route **opts it out of
> static prerendering** — a TTFB cost for every visitor. Prefer the
> [[animation-system|reduced-motion]] path so content stays in the DOM for
> crawlers. Use `isBot()` sparingly.

## Static assets

The `public/` **root** holds meta/PWA/SEO assets — favicons, Android/Apple icons,
`manifest.json`, `browserconfig.xml`, `open-graph.png`. Content assets under
`public/assets/<section>/` — see [[folder-structure]].

> [!note] `#todo`
> `open-graph.png` is **900×600** (metadata matches). Ideal OG size is
> **1200×630** — swap the asset and update dimensions in
> `generate-page-metadata.ts`.

## Related

[[routing]] · [[utils]] · [[animation-system]] · [[environment-variables]] · [[decisions-log]] · [[html-semantics]]
