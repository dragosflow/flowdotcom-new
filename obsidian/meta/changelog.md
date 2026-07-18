---
tags: [meta, changelog]
updated: 2026-07-17
---

# Changelog

Chronological log of notable changes to the project. Newest first.
This is a human-curated log — not a mirror of `git log`.

## 2026-07-18

- **Product cards + solo CTAs (mobile)** (`product.tsx`, CTAs, `globals.css`): home
  product bento dropped `min-h-[26rem]` / `justify-between` on small screens (cards
  hug content with `gap-5`); body copy `text-lg`. Solo primary CTAs → `text-lg` /
  `px-8 py-4` / `min-h-12` on mobile. Phone root floor `15px` (`4.2vw`).

- **Footer legal bar contrast** (`site-footer.tsx`): entity/copyright + tagline/credit
  use one `text-footer-muted` family; soft `from-footer` gradient scrim behind the bar
  so type stays readable where the WebGL mesh washes light. Bottom padding lives on
  the legal bar (`pb-0` on `<footer>`) so there’s no empty strip under the copy.

- **Mobile type + buttons** (`globals.css`, CTAs, nav, body copy): phone root was
  floored at 12px (`clamp(12px, 1.5625vw, 16px)`), so rem type/`text-sm` pills felt
  tiny. Mobile → `clamp(14px, 4vw, 16px)`; tablet ≤1024 also floors at 14px. Primary
  buttons / nav CTA use `text-base` + larger padding on mobile (`sm:` back to
  `text-sm`); key body/footer copy bumped similarly. Docs: design-system, common grid.

- **Titles / descriptions cleaned** (`page.tsx`, `servicii`, `colaborare`,
  `site.ts`): layout template `%s · flowdotcom` was doubling brand on routes that
  already said “flowdotcom”; Colaborare also stuffed `FLOWDOTCOM S.R.L` into
  `<title>`. Segment titles + absolute home title; descriptions brand-first;
  SRL stays in JSON-LD / publisher / footer.

- **Removed cookie consent** (`layout.tsx`, deleted `components/common/Cookie/`):
  no banner/modal; vault refs updated (data-flow, system-overview, common catalog,
  routing, tech-stack, folder-structure).

- **Footer iPhone: hide on mobile** (`views/footer-scene.tsx`): 3D phone canvas
  is not mounted (and the GLB is not loaded) at `≤ mobileWidth`; gradient
  backdrop still runs. Desktop unchanged.

- **Footer iPhone: smaller on desktop** (`footer-scene.tsx`, `chain-scene.ts`):
  optional `fitUnits` (default 3.6); footer phone uses `2.35` so it sits lighter
  in the panel. Chain model size unchanged.

- **Brand logo SVG** (`brand-logo.tsx`, `public/assets/brand/flowdotcom-logo.svg`):
  Zap + outlined Mulish “flowdotcom” paths (no `<text>`), 4px gap, viewBox `98×24`
  cropped to content — no clipped “m”, no trailing dead space. Header still uses
  Lucide `Zap` + live text.

- **Favicon = Zap** (`public/favicon.ico`, `src/app/favicon.ico`,
  `favicon-16/32.png`, apple/android icons): white Lucide bolt on `#04070f`
  rounded square. Next.js serves `app/favicon.ico` at `/favicon.ico` (it was
  still the old starter 25KB file, which shadowed `public/`); both copies are
  the zap now. Source: `public/assets/brand/favicon-zap.svg`.

- **AIO entity: FLOWDOTCOM S.R.L** (`site.ts`, `structured-data.ts`, footer):
  `legalName` in site config; JSON-LD Organization `legalName` + `alternateName`;
  meta description names the SRL; footer shows company in contact +
  `entityNote` (“site-ul oficial al FLOWDOTCOM S.R.L”). Legal bar uses muted
  footer text over a soft navy scrim (readable on the light mesh corner).

- **SEO / AIO pass** (`site.ts`, `generate-page-metadata.ts`, `structured-data.ts`,
  `json-ld.tsx`, pages, `robots.ts`, `layout.tsx`, home/services copy): richer
  description + `knowsAbout` (animații / 3D WebGL); OG `ro_RO`; googleBot preview
  caps; root JSON-LD adds ProfessionalService + Service ItemList; per-page
  WebPage + BreadcrumbList; `lang=ro`; skip link; AI crawlers allowed in robots;
  light copy clarifying animations & 3D on home/servicii.

- **Custom cursor perf** (`custom-cursor.tsx`): dropped react-spring + perpetual
  ticker + full-viewport `mix-blend-difference`. Core snaps on `pointermove`;
  ring/size lerp only while settling (ticker unsubscribes when idle).

- **Stats bento stretch** (`views/stats.tsx`): three columns share one row height
  (`items-stretch` + `h-full`); right stack uses `flex-1` on the Hover shell so
  the blue data card fills leftover space under the reach bar.

- **Showcase: drop MediaTrail** (`views/showcase.tsx`): no more small image
  following the pointer on column hover — clip-path photo reveal only.

## 2026-07-17

- **Pointer polish + Lucide icons**: custom spring cursor (`CustomCursor`), magnetic
  CTAs (`Magnetic` / `MagneticCta`), animated underline links, Showcase image trail
  (`MediaTrail`); Lucide replaces generic SVG icons (services grid, marquee app
  types, zap/chart/close); brand tech logos in the marquee stay custom SVGs.
  ADR-0017.

- **Custom cursor** (`custom-cursor.tsx`): dropped the magnifier/DOM-clone
  approach. Now a small filled **core** + thin lagging **ring**
  (`mix-blend-difference`); ring blooms on interactive targets, core shrinks
  slightly — no label, no page clone.

- **Fix: custom cursor stuck top-left** (`custom-cursor.tsx`, `layout.tsx`):
  movement no longer triggers React re-renders (pointer coords + hover target in
  refs); springs hold the physics and the shared **ticker** rewrites
  transform/size/opacity to the DOM every frame, so a re-render can't wipe the
  transform. Portal to `body` outside `ScrollLayout`; native `cursor: none` only
  after the first pointer move; dropped `mix-blend-difference`.

- **Polish pass** (`hero`, `product`, `site-footer`, `site-nav`, `works`,
  `collaboration-intro`): spring Hover on CTAs; shared `FOCUS_RING`; Locație
  static (no `#top` dead link); Works year in metadata + focused card opens
  project; footer copyright/credit/tagline bar.

- **Nav: user screenshot tooltips** (`nav-preview/*.png`, `site-nav.tsx`): menu
  hover uses the three provided page screenshots; styled as a floating tooltip
  (caret + rounded card + soft shadow), no title label.

- **CTAs wired** (`hero.tsx`, `product.tsx`, mocks): “Vreau un proiect” →
  `/colaborare`; “Sună acum” → `tel:+40770571362` (were `href="#"` / inert button).

- **Nav: screenshot previews** (`site-nav.tsx`, `nav-preview/` assets): hover shows
  a small page screenshot only (no label chrome); regenerate via
  `yarn capture-nav-previews`. Replaces live iframes that showed the preloader.

- **Fix: next/font postcss path** (`scripts/ensure-next-postcss.mjs`): postinstall
  copies hoisted `postcss` into `next/node_modules` so `next/font` resolves.

- **Servicii: Animații doar în highlight** (`services.ts`, `services-highlight.tsx`):
  removed the Animații product-grid card; both specialty columns now show a body
  description under the title.- **Servicii: highlight tip Showcase** (`services-highlight.tsx`, mocks): Animații
  + 3D as two hover photo-reveal columns (same clip-path / scrim pattern as home
  Showcase); specialty cards remain at the start of the product grid.

- **Servicii: highlight Animații & 3D** (`data/mocks/services.ts`,
  `views/services-list.tsx`, `services-icons.tsx`): featured dark band above the
  product grid (“Experiențe care se simt”) plus the same two offers at the start
  of the list; new `animation` / `webgl` icons.

- **Home: remove showcase CTA** (`views/showcase.tsx`, `data/mocks/home.ts`): dropped
  the "Toate proiectele" button; heading-only overlay remains.

- **Selected Work: full-bleed cards** (`views/works.tsx`): portfolio cards use
  `aspect-[2/1]` + `object-cover` so screenshots fill the frame edge-to-edge (no
  letterbox); ratio matches the ~2:1 portfolio PNGs.

- **Hide scrollbars site-wide** (`globals.css`, `smooth-scroll.md`): native
  scrollbar chrome hidden on every element; Lenis / wheel / touch scroll unchanged.

- **Nav: current page not a link** (`views/site-nav.tsx`): active route (and brand
  on `/`) renders as muted `aria-current` text, not `<Link>`.

- **Page transition: larger bolt** (`page-transition.tsx`): loading-cover lightning
  icon scaled up (`h-14` / `sm:h-16`).

- **Page transition: fade-in before nav** (`page-transition.tsx`): intercept link
  click → smooth cover fade-in alone → `router.push` under solid sheet → soft
  unveil (fixes laggy appear).

- **Page transition: soft appear** (`page-transition.tsx`): smooth opacity fade-in
  (~240ms) + fade-out; still single GPU layer; unveil after paint/idle.

- **Page transition: smoother unveil** (`page-transition.tsx`): snap cover on
  (no fade-in vs nav); single-layer opacity out after paint + idle; GPU layer.

- **Page transition: quiet fade** (`page-transition.tsx`): soft full-screen opacity
  cover + subtle bolt/hairline; smoothstep easing; unveils after paint — calmer
  than iris/roulette.

- **Page transition: iris portal** (`page-transition.tsx`): circle expands from
  centre (clip-path) with bolt + destination label; contracts only after paint —
  replaced the roulette.

- **Page transition: full cover + roulette** (`page-transition.tsx`): full-screen
  opacity cover (no wipe transform); reel centered; unveils only after paint +
  short settle (extra on `/`); less laggy.

- **Page transition: roulette reel** (`page-transition.tsx`): replaced full-height
  wipe with a compact centered reel (Acasă/Servicii/Colaborare); dim overlay
  opacity-only — less laggy.

- **Page transition: branded wipe** (`page-transition.tsx`): rise from bottom with
  flowdotcom mark + preloader blue bar; clamped-delta smooth motion; slide-up
  reveal (~320/420ms).

- **Page transition: snappier** (`page-transition.tsx`, removed `page-enter.tsx`):
  dropped home hold + brand mark + PageEnter fade; ~140/200ms cover only — less
  “loader” feel on every nav.

- **Smoother nav-to-home** (`page-enter.tsx`, `page-transition.tsx`,
  `plasma-burst.tsx`, `chain.tsx`): opacity-only PageEnter (skip on `/`); longer
  veil hold on home; defer plasma create + lazy-init chain GLB near viewport.

- **Page transition** (`page-transition.tsx`, `page-enter.tsx`, `app/template.tsx`):
  spring cover veil on internal nav (hides RSC/WebGL lag) + soft enter on remount;
  reduced-motion skipped. Docs: `components/common.md`, `routing.md`.

- **WebGL remount: claimCanvas** (`lib/three/claim-canvas.ts`, plasma/chain/
  gradient/footer/services-process): after `forceContextLoss` the canvas node is
  dead — swap a fresh element before recreate so client nav back to Acasă shows
  the hero again (was blank / context lost).

- **Client nav: hero remount fix** (`scroll-layout.tsx`, `use-reveal-cascade.ts`,
  `hero-title.tsx`, `plasma-burst-scene.ts`): scroll reset in `useLayoutEffect`
  before child effects; reveal/title clocks restart after cleanup; plasma kicks
  its rAF if already in-view — returning to Acasă shows the hero again.

- **Client nav: reset Lenis scroll** (`layouts/scroll-layout.tsx`,
  `smooth-scroll.md`): on pathname change, jump to top + `lenis.resize` so
  returning to Acasă doesn’t leave the hero scrolled away / shrunk.

- **Preloader: no hitch skips** (`components/common/preloader.tsx`): progress from
  clamped frame deltas (max 20ms); imperative DOM updates (no per-frame springs);
  `setDone` late in exit so hero/WebGL don’t spike mid-count.

- **Preloader counter: smooth chase** (`components/common/preloader.tsx`): percent
  text low-pass lerps toward fill every frame (no integer jump skips); `tabular-nums`.

- **Preloader smoother + flowdotcom brand** (`components/common/preloader.tsx`,
  `public/manifest.json`, `HOW_TO_USE.md`, `seo-metadata.md`): longer cubic fill/
  exit, logo/counter fade on reveal; preloader + PWA manifest say **flowdotcom**
  (no Stride).

- **Nav + footer: Acasă / Servicii / Colaborare** (`data/mocks/*`,
  `views/site-footer.tsx`): primary nav and footer sitemap only those three;
  removed duplicate “Contact direct” column (contact once).

- **Services hero: simplify like collaboration** (`views/services-intro.tsx`,
  `data/mocks/services.ts`): centered `AnimatedHeading` + body + CTA; dropped
  letter cascade and insight aside.

- **Home: hide contact form** (`views/home.tsx`): `ContactForm` temporarily not
  rendered; footer follows Product. Component + mocks kept for later.

- **Collaboration: hide contact form** (`views/collaboration.tsx`): form
  temporarily not rendered; footer slides over the sticky process band.

- **Contact details + collab process band** (`data/mocks/*`, `views/collaboration*.tsx`):
  phone `0770571362`, email `dragosflow@yahoo.com` site-wide; “Cum lucrăm
  împreună” reuses sticky `ServicesProcess` (form slides over it).

- **Collaboration page: distinct from /servicii** (`views/collaboration*.tsx`,
  `data/mocks/collaboration.ts`): centered `AnimatedHeading` hero; large contact
  channels (phone / email / location); gray principles strip (not sticky Chain
  process); form below — no reused services intro/process/list.

- **Collaboration / contact page `/colaborare`** (`app/colaborare/page.tsx`,
  `views/collaboration*.tsx`, `data/mocks/collaboration.ts`): services design
  language — letter hero, sticky “Cum colaborăm” (Chain gradient), contact form
  slides over it; nav + footer + sitemap wired to `/colaborare`.

- **Services: remove closing CTA** (`views/services.tsx`, `views/services-cta.tsx`,
  `data/mocks/services.ts`): dropped “Hai să construim produsul potrivit”; page
  ends with product list → footer.

- **Services hero title** (`data/mocks/services.ts`): “De la idee la produs — /
  ce putem construi?”.

- **Services list title** (`data/mocks/services.ts`): “Ce lansăm împreună”.

- **Services: product list overlay + sharper list title** (`views/services*.tsx`,
  `data/mocks/services.ts`): process pins like home Chain; product grid (`z-20`)
  slides up over it; footer overlay removed. List heading → “Produse pe care le
  ducem live”.

- **Services: punchier hero, Sună acum, footer overlay** (`views/services*.tsx`,
  `data/mocks/services.ts`): title “De la idee la produs / care vinde și
  scalează”; single `tel:` CTA; sticky CTA + footer two-layer reveal (home
  ContactForm pattern).

- **Services hero: drop chips + capability rail** (`views/services-intro.tsx`,
  `data/mocks/services.ts`): pure letter cascade (no title icons); right side is
  a short insight aside (home-hero band) with scrub — not a category index.

- **Services process: Chain mesh gradient** (`views/services-process.tsx`): same
  WebGL backdrop as home “Proces simplu…” (`createGradientBackground`, BASE /
  LIGHT / SEED matching `chain.tsx`); `bg-footer` as no-WebGL fallback.

- **Services page: hero rail + section contrast + motion mix**
  (`views/services-*.tsx`, `data/mocks/services.ts`): build/briefcase chips;
  right capability rail (cascade + `SpringTrigger` scrub); dark process band
  with sideways `Inview`; light list cascade + icon rotate Hover; CTA scrub +
  scale Inview — sections no longer share one gray cascade look.

- **Services hero: typography + chips (no photo)** (`views/services-intro.tsx`,
  `data/mocks/services.ts`): light About-style letter/chip cascade, left-aligned
  with CTAs — no image, no `hero-gradient`.

- **Services hero: light split, no gradient** (`views/services-intro.tsx`,
  `data/mocks/services.ts`): dropped `hero-gradient` / watermark / glass lanes.
  Clean white split — letter heading + cascade copy/CTAs + one rounded photo tile.

- **Services hero: gradient stage + scrub + lanes** (`views/services-intro.tsx`,
  `data/mocks/services.ts`): full-viewport `hero-gradient` opener with letter
  heading, scroll-scrub watermark (`SpringTrigger`), cascade CTAs, and 4 glass
  category lanes with Hover — home ink/motion, not plasma and not Stats bento.

- **Services opener: Stats-bento composition** (`views/services-intro.tsx`,
  `data/mocks/services.ts`): replaced the centered Product intro with a 3-column
  Stats-style bento (photo / gray copy+CTA / blue+dark) — same design system,
  different page rhythm from `/` hero.

- **Services page: richer motion, still simple** (`views/services-*.tsx`,
  `data/mocks/services.ts`): kept the light Product/About flow; added staggered
  highlight chips, cascade + Hover lift/scale on process & product tiles, CTA
  Inview + Hover — spring-only per animation-system / new-page cheat-sheet.

- **Services page simplified** (`views/services*.tsx`, `data/mocks/services.ts`):
  stripped pillars/Showcase/dark process; flow is intro (Product-style) → gray
  process tiles → uniform product grid → CTA. Deleted `services-pillars.tsx`.

- **Services page: distinct from home, same design system** (`views/services-*.tsx`,
  `data/mocks/services.ts`): light typographic opener (watermark + heading + CTAs);
  Showcase-style pillar columns (no home overlay); dark process as divided columns
  (not Product bento / not hero-gradient clone). Removed duplicated logo marquee.

- **Services hero + process aligned to home** (`views/services-intro.tsx`,
  `views/services-process.tsx`, `views/services.tsx`, `data/mocks/services.ts`):
  opener uses `hero-gradient` + home-hero band (stats | insight | CTAs) and the
  shared logo marquee; process mirrors the Product bento (photo + gray + dark
  tiles, centered display heading). Same tokens/motion as `/`, not a generic
  photo billboard or editorial list.

- **Services hero + process: no card grids** (`views/services-intro.tsx`,
  `views/services-process.tsx`): opener is a full-bleed photo stage with type over a
  scrim (Chain/Showcase language, not plasma, not bento tiles). Process is a stacked
  editorial list with hairline dividers and cascade reveals — no rounded cards.

- **Services opener redesign** (`views/services-intro.tsx`, `data/mocks/services.ts`):
  replaced the Product-like two-column text band with a split bento stage — photo
  tile + dark copy panel, watermark, glass category pills. Same tokens/rounded-3xl
  language, deliberately not the home plasma hero.

- **Services page: richer visual rhythm** (`views/services-*.tsx`,
  `data/mocks/services.ts`): process on a dark band with oversized step marks;
  product grid is a bento — 4 photo feature tiles + uniform gray cards; category
  icon chips (blue/lime/black/plum) instead of random blue card fills; CTA in a
  soft gray panel before the footer.

- **Services intro restyle** (`views/services-intro.tsx`, `data/mocks/services.ts`):
  dropped the eyebrow + plum-dot label; intro is now a two-column display heading +
  lead band aligned with Product/home section rhythm.

- **Services cards: clearer one-by-one reveal** (`views/services-list.tsx`,
  `use-reveal-cascade.ts`, `components/common.md`): `useRevealCascade` accepts
  optional `duration` / `spread`; the product-type grid uses 3400ms / 0.82 so
  cards pop in sequence (stronger rise/blur) instead of a fast simultaneous wave.

- **Services cards: icons + richer layout** (`views/services-list.tsx`,
  `views/services-icons.tsx`, `data/mocks/services.ts`): each product-type card
  gets a dedicated SVG icon in a rounded chip, category pill, taller flex layout,
  and icon scale-up on hover (spring `Hover`).

- **Services page `/servicii`** (`app/servicii/page.tsx`, `views/services*.tsx`,
  `data/mocks/services.ts`): dedicated marketing page — process intro (4 steps) +
  dense product-type grid (~16 items), spring motion matching home
  (`AnimatedHeading`, `useRevealCascade`, `Hover`). No ContactForm; CTA + footer
  link to `/#contact`. `SiteNav` items are now `{ label, href }` with real
  `next/link` routes; sitemap includes `/servicii`.

- **Footer CTA glass pill** (`views/site-footer.tsx`, `design-system.md`): the
  final "Vreau un proiect" button uses a frosted glass fill
  (`bg-footer-fg/10 backdrop-blur-md`) instead of a bare outline.

- **Footer iPhone screen: Boost app UI** (`views/footer-scene.tsx`,
  `public/assets/images/portfolio/boost-screen.png`): replaced the rotating
  portfolio-site cycle with a single portrait Boost Coffee Shop simulator
  screenshot on the phone display.

- **Footer iPhone: live portfolio screen** (`views/footer-scene.tsx`,
  `data/mocks/contact.ts`): the phone screen now cycles lit portfolio screenshots
  (Ritual, RN Imobiliare, Briscan, Vivodentis, Boost) instead of a blank panel;
  footer heading reframed to “De la brief la produs live — pe orice ecran.”

- **Footer iPhone: lower settle + blank screen** (`views/footer-scene.tsx`,
  `lib/three/chain-scene.ts`): settled the phone lower (`SETTLE` 0.5 → 0.63) and
  cleared the screen material's wallpaper so it reads as dark glass. Added
  optional `onModelReady` on the chain scene factory.

- **Footer iPhone: use Pro Max silver GLB** (`public/assets/iphone.glb`,
  `lib/three/chain-scene.ts`, `views/footer-scene.tsx`): swapped the stylised
  chrome phone for the textured iPhone 17 Pro Max silver model. Added
  `preserveMaterials` so the scene factory no longer overwrites GLB materials
  with chrome (chain still uses chrome).

- **Footer chrome model: iPhone mock** (`views/footer-scene.tsx`,
  `public/assets/iphone.glb`): replaced the chrome heart with a stylised iPhone
  GLB (same chain-scene chrome material, fly-in + reversed spin). Removed
  `heart.glb`.

- **Product cards: shorter equal copy** (`data/mocks/product.ts`): halved the
  Discovery / UX + Arhitectură / Dezvoltare & lansare bodies so they read at a
  similar length.

- **Stats commitment card: richer copy** (`views/stats.tsx`, `data/mocks/home.ts`):
  added a supporting body under "Claritate", expanded the quote, and listed three
  short collaboration principles beneath it.

- **Stats collab card photo** (`views/stats.tsx`,
  `public/assets/images/2nd/collaboration.jpg`): replaced the lifestyle
  `people.png` background on the first stats card with a workspace collaboration
  photo.

- **Stats commitment card: remove avatar stack** (`views/stats.tsx`): dropped the
  four overlapping avatar photos above the quote; the quote now sits alone at
  the bottom of the grey card.

- **Product cards: longer process copy** (`data/mocks/product.ts`,
  `views/product.tsx`): expanded Discovery / UX + Arhitectură bodies; replaced
  "Build în sprinturi" with "Dezvoltare & lansare" and fuller launch-oriented
  copy. Card body width/leading loosened so the longer text reads cleanly.

- **Logo marquee: representative icons** (`views/logo-marquee-icons.tsx`,
  `views/logo-marquee.tsx`, `data/mocks/home.ts`): each application type and
  technology now has a flat monochrome SVG mark (`currentColor` / `text-logo`)
  instead of the rotating geometric placeholders. Items are `{ name, icon }`.

- **Logo marquee: app types + tech stack** (`views/logo-marquee.tsx`,
  `data/mocks/home.ts`, `views/home.tsx`): the two scroll-driven rows no longer
  duplicate one list. Row 1 shows application types (CRM, Websites, E-shops,
  Mobile/iOS/Android Apps, …); row 2 shows technologies (PHP, JS, Laravel,
  React, React Native, Elixir, Node, Astro, …). Stats reach card updated to
  `12+`.

- **Hero + Stats copy: drop fake ROI metrics** (`data/mocks/home.ts`): replaced
  the invented %-change stats (−40% / +38% / −65%) with agency-relevant labels —
  hero: Web / App / B2B; stats bento: End-to-end, Claritate, Web & App. Reach
  card (`11+` tehnologii) unchanged.

- **Selected Work uses real client projects** (`data/mocks/home.ts`,
  `views/works.tsx`, `public/assets/images/portfolio/`): replaced placeholder
  portfolio cards with The Ritual, Briscan Media, RN Imobiliare, Vivodentis, and
  Boost Coffee Shop (screenshots moved from `public/img/`). `WorkItem` gained an
  optional `href`; the metadata control is now an external "Vezi proiectul" link
  that tracks the focused card (hidden for Boost, which has no public URL).

## 2026-07-13

- **Homepage copy re-migrated from flowdotcom (Romanian)** (`src/lib/site.ts`,
  `src/data/mocks/home.ts`, `product.ts`, `contact.ts`): replaced
  flowdotcom-web English/RO-mix placeholders with verbatim Romanian copy from the
  `flowdotcom` repo — hero, servicii, proces, colaborare, selected work, contact
  (`+40770600321`, `dragos@mail.com`). Mocks only; no view or design changes.

- **Homepage copy migrated from flowdotcom-web** (`src/lib/site.ts`,
  `src/data/mocks/home.ts`, `product.ts`, `contact.ts`): replaced Stride/fintech
  placeholder strings with verbatim homepage copy from the old site — flowdotcom
  brand, Romanian hero/nav, English services/process/tech/CTA/footer. Mocks only;
  no view, layout, or design changes.

- **Dev: fix Tailwind resolution with stray `~/package.json`** (`next.config.js`,
  `package.json`): a `package.json` + `package-lock.json` in the home directory
  made PostCSS resolve `tailwindcss` from `~/node_modules` (v3) instead of this
  repo (v4), breaking `next dev` with “Can't resolve 'tailwindcss'”. Pinned
  `outputFileTracingRoot`, added webpack/turbopack `resolveAlias` for
  `tailwindcss`, and switched the default `dev` script to `next dev --webpack`
  (Turbopack's PostCSS pipeline does not honour the alias yet). **Recommended
  machine fix:** move or remove `~/package.json` and `~/package-lock.json` if
  they are not intentional.

- **Dev: pin Turbopack workspace root** (`next.config.js`): set `turbopack.root`
  to the project directory so Turbopack no longer infers `~/package-lock.json` as
  the monorepo boundary (spurious "multiple lockfiles" warning on `next dev`, and
  potential module-resolution drift). No runtime behaviour change.

## 2026-07-05

- **Metadata wired to the Stride brand** (`lib/site.ts`, `app/layout.tsx`,
  `utils/seo/structured-data.ts`, `public/manifest.json`, `public/browserconfig.xml`):
  replaced the starter placeholders with the real site content. `siteConfig` gained a
  `tagline` ("Modern banking for people and businesses") and now carries `name: "Stride"`,
  a fintech description, `twitterHandle: @stride`, `themeColor: #04070f` (the dark hero
  backdrop). The homepage `<title>` is `Stride — Modern banking for people and businesses`
  (layout override); the Organization JSON-LD gained `description` + `slogan`; the PWA
  manifest got a real name/short_name/description + `theme_color`/`background_color`/
  `display`/`start_url`; the MS tile colour matches. Also fixed a stray placeholder
  inconsistency — the footer used **Northwind** (actually a portfolio client) as the site
  owner in the copyright/credit/contact copy; changed those to **Stride** (`mocks/contact.ts`)
  so the visible text matches the metadata. `NEXT_PUBLIC_SITE_URL` is still
  `https://example.com` — must be set to the real domain before launch.

- **Tablet/mobile responsive pass + hydration fix**:
  - **Root font-size no longer balloons on small tablets** (`app/globals.css`): the mobile
    tier was `font-size: 4.444vw` (base 360), which kept scaling _up_ across its whole 0–640
    range — by ~620px the root hit ~28px and every heading/stat/card overflowed, then snapped
    to ~10px at 641px. Replaced with `clamp(12px, 1.5625vw, 16px)`: a readable 12px floor,
    continuous with the 1024 tier at the 640 boundary, never ballooning. (The `AdaptiveGrid`
    JS still handles scale-**up** above 1440 via `GRID_BASE_WIDTH`; unchanged.)
  - **Hero title never breaks mid-word** (`views/hero-title.tsx`): letters were `inline-block`
    with no word grouping, so narrow viewports wrapped "into" as "i / nto". Now each word's
    letters sit in an `inline-block` wrapper with real breakable spaces between words (mirrors
    `<AnimatedHeading>`); the per-letter stagger index is precomputed in the memo. Also
    dropped the mobile hero title a step (`text-4xl` base) and **hid the insight body
    paragraph on mobile** (`views/hero.tsx`, `sm:block`) so the hero breathes.
  - **Showcase = cards on touch** (`views/showcase.tsx`): the hover-reveal columns showed
    blank on mobile/tablet (no hover). Now a 2-col grid of rounded cards with the photo
    **always visible** (dark scrim + white label) below `lg`; the full-height hover columns
    return at `lg`. The heading/CTA moved into normal flow above the cards on mobile, staying
    an absolute top-right overlay on `lg`.
  - **Works metadata row fits mobile** (`views/works.tsx`): `View project` is now
    `whitespace-nowrap` (one line), the grid gained horizontal `gap`, and the name truncates
    / shrinks below `sm`.
  - **Footer heading wraps to two lines** (`views/site-footer.tsx`): `max-w-[14ch]` forces
    "Have questions?" / "Let's talk." on mobile/tablet (unconstrained on `lg`); added
    `mt-16` above the link-column divider so it clears the CTA when the flex spacer collapses.
  - **Hydration mismatch fixed** (`views/works.tsx`): the 3D card-stack's `Math.sin/cos`
    transforms serialised differently in react-spring's SSR vs. client paths (full-precision
    - numeric opacity on the server, rounded + string on the client), tripping a hydration
      attribute mismatch. The values are numerically identical and react-spring overwrites them
      imperatively on mount, so the three animated leaves carry `suppressHydrationWarning`.
- **WebGL scenes render only while on-screen** (`lib/three/chain-scene.ts`,
  `lib/three/plasma-burst-scene.ts`): the hero burst + both chrome models each ran a
  continuous rAF loop even off-screen (the main scroll-jank cause). Loops are now gated on an
  `IntersectionObserver`, and the chain/heart shader is precompiled right after the GLB loads
  so it doesn't hitch on first view. See [[decisions-log]] ADR-0016.

## 2026-07-04

- **Hero intros fire earlier + the rest of the hero animates** (`components/common/preloader.tsx`,
  `views/hero.tsx`, `components/common/use-reveal-cascade.ts`): the preloader now flips the
  `done` flag **partway through its slide-up** (`DONE_AT = A + 0.6·(1−A)` — ~380ms sooner)
  instead of at the very end, so the hero intros start as the loader clears (no dead pause).
  The non-heading hero elements — the three stats, the insight title, the insight body, and
  the CTA row — now do a soft staggered reveal (opacity + blur(10px→0) + 20px rise) gated on
  the same flag. `useRevealCascade` gained an optional `{ startWhen }` — start on a boolean
  flag instead of the default IntersectionObserver (the hero is on-screen behind the loader,
  not scroll-triggered); existing scroll-triggered consumers are unchanged.

- **Hero intros wait for the preloader; 3D burst gets an intro** (`hooks/use-preloader.ts`,
  `components/common/preloader.tsx`, `views/hero-title.tsx`, `views/plasma-burst.tsx`,
  `lib/three/plasma-burst-scene.ts`): added a tiny Zustand `usePreloader` store (`done`
  flag). The Preloader flips it on completion; the hero title's per-letter cascade now
  early-returns until `done` (so it plays on the revealed page, not hidden behind the
  loader). The hero **plasma burst** gained an intro gated on the same flag — it stays
  hidden (`uAlpha` 0, group scaled down) until the loader finishes, then **fades in +
  scales up (0.45→1) + spins up** (a decaying `+3.2 rad/s` boost) over ~1.4s (easeOutCubic).
  Reduced motion shows the burst fully at once. Replaced the burst's old on-mount `appear`
  clock with this `started`-gated intro.

- **Soft card reveal in the Stats + Product bentos** (`views/stats.tsx`, `views/product.tsx`):
  the bento cards in the second section (Stats) and the pre-footer section (Product) now do
  a very soft staggered reveal on scroll — **opacity + blur (12px→0) + a gentle 24px rise**,
  `easeOutQuart`. Both previously used `<Inview>`, which snaps in this project (react-spring
  self-springs don't run — ADR-0015); they now drive the reveal off the shared ticker via
  the shared **`useRevealCascade`** hook (one `p` 0→1 on scroll-in, per-card stagger via
  `localProg`), each card an `animated.article`. Both views became client components; the
  old `RISE`/`SPRING` Inview constants were dropped.

- **First-load preloader** (`components/common/preloader.tsx`, mounted in `app/layout.tsx`;
  `--preloader-from`/`--preloader-to` tokens in `globals.css`): a white overlay (`z-[100]`)
  with the centred Stride logo, a thick pale→royal-blue gradient bar that fills left→right
  along the bottom, and a big counter (hero-heading scale — `text-5xl/6xl/8xl font-light`)
  that tracks the fill edge (sits just above the bar) and counts 0→100%. On completion the
  **same bottom bar scales up** (`scaleY` from its thin strip to full-screen) **while the
  whole overlay — logo, counter and bar together — slides up** to reveal the page, then the
  component unmounts. The bar is rendered last (on top), so as it grows it covers the
  counter and logo. All motion is one ticker-driven value `m` 0→1 (react-spring self-
  springs don't run here — ADR-0015); the counter text is written imperatively. Reduced
  motion isn't special-cased (it's a brief timed intro, not scroll-reactive). SSR-rendered
  so it covers the page from first paint.

- **About heading joins the per-letter reveal; chips scale in** (`views/about.tsx`,
  `components/common/use-reveal-cascade.ts`): the About statement headline previously used
  a whole-block `<Inview>` reveal (its inline icon chips + dual colour blocked the string-
  only `<AnimatedHeading>`). Extracted the shared cascade timing into a **`useRevealCascade`**
  hook (react-spring `p` 0→1 driven from the shared ticker on scroll-in; `<AnimatedHeading>`
  now uses it too) and hand-assembled the About h2 on one staggered timeline: the text
  animates letter-by-letter (rise + blur + fade) exactly like the other headings, and each
  round icon chip **scales up** (`0.3→1`) out of a blur + fade. The `<h2>` keeps the full
  `aria-label`; letters/chips are `aria-hidden`. About became a client leaf.

- **Per-letter heading reveal rolled out to h1/h2** (`components/common/animated-heading.tsx`
  - `views/{showcase,product,works,contact-form,site-footer,chain}.tsx`): generalised the
    hero title's letter cascade into a reusable `<AnimatedHeading>` — same ticker-driven
    per-letter rise + blur + fade (ADR-0015 mechanism), but triggered when the heading
    **scrolls into view** (IntersectionObserver) rather than on mount. Words stay unbreakable
    (letters are inline-block inside inline-block words) so headings still wrap; the tag keeps
    the full `aria-label` with `aria-hidden` letters; reduced motion renders static. Applied
    to the Showcase / Product / Works / Contact / Footer h2s; the Chain h2 keeps its
    white→muted gradient via an `alpha` per-letter opacity ramp (its `bg-clip-text` gradient
    was dropped, since it can't survive per-letter transforms). **Excluded:** headings
    containing digits (a built-in guard — per request; none currently qualify, the stat
    numbers aren't headings) and the **About** h2 (inline icon chips + dual colour make a
    clean per-letter split impractical — it keeps its existing `<Inview>` block reveal). (`views/hero-title.tsx`, `views/hero.tsx`):
    the display heading now reveals letter-by-letter on load — each letter rises from just
    below, fading up out of a soft blur, in a smooth left-to-right `easeOutQuart` cascade.
    The old per-line inverted gradient is preserved as a per-letter target-opacity ramp; the
    `<h1>` keeps its full `aria-label` (letters `aria-hidden`); reduced motion jumps to the
    revealed state. **Notable:** this had to bypass `spring-text-engine` — that engine
    (`0.1.5`, latest) doesn't animate under `@react-spring/web@10` (snaps to end on mount),
    and react-spring's own self-running springs don't progress in this project either. The
    only mechanism that animates here is driving a spring value each frame from the shared
    ticker (as hero/works/chain do), so the letters use that. Full diagnosis + the scoped
    exception to the "text uses spring-text-engine" rule: [[decisions-log]] ADR-0015; warning
    added to [[text-engine]].

- **Site-wide: blue text → black; unified button style** (`views/hero`, `about`,
  `showcase`, `product`, `contact-form`, `site-footer`, `works`): recoloured every
  `text-plum` (deep navy/purple that reads blue) to `text-black` — about/showcase/contact
  headings, showcase labels, product & showcase section defaults, contact status, and the
  hero primary button's label (the **header** is deliberately left on `text-plum`).
  Standardised all buttons (except the header pill) to the hero spec —
  `rounded-full px-6 py-3 text-sm font-medium`, normal case: the contact **Send** button
  lost `px-20 py-4`/`uppercase`/`font-semibold` and is now a black pill; the Works "View
  project" lost `text-xs uppercase tracking-widest`/`px-4 py-2`; product `px-7`→`px-6`.
  Outline buttons stay outline (showcase, footer CTA, Works) but adopt the same size/text.
  Removed the decorative arrows (footer CTA `→`, Works `↳`). New convention documented in
  [[design-system]] (Buttons).

- **Footer link grouping + heart raised** (`views/site-footer.tsx`, `views/footer-scene.tsx`):
  the link nav went from an even 4-col grid to two `justify-between` groups — LINKS +
  SITEMAP hug the left (SITEMAP close to LINKS), CONTACT + FOLLOW US sit at the right so
  FOLLOW US's right gutter matches LINKS's left (48px both, symmetric to the page edges).
  Heart settle nudged back `.53` → `.5` (centred; its pointed tip falls in the empty gap
  between the two link groups, no text overlap).

- **Portfolio heading + caption** (`views/works.tsx`): moved the "Our Portfolio" heading
  down (`top-10` → `top-24`) so the fixed header no longer overlaps it. In the caption
  row (now a `grid-cols-[1fr_auto_1fr]`), the case name is centred and restyled to match
  the product card text ("Fully hands-off" → `text-2xl leading-snug tracking-tight`,
  dropping `font-medium`); the year was removed (span + `yearElRef` + its ticker update
  deleted; `WorkItem.year` stays in data).

- **Footer → full-height, centred, heart in the middle** (`views/site-footer.tsx`): the
  footer is now a full-viewport column (`min-h-lvh flex flex-col`). Removed the brand-mark
  (`N`) + tagline row; the "Have questions?" heading and its jump-to-form CTA are centred
  at the top (`items-center text-center`). A `flex-1` spacer opens the centre so the
  `FooterScene` chrome heart settles at the footer's vertical middle, and the link columns
  - bottom bar are pushed to the base (nav gained a `border-t` divider). Dropped the now
    unused `tagline` from the destructure (the `FooterContent.tagline` field stays in data).
  * **Follow-up:** removed the bottom bar (copyright + credit; those fields stay in data)
    so the link columns sit at the very base. Footer gutters retuned to the **hero**
    scale (`px-6 md:px-10 lg:px-12`) with a matching bottom pad (`pb-6 md:pb-10 lg:pb-12`),
    and the nav's top divider is now full-bleed (`-mx-6 … lg:-mx-12` + re-inset `px`) so the
    line runs edge-to-edge. Nudged the heart's settle from `.5` → `.53` (the ±9 fall range
    is ~280px/0.1, so this is a small drop that stays clear of the links).

- **Product header centred; contact heading + inputs restyled** (`views/product.tsx`,
  `views/contact-form.tsx`): the Product block dropped its right-hand lead paragraph and
  now centres the heading + CTA (`flex flex-col items-center text-center`). The contact
  form's intro heading lost its `uppercase`/bold `text-lg` treatment for the card text
  style (`text-2xl leading-snug tracking-tight`, weight 400), centred; and the form
  fields were recoloured black (input text `text-black`, underline `border-black/25`,
  status dot `bg-black`).

- **Product bento recolour** (`views/product.tsx`, `public/assets/images/6th.png`): the
  wide "Capital that compounds" card swapped its `bg-lilac` fill (+ plum gradient) for a
  full-bleed `6th.png` photo via **next/image** (`fill`/`object-cover`) with black text.
  The two dark-purple cards ("Always liquid…", "Fully hands-off") are now light grey
  (`bg-card-gray` = #EDEDF0) with black text. The block heading ("What is Northwind?") and
  its "Explore now" CTA were recoloured black (`text-black` / `bg-black`).

- **Hero plasma — filaments magnetise to the cursor** (`lib/three/plasma-burst-scene.ts`,
  `views/plasma-burst.tsx`): the burst's filament tips now lean toward the pointer. The
  leaf tracks the pointer (window `pointermove`, NDC relative to the canvas rect, `active`
  = over the hero) and feeds a `pointer()` getter to the scene. The line **vertex shader**
  gained `uPointer`/`uMagnet`/`uTanHalfFov`/`uAspect`: it transforms each vertex to view
  space, reconstructs the cursor's view-space xy at that depth, and `mix`es the vertex
  toward it by `uMagnet · aAlong²` — base anchored at the core, tips pulled most, applied
  post-modelView so the lean tracks the cursor on screen regardless of the turntable spin.
  Strength (0.38) and the pointer position both ease in/out per frame for a smooth
  attract/release; disabled under reduced-motion (static frame, no pointer). Verified in
  preview — filaments lean left vs right as the cursor crosses the hero.
  - **Proximity gating** (follow-up): only filaments whose tips are near the cursor cling,
    not the whole burst. Added `uMagnetRadius` (0.9 view units) and a Gaussian falloff
    `prox = exp(−dist²/radius²)` on the view-space tip↔cursor distance, folded into the
    pull (`uMagnet · aAlong² · prox`). Far filaments (prox→0) stay put; a local cluster
    reaches toward the pointer.

- **Smooth scroll made perceptible + properly integrated** (`layouts/scroll-layout.tsx`,
  `app/globals.css`): the Lenis integration existed but was subtle and missing its
  integration CSS. Added Lenis's official CSS (`html.lenis`, `.lenis.lenis-smooth`, …) so
  the `lenis-smooth` class engages and native `scroll-behavior` can't fight the
  interpolation; lowered the glide `lerp` to `0.08` (from the `0.1` default) for a longer,
  clearly-felt smooth scroll; and gated `smoothWheel` behind `prefers-reduced-motion`.
  Verified by sampling the wheel-scroll interpolation (eases out over ~14 frames) — every
  scroll-driven effect rides the same smoothed scroll. See [[smooth-scroll]].

- **Portfolio cards fly continuously; central card un-dimmed** (`views/works.tsx`): the
  scroll→index map now runs a _small_ amount past each end
  (`p·(count−1 + 2·OVERSCAN) − OVERSCAN`, `OVERSCAN = 0.2`). A first attempt used a full
  card past each end (`−1 → count`), but that left a dead lead-in (first card a whole
  step below centre with empty space above) and an early exit (last card a whole step
  gone before you leave the block). The 0.2 fraction keeps the end cards essentially
  centred with only a hint of motion — no gap on entry, the last card doesn't leave
  early, and neither freezes perfectly still. The per-card black scrim is now distance-scaled
  (`opacity = min(0.35, |i − f|·0.22)`), so the **focused/central card is fully clear**
  and only the receding neighbours dim.

- **Chain spin — softened scroll acceleration** (`views/chain.tsx`): dialled the chain's
  scroll→spin coupling down in steps to a calm `spinAccel 0.00004 / maxSpin 0.045` (from
  `0.0004 / 0.5`, via `0.0002 / 0.3` and `0.00008 / 0.11`) — scrolling now nudges the turn
  only slightly above idle instead of whipping it around. Note: the intermediate
  reductions _looked_ ineffective because the chain's `useEffect([])` scene wasn't
  re-mounting on Fast Refresh (stale scene kept the old value); a clean `.next` restart
  applied it. Verified with a scroll-burst A/B — consecutive frames now show only a small
  rotation delta vs a large swing before.

- **Chain scene — tunable scroll→spin coupling; stronger chain acceleration**
  (`lib/three/chain-scene.ts`, `views/chain.tsx`): `createChainScene` gained optional
  `spinAccel` (rad added to the spin per px of scroll) and `maxSpin` (rad/frame cap)
  overrides, both defaulting to the existing `SCROLL_ACCEL`/`MAX_SPIN` so the footer
  heart is unchanged. The chain passes a much stronger `spinAccel: 0.0004` / `maxSpin:
0.5` so its rotation visibly accelerates while scrolling and eases back to idle. Note:
  the previous turn's scroll-spin + slow-drift changes weren't taking effect live — the
  chain's `useEffect([])` scene setup wasn't re-running under Fast Refresh; a clean
  `.next` restart applied them (drift + spin verified fresh).

- **Chain block — hero-scale aside, opaque tagline, eased + scroll-spun model**
  (`views/chain.tsx`): the bottom-right aside ("when it matters most") now uses the
  hero display scale (`text-8xl`, was `text-[4rem]`); it keeps its muted `text-white/40`.
  The bottom-left tagline lost its opacity (`text-white/60` → `text-white`). **Model
  feel:** the fall target is now low-passed (`fall += (target − fall)·0.12`) so it eases
  toward the scroll position instead of tracking it 1:1 — fixes the rigid "втыкается
  колом" feel and smooths the phase change. Switched the chain to scroll-momentum spin
  (`scrollSpin: true`, was `false`) so scrolling accelerates the model's turn and eases
  back to idle. The shared ticker runs every frame (framerate 0), so the eased value
  keeps converging after scroll stops.

- **Chain block — hero-scale heading, balanced padding, model slow-drift exit**
  (`views/chain.tsx`): the section heading now uses the hero's display scale
  (`text-5xl sm:text-6xl lg:text-8xl`, was `2rem/2.5rem/4rem`). The overlay's bottom
  padding was split out to match the horizontal gutter (`px-6 pb-6 pt-5 md:px-10
md:pb-10 lg:px-12 lg:pb-12`, matching the hero overlay) so the gap below the content
  equals the side insets. **Model motion reworked:** it no longer counter-scrolls to
  hold dead-centre through the pin and then drop abruptly. Travel is now driven off the
  layered **wrapper's** scroll (the pinned section's `rect.top` is frozen at 0) in two
  continuous phases — fly-in (`wrap.top` vh→0: top edge → centre) then a slow drift
  (`wrap.top` 0→−pinDist: centre → out the bottom, `pinDist ≈ Product height`). The
  drift is far slower than the fly-in, so the chain gently keeps falling as the Product
  slides up over it instead of stopping. Removed the `CENTER_TRACK` constant.

- **Stats block — photos, avatar circles, blue data card, heading-scale numbers**
  (`views/stats.tsx`, `views/about.tsx`, `public/assets/images/2nd/`): the collaboration
  card now shows a `people.png` photo full-bleed (next/image `fill`/`object-cover`) under
  its existing gradient + white number box. The commitment card's avatar stack swapped
  flat colour discs for real avatar photos (`avatars/1–4.png`) in `overflow-hidden
rounded-full` circles. The green data card (`bg-accent-lime`) is now blue (`bg-card-blue`,
  white text). All four card figures now use a shared `STAT_NUM` class matching the block
  heading's display scale (`text-[2rem]/sm:2.5rem/lg:4rem font-light`) instead of the old
  `text-5xl/7xl`. The About lead heading was narrowed (`max-w-7xl` → `max-w-4xl`) so it
  wraps to three lines.

- **Showcase columns reveal real photos through the mask, with a scaling white scrim**
  (`views/showcase.tsx`, `data/mocks/home.ts`, `public/assets/images/3rd/`): the third
  section's four columns now reveal a real photo (`approach.png`, `technology.jpg`,
  `security.jpg`, `team.jpg`, served via **next/image** `fill`/`object-cover`/`sizes`)
  instead of the flat gradients. The existing hover `clip-path` mask (`inset(100%…)` →
  `inset(0%…)`) now wipes the image in bottom-to-top. Behind the caption a white
  semi-transparent gradient (`bg-gradient-to-t from-white via-white/80 to-transparent`,
  `h-1/2`, `origin-bottom`) scales in on hover (`scaleY(0)` → `scaleY(1)`) so the dark
  `text-plum` label keeps good contrast over the photo. Both are `<Hover>` springs
  (ADR-0002) driven off the column ref; the heading + outline CTA overlay is unchanged.
  `ShowcaseItem` gained an `image` field; dropped the `GRADIENTS` array.

## 2026-07-03

- **Portfolio — blurred image backdrop that drifts up on scroll** (`views/works.tsx`):
  replaced the flat `bg-card-dark` behind the card stack with a layer of the six
  portfolio photos (blurred `blur-2xl`, small `sizes="60vw"`/`quality=30`), each
  cross-fading by proximity to the focused index (`opacity = 1 − |i − f|`) and drifting
  bottom-to-top (`translateY((i − f)·22%) scale(1.6)`) off the same spring `f` the cards
  use — so the backdrop always matches the focused card and floats with scroll. A
  `bg-card-dark/55` scrim keeps the cards + caption dominant. Decorative (`alt=""`),
  behind everything (first child, cards/caption keep their z-index).

- **Portfolio cards use real photos** (`views/works.tsx`, `data/mocks/home.ts`,
  `public/assets/images/portfolio/`): replaced the placeholder gradient card fills with
  the six portfolio images (`1.jpg`–`6.jpg`) served via **next/image** (`fill`,
  `object-cover`, `sizes`), each with `alt` = the project name. Added a subtle
  `bg-black/25` scrim over each so the centred white caption stays legible. `WorkItem`
  gained an `image` field; dropped the `GRADIENTS` array.

- **Works cards no longer collide; Showcase heading padding balanced**
  (`views/works.tsx`, `views/showcase.tsx`): the portfolio card stack's cylinder
  `RADIUS` went 1020 → 1350px, so the vertical spacing between adjacent cards
  (`RADIUS·sin(STEP)`) is ~730px — well clear of the ~460px card height, fixing the
  cards crashing into each other (worst at mid-transition). The Showcase heading was
  hugging the centre grid line (0px) with 48px on the right; it now sits in the right
  half inset **equally** (`lg:left-1/2 lg:right-0 lg:px-12` → 48px from the centre line
  and 48px from the right edge), verified 48/48.

- **Hero heading — per-line alternating gradient** (`views/hero.tsx`,
  `data/mocks/home.ts`): the `h1` was one `bg-clip-text` gradient spanning both lines;
  now each line is its own gradient span with the fade direction **alternating**
  (line 1 `bg-gradient-to-r` white→muted, line 2 `bg-gradient-to-l` muted→white) to
  match the Figma. Content changed `title: string` → `titleLines: string[]`
  (`["Turn balance into", "momentum"]`); the `h1` carries `aria-label` = the joined
  lines so its accessible name stays intact. Also bumped the gap from the insight
  copy to the CTAs again (`mt-10 → mt-16`).

- **Header + hero polish** (`views/site-nav.tsx`, `views/hero.tsx`): split the header
  into a **separate brand pill and links pill** (were one plaque) and gave the brand
  pill, links pill, and "request a demo" button a shared explicit height (`h-11`) so
  all three are exactly equal (items-center, no reliance on stretch). Hero overlay:
  **bottom padding now equals the side padding** (`pb-6 md:pb-10 lg:pb-12` matching
  `px-*`, was a flat `py-5`); stat labels ("User Reviews" etc.) and the vertical
  dividers are now **full opacity** (`text-white`/`border-white`, were `/60` and `/20`);
  and the gap from the insight title+paragraph to the CTAs grew (`mt-6 → mt-10`).

- **Nav → single fixed site header** (`views/site-nav.tsx`, `views/home.tsx`,
  `views/hero.tsx`, `views/chain.tsx`, `data/mocks/home.ts`): `SiteNav` is now
  `position: fixed` at the top of the viewport with **symmetric insets** (top = sides:
  `inset-x-4 top-4 md:inset-x-6 md:top-6`) and the "request a demo" button stretched to
  the left pill's height (`items-stretch` on the header + `inline-flex items-center` on
  the button). It's rendered **once** in `home.tsx` (as a sibling before `<main>`, so
  it's a real banner landmark and sits outside the hero's transformed overlay — a
  `fixed` child of a `transform`ed ancestor would be positioned wrong). Removed the two
  inline copies (hero overlay + chain overlay — the latter was the duplicate to kill).
  Content model: `HomeContent.nav: SiteNavContent` (shared `siteNav`); `HeroContent`
  dropped `brand`/`nav`, `ChainContent` dropped `nav`; hero/chain headings gained
  `mt-24` to clear the fixed header. The pill's dark backdrop keeps the nav legible over
  light sections; the white button carries a `shadow-sm` for definition there.

- **Section headings scaled down 1.5×** (`views/about.tsx`, `works.tsx`, `product.tsx`,
  `site-footer.tsx`, `chain.tsx`, `showcase.tsx`): every non-hero display heading had
  its size ramp divided by 1.5 — `text-5xl/sm:text-6xl/lg:text-8xl`
  (3/3.75/6rem) → `text-[2rem]/sm:text-[2.5rem]/lg:text-[4rem]`; the showcase ramp
  (…`lg:text-7xl` = 4.5rem) → `lg:text-[3rem]`; the chain "when it matters most" aside
  `text-8xl` → `text-[4rem]`. The hero `h1` is unchanged, so the sections now read a
  step below it. (These headings share the same type — a candidate for a shared
  `<DisplayHeading>` component per [[design-system]] ADR-0012.)

- **Showcase — heading + outline CTA over the interactive columns** (`views/showcase.tsx`,
  `data/mocks/home.ts`): kept the hover-reveal gradient columns (`<Hover>` clip-path,
  ADR-0002) and _added_ the reference elements over them — a display heading + outline
  CTA top-right (`pointer-events-none` wrapper so column hover still works; the button
  re-enables its own), the thin vertical column lines (`divide-x divide-plum/10`), and
  de-capitalised base labels (`text-plum`, no `uppercase`). `ShowcaseContent` gained
  `heading` + `cta`, dropped `label`. New sentence-case copy: heading "Thoughtful
  engineering behind every detail", CTA "Explore the platform".

- **WebGL scenes release their context on dispose** (`lib/three/chain-scene.ts`,
  `gradient-background-scene.ts`, `plasma-burst-scene.ts`): added
  `renderer.forceContextLoss()` after `renderer.dispose()`. On dev remounts
  (StrictMode double-invoke / HMR) the effect re-ran and `new WebGLRenderer({canvas})`
  failed with "Canvas has an existing context", silently killing the scene — which is
  why the footer chrome heart (and other models) intermittently vanished. Releasing the
  context lets a remount attach a fresh renderer to the same canvas.

- **Chain section — Figma UI overlay + shared `<SiteNav>`** (new `views/site-nav.tsx`,
  `views/chain.tsx`, `views/hero.tsx`, `data/mocks/home.ts`, `views/home.tsx`):
  brought the chain section's UI over from Figma (node 459:623) — the marketing nav,
  a "Financial momentum" `h2` (top-left, hero gradient type), a bottom-left paragraph,
  and an oversized muted "when it matters most" phrase (bottom-right, `lg:` only). The
  overlay sits over the chrome-model canvases (z-10) and gets covered by the Product
  as it slides up (unchanged two-layer reveal); the model animation is untouched.
  Extracted the nav (previously inline in the hero) into a reusable **`<SiteNav>`**
  (`{brand, items, cta, navLabel}`) used by both hero and chain, per [[design-system]]
  ADR-0012. `ChainProps` is now `{ content: ChainContent }` (heading/tagline/aside/nav,
  replacing the old `label`); the nav content is a shared `siteNav` object in the mock.

- **Product texts restyled; footer wordmark removed + heading to 2 lines**
  (`views/product.tsx`, `views/site-footer.tsx`, `data/mocks/contact.ts`): the product
  lead ("Northwind is a smart…") and the three card titles ("Capital that…", "Always
  liquid…", "Fully hands-off") now use the stats quote style
  `text-2xl leading-snug tracking-tight` (regular weight, was `text-3xl font-medium` /
  `text-2xl font-medium`); colours unchanged. Removed the oversized "Northwind"
  wordmark from the footer (dropped the `wordmark` field from `FooterContent` + mock)
  and widened the heading column (`lg:grid-cols-2 → lg:grid-cols-[1fr_1.8fr]`, dropped
  `max-w-md`) so "Have questions? Let's talk." lands on **2 lines**. Footer file
  comment refreshed (blue gradient + chrome heart, no wordmark).

- **Stats numbers/paragraphs matched to the hero type** (`views/stats.tsx`): the four
  stat values (120+, 99.99%, 520k+, 60+) now use the hero stat-number style
  `text-5xl font-light leading-none sm:text-7xl` (were `text-6xl/7xl font-medium`), and
  the collab desc / commitment eyebrow / data desc use the hero paragraph style
  `text-base leading-relaxed` (were `text-sm`/`text-lg`). Text colours unchanged.

- **About heading widened + contrast fix; stats cards blackened; Works → "Our
  Portfolio"** (`views/about.tsx`, `views/stats.tsx`, `views/works.tsx`,
  `data/mocks/home.ts`): widened the About statement heading (`max-w-5xl → max-w-7xl`)
  so it wraps to **3 lines**, and recoloured it `text-foreground → text-plum` (the
  eyebrow dot too) — `--foreground` flips light under dark scheme, so it read as
  low-contrast grey on the white section; `--plum` is stable. Stats bento cards now use
  **`text-black`** everywhere (blue/grey/lime cards) except the dark reach card, which
  keeps `text-white` — replacing the flip-prone `text-foreground`. Renamed the Works
  heading **"Our Works" → "Our Portfolio"**, now rendered from props (was a hardcoded
  `Our<br/>Works`), **centred** and on a **single line**.

- **Section headings unified to the hero display type** (`views/about.tsx`,
  `views/works.tsx`, `views/product.tsx`, `views/site-footer.tsx`): the About
  ("A fintech platform…"), Our Works, What is Northwind?, and footer "Have questions?"
  `h2`s now use the hero heading's size/weight/line-height —
  `text-5xl font-light leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl` (were a
  mix of `font-medium`/`font-semibold`, `text-5xl/6xl/7xl`, `leading-[0.9]`/`1.08`/
  `tight`). Consistent display-heading look across the page. (Could be extracted to a
  shared heading component later per [[design-system]] ADR-0012.)

- **Hero — UI overlay scales with the shrink; style pass** (`views/hero.tsx`): the UI
  overlay (nav / heading / stats / insight) is now an `animated.div` that scales down
  with the scroll shrink (`transform: scale(1 − p·0.1)`, transform-origin centre) so it
  recedes _with_ the collapsing card instead of drifting toward the card edge as the
  `clip-path` insets. The burst keeps its own zoom (`progressRef`), untouched. Also
  widened the insight block `max-w-md → max-w-lg` (~499px design). Paddings/type
  reviewed against the mockup.

- **Grid recalibrated to the 1440 Figma base; hero sized to the mockup; dev panels
  hidden** (`components/common/grid/grid.config.ts`, `globals.css`, `views/hero.tsx`,
  `views/plasma-burst.tsx`, `views/chain.tsx`): the layout read ~25% smaller than the
  Figma because the scaling grid's base was **1920** while the design is **1440**.
  Dropped the `{1920,1920}` breakpoint (and its `globals.css` `vw` media query) so
  **1440 is the base** — root font-size is 16px at 1440 (design 1:1) and, with the
  earlier `coef={1}`, scales up proportionally above it (2560px → `28.44px`, was
  `19.56px`). Bumped hero elements to match the mockup (stats `text-5xl`→`text-7xl`
  ~72px, insight lead `text-xl`→`text-2xl`). Hid the dev scene-tuning panels
  (`plasma-controls`, `chain-controls`) behind a `SHOW_CONTROLS = false` flag (was
  gated on `NODE_ENV`) — flip to re-enable while tuning. See [[components/common]].

- **Adaptive grid — full-proportional scale-up on large monitors** (`app/layout.tsx`):
  mount `AdaptiveGrid` with `coef={1}` (was the hook default `0.6666`). Above the base
  width (1920) the root font-size now tracks the viewport **1:1** — e.g. a 2560px
  display gets a `21.33px` root (fully proportional) instead of the damped `19.56px`,
  so the rem-based layout grows to fill big screens instead of looking small. Down-
  scaling (`vw` media queries below 1920) is unchanged; the hook still clears its inline
  font-size at/below the base width. See [[components/common]] / [[hooks]].

- **Hero — Figma UI overlay + font swap to Mulish** (`views/hero.tsx`,
  `data/mocks/home.ts`, `views/home.tsx`, `app/layout.tsx`, `globals.css`,
  new `app/fonts/`): rebuilt the hero from the Figma design — the live `PlasmaBurst`
  now sits under a full marketing overlay: a pill nav (brand + links) with a
  "request a demo", the display `h1` "Turn balance into momentum" (white→muted
  `bg-clip-text` gradient), a lower-right insight block with CTAs, and a bottom-left
  stats row. Overlay lives inside the hero's `clip-path` card so it shrinks on scroll
  with the burst. `HeroContent` (exported from `hero.tsx`) replaced the old 3-field
  hero content; all copy is props (`data/mocks/home.ts`). **Swapped the site font
  Onest → Mulish**: `next/font/google` → `next/font/local` (`Mulish-Light/Regular/
Medium.ttf` in `src/app/fonts/`, weights 300/400/500), variable `--font-mulish`;
  `globals.css` applies it on `<body>` and rebinds `--font-sans`. See
  [[design-system]] (only ≤500 ships — 600/700 synthesise).

- **Chain counter-scrolls to stay screen-centred (top-edge fly-in) + constant linear
  spin; footer heart flies in with parallax + reversed spin**
  (`lib/three/chain-scene.ts`, `views/chain.tsx`, `views/footer-scene.tsx`): added
  `spinDirection` (+1/−1) and `scrollSpin` (true default / false) options to
  `createChainScene`. The **chain** model's progress is driven off the section's live
  `getBoundingClientRect().top` as `0.5 − top/(CENTER_TRACK·vh)` (`CENTER_TRACK ≈ 3` =
  the model's fall range ÷ its on-screen range), so it **counter-scrolls** the section
  and stays locked to the screen centre while the block covers the centre: it flies in
  **linearly from the block's top edge**, holds dead-centre through the whole pin
  (section top = 0 the entire pinned range → progress .5), and exits the bottom edge.
  Its spin is **constant and linear** (`scrollSpin: false`) — a steady rate, not
  scroll-accelerated. (Superseded several same-day attempts: fall-out, fly-in-and-hold,
  a full linear descent, and a plain constant-centre — the user wanted a top-edge
  fly-in that stays centred.) The **footer heart** keeps its **parallax fly-in**
  (progress tied to the footer's scroll position, settling at centre) with
  scroll-momentum spin the **opposite way** (`spinDirection: -1`).
  `createChainScene`'s header/ADR note updated (general chrome-model scene, spin
  configurable).

- **Footer — blue mesh-gradient backdrop + centred chrome heart** (new
  `views/footer-scene.tsx`, `views/site-footer.tsx`, `globals.css`,
  `public/assets/heart.glb`): the footer's flat sage panel became the hero "mesh
  gradient" (same blue palette, a new `seed` 7.2 → different blob pattern) with a
  **chrome heart** centred over it. The heart reuses the chain's scene factory
  (`createChainScene` held at centre via a constant `progress: () => 0.5`, so it
  inherits the exact `defaultChainMaterial` chrome + idle spin) — no new model
  factory. `FooterScene` is a decorative client leaf (two stacked canvases,
  `aria-hidden`) behind the footer content (now wrapped `relative z-10`). Retuned the
  footer tokens for blue: `--footer` → dark-navy WebGL fallback, `--footer-muted` →
  cool grey; dropped `--footer-mark` (wordmark now `text-footer-fg/15`). Six live
  WebGL contexts total (hero ×2, chain ×2, footer ×2) — all verified un-lost.

- **Contact form + site footer (second pinned two-layer reveal)** (new
  `views/contact-form.tsx`, `views/site-footer.tsx`, `data/mocks/contact.ts`;
  `views/home.tsx`, `globals.css`): added a contact block and a footer below the
  product. The **contact form** is a client leaf — a bold uppercase prompt, three
  underlined fields (name + phone on a row, email below, each with a status dot) and
  a centred pill submit (local submit stub, no backend yet). The **footer** is a
  semantic `<footer>` (sage panel): brand mark + tagline, a "questions?" heading with
  a jump-to-form link, `<nav>` link columns, an `<address>` block, an oversized
  decorative wordmark, and a copyright/credit bar. They reuse the **pinned two-layer
  reveal**: the form is `sticky top-0 z-10 h-lvh`, the footer `relative z-20` (opaque
  `bg-footer`) slides up over it — wrapped in a second `relative` div in `home.tsx`
  (which also gained `id="top"` for "Back to top"). New sage footer tokens
  `--footer` / `--footer-fg` / `--footer-muted` / `--footer-mark` (see
  [[design-system]]). Form inked with `--plum` (not `--foreground`, which flips in
  dark scheme).

- **Chain model — chrome-material dev tuning panel** (`lib/three/chain-scene.ts`,
  `views/chain.tsx`, new `views/chain-controls.tsx`): made the model's chrome
  material config-driven, mirroring the hero's Plasma pattern (ADR-0014). New
  `ChainMaterialConfig` + `defaultChainMaterial` exports and a live `update(material)`
  on the scene handle; the `Chain` leaf holds the config in state and pushes edits.
  A **development-only** panel (`chain-controls.tsx`, gated on `NODE_ENV`, pinned
  top-left to clear the Plasma panel) exposes **tint, metalness, roughness,
  reflection (`envMapIntensity`) and exposure** as a colour picker + sliders with a
  copy-out JSON export. Tuned `defaultChainMaterial` is what ships in prod.

- **Chain section — pinned two-layer reveal + tuned chrome default**
  (`views/chain.tsx`, `views/product.tsx`, `views/home.tsx`, `lib/three/chain-scene.ts`):
  - Reworked the chain→product transition into a **two-layer parallax**: the chain is
    now `sticky top-0 z-10 h-lvh` inside a `relative` wrapper (`home.tsx`) that also
    holds the product, so the chain **pins** while the **product** (`z-20`, opaque
    `bg-hero-page` again) **scrolls up over it** and reads as sliding out from under the
    model — two layers at different scroll heights. (Iterates the earlier same-day
    un-pinned/transparent attempt, which gave no relative motion between the layers.)
  - The model motion is driven off `scrollY` + the section's absolute `offsetTop`
    (unaffected by sticky): `enter` 0→0.5 as it rises to pin, `pinned` 0.5→1 over the
    first `FALL_VH` viewports so the model flies in, sits centred at the pin, then
    falls out as the product covers it. The hero-style `clip-path` shrink was dropped
    (it doesn't fit a pinned layer); the `MAX_SPIN` spin clamp is retained.
  - Applied a tuned **`defaultChainMaterial`** — periwinkle tint `#a5ade3`,
    roughness `0.1`, `envMapIntensity` `2.8`, tone-mapping exposure `0.2` (darker,
    higher-contrast chrome). Dialled in via the dev panel and copied out.

## 2026-07-02

- **Chain section — fall-through + hero-style shrink; new explainer bento**
  (`views/chain.tsx`, `lib/three/chain-scene.ts`, `views/product.tsx`):
  - The chrome model now **falls through** the section on scroll (top edge →
    centre → out the bottom, `progress` 0..1) instead of stopping centred, and its
    scroll-spin is **clamped** (`MAX_SPIN`) so fast scrolls can't spin it wildly.
  - The chain block now **shrinks into a rounded inset card like the hero** as it
    scrolls (an animated `clip-path` inset+radius over the pinned range, revealing a
    white margin) — the model keeps falling while it shrinks.
  - Added a **product explainer bento** below it (`views/product.tsx`,
    `data/mocks/product.ts`): a heading + CTA and right-aligned lead, then a wide
    light card and two dark purple cards (original copy). New purple tokens
    `--plum` / `--lilac` / `--paper`. See [[design-system]].

- **Motion tuning** — slowed the chain model's scroll-driven spin (`SCROLL_ACCEL`
  0.00022 → 0.00009 in `lib/three/chain-scene.ts`) and roughly halved the hero logo
  marquee row speeds (`0.012`/`0.009` → `0.005`/`0.0038` in
  `views/logo-marquee.tsx`) — both felt too fast on scroll.

## 2026-07-01

- **Home — chrome GLB section** (`src/views/chain.tsx` + `lib/three/chain-scene.ts`):
  a pinned section where a **chrome-material GLB model** (`public/assets/chain.glb`)
  **flies in from the block's top edge** as the section scrolls into view (`entry`
  0→1, smoothstepped), then stays **centred** and **spins from scroll** — scrolling
  injects angular momentum (turns at scroll speed) and it keeps turning when idle
  (momentum eases toward a gentle constant) — over the same hero "mesh gradient" but
  with a **different blob pattern** (new `seed` uniform on
  `gradient-background-scene`). (Evolved from a top-to-bottom fall → centred
  scroll-spin → top-edge fly-in + centred spin, per successive requests.) Chrome = `MeshStandardMaterial` (metal, low
  roughness) reflecting a **PMREM `RoomEnvironment`**. The GLB is Draco-compressed,
  so a `DRACOLoader` is wired up with three's decoder copied to `public/draco/`
  (ESLint now ignores `public/**`). Two stacked WebGL layers (opaque gradient +
  transparent model), progress fed from scroll via the shared ticker. No new npm
  deps — `GLTFLoader`/`DRACOLoader`/`RoomEnvironment`/`PMREMGenerator` are all from
  `three/examples/jsm`. See [[tech-stack]] and [[decisions-log]] ADR-0014.

- **Home — "Our Works" scroll-driven 3D card stack** (`src/views/works.tsx`): a
  pinned (sticky) section over a tall scroll region; scroll progress advances a
  float index `f` and each **large, landscape** card is placed on a vertical
  **cylinder** from it (`translateY = R·sin θ`, `translateZ = R·cos θ − R`,
  `rotateX = θ`), so cards travel **bottom-to-top**, curving away top and bottom
  without self-intersecting. Depth sorting is left to `transform-style: preserve-3d`
  (no animated `z-index`). Scroll follow is jitter-free: the metadata updates via
  **refs** (no `setState` during scroll → the component never re-renders, so the
  spring interpolations stay stable), and the index is a **manually low-passed**
  value applied immediately (`api.start({ immediate: true })`) instead of a spring
  re-targeting a cross-rAF-jittery scroll read. The focused card
  drives a metadata row (`NN / NN`, name, year, a "View project" button). Motion is
  a react-spring value fed from scroll via the shared ticker (spring-based,
  ADR-0002); dark section (`bg-card-dark`). Card media are placeholder gradients
  with fictional project names (`mocks/home.ts`) — swap for real media under
  `public/assets/works/`.

- **Home — showcase columns with hover mask-reveal** (`src/views/showcase.tsx`): a
  full-width row of four full-height columns, each labelled at the bottom
  ("OUR APPROACH / TECHNOLOGY / SECURITY / TEAM"), with thin dividers. On hover the
  column's image reveals **bottom-to-top through a `clip-path` mask** (`inset(100%
0 0 0)` → `inset(0 0 0 0)`) via the spring `<Hover>` primitive. The whole column
  is the hover `trigger` (a clip-collapsed element has no hit area, so it can't
  trigger itself); hover is desktop-only per the engine's mobile-disable. Images are
  placeholder gradients (reused accent/card/muted tokens) — swap for real media
  under `public/assets/showcase/`. Content from `mocks/home.ts`.

- **Home — stats bento, hero zoom-in, lighter marquee** — follow-up polish:
  - **Stats bento section** (`src/views/stats.tsx`): a blue collaboration card + an
    inner white stat, a grey commitment/quote card with an avatar cluster, and a
    right column with a lime data-points card over a dark reach card. Inset **120px**
    from the edges (new `--spacing-page-gutter` token → `px-page-gutter`, responsive
    below `lg`). Cards reveal on scroll via `<Inview>`. New tokens `--card-blue` /
    `--card-gray` / `--card-dark`. Fintech placeholder copy in `mocks/home.ts`.
  - **Hero shrink now also zooms the figure in** — the shrink progress drives both a
    faster spin **and** a camera pull-in (`heroProgress` getter → `SPIN_MULT` /
    `ZOOM_MULT`, replacing the spin-only `spinBoost`; `<PlasmaBurst progressRef>`).
  - **Marquee** — motion is much lighter/slower (small scroll-tied drift) and the
    logos are larger; softer spring for smoothness.
  - See [[design-system]] for the new tokens.

- **Home page — scroll-shrink hero, logo marquee, about heading** — grew the home
  view from a single hero into three composed sections (`src/views/home.tsx`):
  - **Scroll-shrink hero** (`src/views/hero.tsx`): a full-bleed hero that shrinks
    into a rounded card inset 24px from the edges **as it scrolls** — shrink and
    scroll happen together (no sticky pin). The shrink is an animated `clip-path`
    inset+radius, **not** a resize, so the WebGL canvas never resizes mid-scroll (no
    churn / flicker, smooth). Driven off scroll position via the shared ticker + a
    snappy react-spring value (spring-based, ADR-0002). Added a `spinBoost` getter to
    the Plasma Burst scene + a `spinBoostRef` prop on `<PlasmaBurst>`; the hero ramps
    the turntable spin up to 5× with the same scroll progress. Also calmed the core
    shader's fast flicker term.
  - **Logo marquee** (`src/views/logo-marquee.tsx`): two rows of light-grey
    monochrome placeholder logos whose motion is **tied to scroll position** (not
    autoplay), moving in opposite directions. Each row's translate is wrapped into a
    `[-ONE_SET, 0]` band over an over-duplicated track, so it's seamless and always
    filled edge-to-edge at any width. react-spring value chasing the scroll offset
    (no CSS keyframes).
  - **About heading** (`src/views/about.tsx`): an eyebrow + large statement headline
    with two inline icon chips (blue/lime) and muted words, revealed via `<Inview>`.
    Original fintech placeholder copy from `src/data/mocks/home.ts`.
  - New tokens in `globals.css`: `--hero-page` (white card gap), `--logo` (flat
    grey), `--accent-blue` / `--accent-lime` (chip accents), `--muted` (de-emphasised
    words). See [[design-system]].

- **Hero — new burst defaults; pointer interaction removed** — dialled in a fresh
  `defaultPlasmaConfig` (fewer/dimmer filaments — 60, cooler blue-violet gradient,
  smaller sparks, softer bloom). Removed the cursor interactivity entirely: the
  mouse-tilt + pointer-energy and the click shock-front are gone — the figure now
  **just turntable-spins**. Dropped the related state/handlers/uniform pushes from
  the scene factory (the `uEnergy`/`uShock`/`uShockAmp` uniforms remain at 0). See
  [[decisions-log]] ADR-0014.

- **Hero — grainy gradient backdrop as a fragment shader** — replaced the CSS
  `hero-gradient` backdrop with a **second WebGL layer**: a static fullscreen
  fragment shader (`src/lib/three/gradient-background-scene.ts`) reproducing a
  supplied reference — a smooth "mesh gradient": soft-edged gaussian dark blobs
  over a blue field, a bright bottom-left glow + softer top-right glow. Grain was
  tried, then removed for a cleaner look; the palette was pushed to vivid cobalt
  with blue-black darks plus a saturation/contrast boost in-shader (earlier mixes
  read grey/desaturated). It renders once (and on
  resize / colour change), no loop. The `PlasmaBurst` leaf now stacks two canvases:
  the opaque gradient behind, the burst in front (still `mix-blend-lighten`, so the
  dark cloud areas let it glow through). Base + light colours are panel-driven
  (`stageColor` → base blue, `glowColor` → glow; the panel "Background" pickers are
  now **Base** / **Light**); the cloud shapes, glow positions and grain are baked
  artwork constants. The CSS `hero-gradient` utility remains as a no-WebGL fallback.
  See [[decisions-log]] ADR-0014 and [[tech-stack]].

- **Hero — full-bleed symmetric gradient backdrop** — dropped the inset + rounded
  blue "card": the hero is now edge-to-edge with no white frame. Replaced the solid
  `bg-hero-stage` with an `@utility hero-gradient` (two cyan side glows rising into a
  blue bottom-centre pool over a near-black base — symmetric, matching a supplied
  ref). Token changes: removed `--hero-page`/`--hero-inset`/`--hero-radius` (and the
  `bg-hero-page`/`p-hero-inset`/`rounded-hero` bindings); added `--hero-base`
  (near-black) and `--hero-glow` (`#2ad4ff` cyan); kept `--hero-stage` (`#1246e2`).
  The dev panel's dead "Page" picker became a **Glow** picker, so both gradient
  colours (Stage blue + Glow cyan) tune live (`PlasmaConfig.pageColor` →
  `glowColor`). The Plasma Burst still composites over the gradient via
  `mix-blend-lighten`. No visible text added. See [[design-system]] and
  [[decisions-log]] ADR-0014.

- **Hero — tuned defaults dialled in** — replaced `defaultPlasmaConfig` (and the
  `--hero-stage` token, now `#1246e2`) with a hand-tuned pass: a brighter blue
  stage, a tight bright core, straight radiating filaments (`curl: 0`), fewer
  filaments (110) with denser sparks (940), faster spin, and a cool
  cyan→blue→teal filament gradient. These are now the shipped look.

- **Hero — config-driven scene + dev tuning panel** — refactored the Plasma Burst
  factory to take a `PlasmaConfig` (exported with `defaultPlasmaConfig`) and return
  a live `update(config)`: uniform/bloom/camera/motion changes apply instantly,
  structural changes (filaments, sparks, spread, curl, **and the filament gradient
  colours**) rebuild geometry in place (renderer/composer are reused). Added
  `src/views/plasma-controls.tsx` — a **development-only** panel
  (`process.env.NODE_ENV !== "production"`) with sliders; stage/page colour pickers;
  **figure colour pickers** (filament base/inner/mid/tip + core/core-halo — the
  core-sprite colours are live uniforms, the filament colours rebuild); a live JSON
  readout; and Copy/Reset, so the model + colours can be dialled in by hand and the
  exact values copied out. The client leaf owns the config state, drives `update()`,
  and applies the stage/page colours to the DOM via the `--hero-*` CSS vars. No new
  dependencies. See [[decisions-log]] ADR-0014.

- **Home hero — Three.js "Plasma Burst" WebGL scene** — built the first real home
  view: a full-viewport white page framing a **blue rounded stage** (20px inset,
  16px radius) that hosts a real-time WebGL burst — a white-hot core erupting into
  hundreds of electric-violet filaments with twinkling **white** sparks, turntable
  spin, mouse-tilt, and a click shock-front. New dependency **`three` `0.143.0`**
  (+ `@types/three`); this is canvas/WebGL artwork, a different medium from the
  spring engine, so ADR-0002 was scoped to DOM/UI motion and the scene is exempt
  (it owns its own rAF loop). New: `src/lib/three/plasma-burst-scene.ts` (framework-
  agnostic scene factory), `src/views/plasma-burst.tsx` (`"use client"` leaf),
  `src/data/mocks/home.ts` (placeholder hero copy). `HomeView` stays a Server
  Component. The scene renders on black and is composited over the blue stage with
  CSS `mix-blend-lighten`; sparks recoloured to white shades and the scene tuned
  (camera, bloom, brightness, core) for the blue-stage composition. Honours
  `prefers-reduced-motion` (static frame). New `globals.css` tokens: `--hero-page`,
  `--hero-stage` (`#1e40af`), `--hero-inset` (20px), `--hero-radius` (16px). Removed
  the starter `body` flex-centering (an empty-page placeholder) so full-width
  layouts work. See [[decisions-log]] ADR-0014 and [[tech-stack]].

## 2026-06-07

- **Fixed `<Inview>` standalone reveal + spring resize gating** — `<Inview>`
  never animated unless an external `trigger` ref was passed. The JSX `ref`
  callback wrote `inViewRef.current = node`, but that tuple slot is a _callback
  ref_ (`setNode`), so the element was never observed and the `node` stayed
  `null`. Now calls `setInViewNode(node)`. This was also a build-breaking type
  error. Additionally, `<Inview>`, `<Spring>`, and `<Hover>` tracked `width` as a
  hook dependency but never passed it to `isMobileDisabled` — fixed by passing the
  tracked `width`, restoring resize re-evaluation and clearing the
  `react-hooks/exhaustive-deps` warnings. `yarn build` and `yarn lint` are now
  clean. See [[decisions-log]] ADR-0013 and [[components/animation-springs]].

## 2026-06-05

- **Home view emptied** — removed the animation showcase (`src/views/home-showcase.tsx`
  deleted) and reduced `HomeView` to an empty `<main>`. The home view is now the
  blank starting point for new work. Documented the convention — _if the project
  is empty and no other instructions are provided, start developing in the home
  view on route `/`_ — in [[ai-agent-guide]] and [[new-page]].

## 2026-05-23

- **README — setup + Vercel deploy steps added** — _Getting started_ expanded
  into a four-step flow (clone the template → delete bundled `.git` →
  initialise your own GitHub repo → install & run), with a macOS hint for
  revealing the hidden `.git` folder (`⇧ + ⌘ + .`). Added a _🚀 Deploy to
  Vercel_ section covering the CLI flow (`vercel` / `vercel --prod`) and the
  dashboard import path, plus an `env pull` pointer to
  [[environment-variables]].
- **README rewritten to lead with the AI workflow** — root `README.md`
  reorganised so the AI usage guide is the first section: how the three
  `.claude/settings.json` hooks (`SessionStart`, `UserPromptSubmit`, `Stop`)
  enforce the vault workflow automatically, how to write a good request
  against this convention layer, and a cost-expectations note recommending
  **Claude Max (5×)** as the minimum plan (the vault-fan-out + hook
  re-injection on every turn is token-intensive by design). Technical
  _Getting started_ and the existing AI-agents entry-point pointer stay
  below.

## 2026-05-22

- **Styling-placement convention added** — to stop `globals.css` accumulating
  hundreds of component-specific classes, styling now follows a strict
  placement order: one-offs are Tailwind utilities, repeated patterns become
  **React components** (not `@layer components` classes), and `@layer
components` is reserved strictly for pseudo-elements and third-party
  overrides. `globals.css` stays bounded — `@import`, tokens, base resets only.
  No CSS Modules. Codified in [[decisions-log]] ADR-0012; [[design-system]]
  (new _Where a style goes_ section) and [[component-conventions]] updated.
- **Semantic-HTML / SEO-markup convention added** — new [[html-semantics]]
  rulebook: landmarks, one `<h1>` + heading outline, native elements over
  `div`s, forms/images/ARIA, JSON-LD over microdata, a `data-*` convention, and
  passing a semantic `tag` to animation components. Codified as AGENTS.md hard
  rule #10; cross-linked from [[component-conventions]] and [[new-page]]. Fixed
  the demo (`home-showcase.tsx`) to a single `<h1>` to follow it.
- **API layer added** — a convention for reaching external services.
  `app/api/<resource>/route.ts` Route Handlers own their logic and read secret
  env vars directly (safe — route files never reach the browser). New: `zod`
  dependency; `src/env.ts` (validated env, public/server split); `src/lib/api/`
  (`handle` wrapper + `ApiError` + `{ data }`/`{ error }` envelope);
  `src/lib/api-client.ts` (typed same-origin fetch); example
  `app/api/contact/route.ts`. Codified as AGENTS.md hard rule #9. See
  [[decisions-log]] ADR-0011 and [[api-architecture]].

## 2026-05-21

- **Asset convention added** — site content assets (images, videos) now live
  under `public/assets/<section>/`, one folder per section; meta/PWA/SEO assets
  stay at the `public/` root. Documented in [[folder-structure]],
  [[component-conventions]], and the [[new-page]] playbook; `public/assets/`
  created with a `.gitkeep`.
- **SEO & performance hardening** — a broad pass on the starter. **SEO:** new
  `src/lib/site.ts` config (single source of truth, fed by `NEXT_PUBLIC_SITE_URL`);
  `metadataBase` is now always set (relative OG/canonical URLs resolve);
  `themeColor` moved to a `viewport` export; added `app/robots.ts`,
  `app/sitemap.ts`, and an `Organization`+`WebSite` JSON-LD helper; OG image
  dimensions corrected to match the asset; dead `keywords`/`other` tags dropped.
  **Performance:** populated `next.config.ts` (`removeConsole` in prod,
  AVIF/WebP, `next/image` breakpoints aligned to the grid, `poweredByHeader:
false`); fixed a `requestAnimationFrame` leak in `ScrollLayout` (Lenis loop
  never cancelled on unmount); `HomeView` is now a Server Component with the
  animation demo split into the `HomeShowcase` client leaf; added
  `<ReducedMotion>` (honours `prefers-reduced-motion` via react-spring's global
  `skipAnimation`); removed a per-frame `console.log` from the demo; added
  `app/loading.tsx` / `error.tsx` / `not-found.tsx`. See [[decisions-log]]
  ADR-0010, [[seo-metadata]], and [[environment-variables]].
- **Animation engine — lint pass** — cleared all 13 pre-existing ESLint problems
  in the engine (2 errors + 11 warnings), an authorized engine edit (ADR-0009).
  `isMobileDisabled` now takes an optional `viewportWidth` argument, so the
  `active` memos in `<Spring>` / `<Hover>` / `<Inview>` / the trigger hooks
  depend on it genuinely. Added missing `disableOnMobile` effect deps; fixed a
  `trigger.current`-in-cleanup hazard in `<Hover>`; ref-stabilised `<Handle>`'s
  transition effects. **API change:** `useProgressTrigger` now returns `progress`
  as a `RefObject<number>` (read `.current`) instead of a render-time ref read —
  no consumer was affected (`<ProgressTrigger>` discards the return).
- **Animation engine — performance refactor** — fixed load issues that scaled
  with the number of animated components. Added `src/lib/animation/ticker.ts`, a
  single reference-counted `requestAnimationFrame` loop; `useLoop` (and all loop
  hooks) now subscribe to it instead of each starting its own rAF. `useWindowWidth`
  / `Height` / `Size` now share one debounced `resize` listener via a
  `useSyncExternalStore` store (the `debounceDelay` param was dropped — unused).
  `useDynamicInView` rewritten without the per-render `Proxy`/observer churn.
  Fixed a stale-closure bug in `useLoop`. `mode="forward"` scroll listeners made
  `passive`. This was an **authorized edit to `#do-not-modify` engine files** —
  hard rule #2 amended. See [[decisions-log]] ADR-0009 and [[animation-system]].
- **`spring-text-engine` updated** — bumped `^0.1.3` → `^0.1.5` (latest). The
  public API, types, and dependencies are unchanged between these versions
  (verified) — an internal-only patch bump, no code changes required.
- **Adaptive scaling grid added** — a root-font-size scaling system landed in
  `src/components/common/grid/` (`<AdaptiveGrid>` + `useAdaptiveGrid` hook +
  `grid.config.ts`), with `vw` media queries in `globals.css` for scale-down.
  It was dropped into `common/` as a `styled-components` system; ported to the
  project stack — config-driven TS + CSS-only Tailwind, no `styled-components`.
  The unused dropped files (`colors.ts`, `fonts.ts`, `utils.ts`, `index.ts`,
  the `styled-components` `grid.tsx`) were removed. Mounted via `<AdaptiveGrid>`
  in the root layout. See [[components/common]] and [[decisions-log]] ADR-0008.
- **Vault created** — `obsidian/` Obsidian vault initialised as the project's
  second brain. Architecture, frontend, and workflow docs populated. See [[decisions-log]] ADR-0001.
- **Root README rewritten** — replaced `create-next-app` boilerplate with a real
  project README that points into this vault.
- **`generic-layout-prompt.md` moved** — relocated from repo root to
  `obsidian/workflows/` as [[generic-layout-prompt]].
- **Navigation convention resolved** — standard `next/link` confirmed; the unbuilt
  `<AnimLink>` / `useAnimRouter()` convention dropped. See [[decisions-log]] ADR-0005.
- **Docs consolidated into the vault** — `project-specs.md` deleted (decomposed into
  vault notes + new [[environment-variables]]); `text-engine-docs.md` moved in as
  [[text-engine-reference]]. `AGENTS.md` rewritten as a thin shim; `.cursorrules`
  repointed to `@AGENTS.md`. The vault is now the single source of truth.
  See [[decisions-log]] ADR-0006.
- **Vault renamed & restructured** — vault folder `getlayers.io/` → `obsidian/`;
  number prefixes dropped from section folders (`00-meta` → `meta`, etc.). Project
  name standardised to **`next16-claude-starter`** across docs and `package.json`.
- **Components linked to docs** — every file in `src/components/` now carries a
  `// 📖 Docs:` pointer comment to its catalog note, so agents can jump from code
  to docs and back.
- **Vault workflow automated** — added `.claude/settings.json` with `SessionStart`,
  `UserPromptSubmit`, and `Stop` hooks that make agents read the vault first,
  follow the relevant guide, and update docs after every change — with no manual
  reminder. See [[decisions-log]] ADR-0007 and [[ai-agent-guide]].
- **Cookie component replaced** — the `react-cookie-consent`-based `cookie.tsx`
  was replaced by an in-house `Cookie/` component (banner + category preferences
  modal + Zustand store). `react-cookie-consent` removed from dependencies. The
  component shipped using `styled-components` + an external design system; it was
  ported to the project stack — Tailwind v4 tokens and `@react-spring/web` motion.
  Mounted via `<LazyCookie>`. See [[components/common]].
- **Fixed TextEngine spring type mismatch** — the `mode="once"` heading in
  `views/home.tsx` mixed `lineIn={{ y: 0 }}` (number) with `lineOut={{ y: "100%" }}`
  (string), throwing _"Cannot animate between \_AnimatedString and \_AnimatedValue"_.
  Changed to `y: "0%"`. The buggy pattern in [[text-engine]] / [[text-engine-reference]]
  examples was corrected and a type-matching gotcha note added.

## Project baseline (git history)

| Commit    | Description                                |
| --------- | ------------------------------------------ |
| `94b0870` | feat: update starter                       |
| `5280ef2` | fix: linter errors & build                 |
| `b2b84e6` | initial — `next16-claude-starter` scaffold |

> [!note]
> The starter shipped with: Next.js 16.2, React 19.2, Tailwind v4, `@react-spring/web`,
> `spring-text-engine`, Lenis, and Zustand. See [[tech-stack]] for the current state.
