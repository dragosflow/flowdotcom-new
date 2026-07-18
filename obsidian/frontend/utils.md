---
tags: [frontend, stable]
updated: 2026-05-21
---

# Catalog — Utilities

Pure helper functions in `src/utils/` (no side effects, unless noted).

## `is-bot.ts`

`isBot(): Promise<boolean>` — **server-only**. Reads the `user-agent` header,
returns `true` for crawlers/audit tools. Used to skip heavy animation for bots.
See [[seo-metadata]].

## `scroll-to.ts`

`scrollTo(id?, immediate?)` — programmatic scroll to an element id (string) or a
numeric position. Integrates with the Lenis [[smooth-scroll|scroll store]];
temporarily disables scroll state during the animation. Has `//if lenis` guards so
the Lenis dependency can be stripped if smooth scroll is removed.

## `math.ts`

| Function | Purpose |
|----------|---------|
| `transformRange(value, min, max, newMin, newMax)` | remap a value between ranges (clamped) |
| `lerp(start, end, t)` | linear interpolation |
| `debounce(...)` | debounce helper (used by `useWindowSize`) |

## `lvh.ts`

CSS-string builders for viewport-height units with fallbacks
(`vh` → `lvh` → `calc(var(--vh) …)`): `heightLvh`, `minHeightLvh`, `marginTopLvh`,
`marginBottomLvh`. Solves mobile-browser viewport-height inconsistencies.

## `animation/coords.ts`

Element-coordinate helpers — `getElementCoords`, `getScrollCoordsFromElement` —
used internally by the scroll/animation system. Marked `@ts-nocheck`. `#do-not-modify`

## `seo/generate-page-metadata.ts`

`generateMetadata(props?)` — shared page-`Metadata` builder. `generateViewport()`
— the `Viewport` export (carries `themeColor`). See [[seo-metadata]].

## `seo/structured-data.ts`

`getSiteStructuredData()` — builds the `Organization` + `WebSite` JSON-LD graph
rendered by the root layout. See [[seo-metadata]].

## `lib/focus-ring.ts`

`FOCUS_RING` — shared `focus-visible:outline-*` utility class for marketing
controls (nav, CTAs, form-adjacent links).

## `nav-preview.ts`

Helpers for nav hover previews: `isInAppPageHref`, `readNavPreviewFlag`,
`navPreviewSrc`. Screenshots live in `public/assets/images/nav-preview/` (regenerate
with `yarn capture-nav-previews` while `yarn dev` is running). `?nav-preview=1`
still strips preloader / transition when capturing.

## `lib/three/claim-canvas.ts`

`claimCanvas(canvas)` / `markCanvasLost(canvas)` — after WebGL
`dispose()` + `forceContextLoss()`, the same DOM node cannot host a new renderer.
`claimCanvas` swaps in a fresh `<canvas>` (copies class/ARIA) when the node is
stale; scene dispose calls `markCanvasLost`. Used by plasma / gradient / chain /
footer / services-process mounts before create. See [[tech-stack]].

## Adding a util

Keep utilities **pure** and side-effect-free (server-only ones like `isBot` are the
exception — note it clearly). Group by domain under `utils/<domain>/`.

## Related

[[hooks]] · [[seo-metadata]] · [[smooth-scroll]]
