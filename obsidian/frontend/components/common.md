---
tags: [frontend, stable]
updated: 2026-07-17
---

# Catalog — Common Components

Files in `src/components/common/` — shared infrastructure that may depend on
providers. Conventions: [[component-conventions]].

## Cookie — `Cookie/`

Self-contained cookie consent system — a bottom-right **banner** plus a full
category **preferences modal**. No third-party library (the old
`react-cookie-consent` dependency was removed). Lives in `src/components/common/Cookie/`.

| File                         | Role                                                                       |
| ---------------------------- | -------------------------------------------------------------------------- |
| `Cookie.tsx`                 | Mount component — hydrates the store, renders banner + modal               |
| `LazyCookie.tsx`             | `next/dynamic` `ssr:false` wrapper — keeps cookie JS out of first-load     |
| `CookieBanner.tsx`           | Bottom-right consent banner                                                |
| `CookiePreferencesModal.tsx` | Category preferences dialog with per-category toggles                      |
| `CookieButton.tsx`           | Local button primitive — `primary` / `secondary` variants                  |
| `cookieStore.ts`             | Zustand store + `localStorage` persistence                                 |
| `index.ts`                   | Barrel exports — `Cookie`, `LazyCookie`, `useCookieStore`, `CookieConsent` |

**Mounting** — the root layout renders `<LazyCookie />` inside `ScrollLayout`:

```tsx
import { LazyCookie } from "@/components/common/Cookie";
```

**State** — `useCookieStore` (Zustand). `consent` is `null` until the user decides;
the banner shows only after hydration confirms `consent === null`. Persisted to
`localStorage` under key `cookie-consent-v1`. Three categories: `necessary`
(always on), `analytics`, `marketing`.

**Styling & motion** — ported to the project stack: Tailwind v4 with the
`background` / `foreground` design tokens (dark-mode adaptive, no hardcoded hex),
and `@react-spring/web` for all motion — `useTransition` drives the banner and
modal mount/unmount, `useSpring` drives the toggle knob. No CSS transitions.
The modal locks scroll through the Lenis [[smooth-scroll|scroll store]]
(`useScroll.stop()`), not `body` overflow.

> [!note] `#todo`
> The privacy-policy link points to `/privacy-policy` — that route does not exist
> yet. Placeholder consent copy should be reviewed before launch.

## Grid — adaptive scaling (`grid/`)

The **adaptive scaling grid** keeps a rem-based layout proportional across every
viewport by scaling the root (`<html>`) font-size. Design in `rem` once, and the
whole UI scales as one unit. Lives in `src/components/common/grid/`.

| File                | Role                                                                    |
| ------------------- | ----------------------------------------------------------------------- |
| `grid.config.ts`    | Breakpoints + `FONT_BASE` — the single source of truth for the grid     |
| `adaptive-grid.tsx` | `<AdaptiveGrid>` client component — drives the scale-up, renders `null` |
| `index.ts`          | Barrel exports — `AdaptiveGrid`, `GRID_BREAKPOINTS`, …                  |

**How it works** — two halves cover the whole viewport range:

- **Scale down** (viewport ≤ 1440px, the Figma design base) — `vw`-based
  `html { font-size }` media queries in `globals.css`. At each breakpoint's design
  base width the root font-size resolves to 16px; between breakpoints it tracks the
  viewport. **Exception — the ≤640 (mobile) tier is clamped**, not a raw `vw`: it
  reads `clamp(12px, 1.5625vw, 16px)`. The old pure `16·100/360 vw` kept scaling _up_
  across the whole 0–640 range (~28px root by 620px → headings/stats/cards overflowed,
  then snapped small at 641px); the clamp gives a readable 12px floor, stays continuous
  with the 1024 tier at 640, and never balloons (changelog 2026-07-05).
- **Scale up** (viewport > 1440px) — the `<AdaptiveGrid>` component sets an
  inline `html` font-size at runtime via [[hooks|`useAdaptiveGrid`]], so the
  design keeps growing on large displays. Mounted with `coef={1}` (fully
  proportional) in `layout.tsx`.

The `globals.css` media queries and `grid.config.ts` describe the same
breakpoints — **keep them in sync** (formula: `font-size = 16 * 100 / baseWidth vw`,
except the clamped mobile tier noted above).

**Mounting** — the root layout renders `<AdaptiveGrid />` inside `ScrollLayout`:

```tsx
import { AdaptiveGrid } from "@/components/common/grid";
```

Mount it once. Props: `baseWidth` (defaults to the largest breakpoint) and
`coef` (0–1 scale-up damping, default `0.6666`).

> [!note]
> This replaced a `styled-components`-based scaling system that was dropped into
> `common/` — see [[decisions-log]] ADR-0008. `styled-components` is **not** a
> project dependency; the scale-down CSS lives in `globals.css` per [[design-system]].

## ReducedMotion — `reduced-motion.tsx`

`<ReducedMotion>` — a client leaf that calls react-spring's `useReducedMotion()`.
It watches the `prefers-reduced-motion` media query and toggles react-spring's
global `skipAnimation`, so every spring — and `spring-text-engine` — jumps to its
end state instead of animating. Renders `null`; mounted once in the root layout.
See [[animation-system]] and [[seo-metadata]].

## Pointer polish

| Component         | File                       | Role                                                                                                                                                                                                                                                                                                                                      |
| ----------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<CustomCursor>`  | `cursor/custom-cursor.tsx` | Portal to `body`: small filled **core** + thin **ring** (`mix-blend-difference`). Ring blooms on `data-cursor` (`link`/`cta`/`media`); core shrinks slightly. Springs + shared **ticker** write position/size/opacity imperatively (core snaps tighter than the ring). Off on touch / narrow / reduced-motion. Hides native cursor after first pointer move (`html.has-custom-cursor`). |
| `<Magnetic>`      | `magnetic.tsx`             | Pulls children toward the pointer while hovered.                                                                                                                                                                                                                                                                                          |
| `<MagneticCta>`   | `magnetic-cta.tsx`         | Magnetic + scale `Hover` + cursor CTA attrs — wrap pill `<a>`/`<Link>`s.                                                                                                                                                                                                                                                                  |
| `<UnderlineLink>` | `underline-link.tsx`       | Text link with spring `scaleX` underline + `data-cursor="link"`.                                                                                                                                                                                                                                                                          |
| `<MediaTrail>`    | `media-trail.tsx`          | Short fading image stack following the pointer (Showcase columns).                                                                                                                                                                                                                                                                        |

## Skeleton loaders

Three skeleton components for `loading` states of async-data components — every
async component must mirror its final layout with one of these
(see [[component-conventions]]).

| Component          | File                  | For                        |
| ------------------ | --------------------- | -------------------------- |
| `<SkeletonImage>`  | `skeleton-image.tsx`  | image placeholders         |
| `<SkeletonLoader>` | `skeleton-loader.tsx` | generic block placeholders |
| `<SkeletonVideo>`  | `skeleton-video.tsx`  | video placeholders         |

> [!note]
> `components/ui/` (design-system primitives) does not exist yet — create it when
> the first primitive is added. See [[folder-structure]].

## `<AnimatedHeading>` — `animated-heading.tsx`

Per-letter heading intro (rise + soft blur + fade, `easeOutQuart` cascade), triggered
when the heading **scrolls into view** (IntersectionObserver). Used for h1/h2 across the
marketing views (the hero h1 has its own on-mount variant, `views/hero-title.tsx`).

```tsx
<AnimatedHeading as="h2" id="section-title" className="…">{heading}</AnimatedHeading>
// gradient look: pass a per-letter opacity ramp
<AnimatedHeading as="h2" alpha={(f) => 1 - f * 0.65} className="text-white …">{h}</AnimatedHeading>
```

| Prop               | Meaning                                                                 |
| ------------------ | ----------------------------------------------------------------------- |
| `children`         | the heading **string** (splits into words → letters)                    |
| `as`               | `"h1"` / `"h2"` (default `h2`)                                          |
| `className` / `id` | passed to the tag; letters inherit the text colour                      |
| `alpha(fraction)`  | optional per-letter target opacity (for a gradient) — default solid `1` |

- **Why not spring-text-engine / react-spring hooks:** neither animates in this project;
  it drives one value `p` 0→1 from the shared ticker per frame (`api.start(…,
immediate:true)`) and each letter derives its opacity/rise/blur from `p`. See
  [[decisions-log]] ADR-0015 and [[text-engine]].
- **Wrapping:** letters are inline-block inside inline-block words → words never break;
  headings still wrap at spaces.
- **A11y / guards:** the tag keeps the full `aria-label` (letters `aria-hidden`); reduced
  motion and any heading **containing a digit** render static (no animation).

## `<Preloader>` — `preloader.tsx`

First-load overlay, mounted once at the app root (`app/layout.tsx`). White screen with the
centred **flowdotcom** mark, a bottom pale→royal-blue gradient bar (tokens `--preloader-from/-to`) that
fills left→right, and a hero-scale counter tracking the fill edge (0→100%). On complete the
same bar scales up (`scaleY`) to full-screen while the whole overlay slides up together;
logo/counter fade during exit for a softer handoff, then it unmounts (`setGone`).
Progress advances by **clamped frame deltas** (caps hitch spikes) and styles are written
**imperatively** on refs (no per-frame react-spring). Timings `LOAD` / `EXIT`; `usePreloader`
`done` flips late in the exit so hero/WebGL intros don’t contend with the count.
SSR-rendered so it covers from first paint. The hero title (`views/hero-title.tsx`) and the
hero 3D burst (`lib/three/plasma-burst-scene.ts`, `started` gate) wait on `done`.

## `<PageTransition>` — `page-transition.tsx`

Client overlay in the root layout (`z-[90]`). Quiet full-screen `bg-hero-page`
cover on one composited layer. **Intercepts** internal clicks: soft opacity fade-in
(~280ms) runs _before_ `router.push` (so it isn’t fighting RSC/WebGL), then holds
until paint + idle, then soft fade-out (~400ms). Clamped deltas + smoothstep +
ticker (ADR-0015). Skips external / hash / tel / mailto, modifier+click, first-load,
reduced-motion, and browser back/forward.

`app/template.tsx` remounts per navigation but is a pass-through.

## `useRevealCascade` — `use-reveal-cascade.ts`

The shared cascade timing behind `<AnimatedHeading>`, the hand-assembled About heading
(`views/about.tsx`, which mixes animated letters with **scaling icon chips**), and the
**bento card reveals** (`views/stats.tsx`, `views/product.tsx` — each card an
`animated.article` doing opacity + blur + rise). Call with the item count; returns
`{ p, rootRef, localProg }`:

- `rootRef` — attach to the element to observe; the cascade starts when it scrolls into view.
- `p` — a react-spring value driven 0→1 from the shared ticker (react-spring's own springs
  don't self-run here — [[decisions-log]] ADR-0015). Read it in animated styles.
- `localProg(p, i)` — item `i`'s eased (easeOutQuart) 0→1 progress within the staggered
  timeline; derive opacity / translate / blur / scale per item from it.

Reduced motion jumps `p` straight to 1. Generic over the element type (`useRevealCascade<HTMLHeadingElement>()`).

**Trigger:** by default the cascade starts when `rootRef` scrolls into view. Pass
`{ startWhen: boolean }` to start on a flag instead (skips the observer) — used by the hero
(`views/hero.tsx`), which reveals its stats/insight/buttons when the preloader `done` flag
flips, since it's on-screen behind the loader rather than scroll-triggered. The start latch
is **per effect run** (not a sticky ref) so Strict Mode re-invoke and client remounts with
`startWhen` already `true` (nav back to Acasă) still play the reveal.

**Timing:** optional `{ duration, spread }` override the defaults (1400ms / 0.55). Higher
`spread` + longer `duration` makes large sets (e.g. services product cards) read as
clear one-by-one reveals instead of a fast wave.

## Related

[[component-conventions]] · [[components/animation-springs]]
