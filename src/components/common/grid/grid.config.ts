// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Adaptive scaling grid configuration.
 *
 * The grid keeps a rem-based design proportional across viewports by scaling
 * the root (`<html>`) font-size. Each breakpoint maps a viewport `maxWidth` to
 * the design `baseWidth` it was laid out at — at `baseWidth` the root
 * font-size equals `FONT_BASE` and rem values match the design 1:1.
 *
 * - Scaling DOWN (viewport at or below `GRID_BASE_WIDTH`) is driven by the
 *   `vw` media queries in `src/app/globals.css`.
 * - Scaling UP (viewport above `GRID_BASE_WIDTH`) is driven at runtime by the
 *   `AdaptiveGrid` component / `useAdaptiveGrid` hook.
 *
 * Changing these values means updating the `html` media queries in
 * `globals.css` to match — the formula is:
 *   font-size: FONT_BASE * 100 / baseWidth  (vw)
 */

/** Root font-size (px) the design is measured against. */
export const FONT_BASE = 16;

export interface GridBreakpoint {
  /** Media-query `max-width` threshold (px). */
  maxWidth: number;
  /** Design base width (px) the range was laid out at. */
  baseWidth: number;
}

/** Breakpoints, largest first. The design base is 1440 (Figma) — at 1440 the root
 *  font-size equals FONT_BASE and the layout is 1:1; above 1440 it scales up.
 *
 *  NB: the ≤640 (mobile) tier uses `clamp(15px, 4.2vw, 16px)` in `globals.css` (not a
 *  raw `16·100/360 vw`, which ballooned to ~28px by 620px). The ≤1024 tier is also
 *  floored at 14px so tablets near 640 don’t fall to ~10px. `baseWidth: 360` is the
 *  nominal phone design width. See changelog 2026-07-18. */
export const GRID_BREAKPOINTS: readonly GridBreakpoint[] = [
  { maxWidth: 1440, baseWidth: 1440 },
  { maxWidth: 1024, baseWidth: 1024 },
  { maxWidth: 640, baseWidth: 360 },
];

/** Largest breakpoint width — above it the root font-size scales up. */
export const GRID_BASE_WIDTH = Math.max(
  ...GRID_BREAKPOINTS.map((bp) => bp.maxWidth),
);
