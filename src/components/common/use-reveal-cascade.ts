"use client";

// Shared per-item reveal cascade used by <AnimatedHeading>, the About heading, and the
// bento card reveals. Drives one react-spring value `p` 0→1 from the shared ticker
// (react-spring's own self-running springs don't progress in this project — see
// [[decisions-log]] ADR-0015). `localProg(p, i)` gives item `i`'s eased 0→1 progress
// within the staggered timeline. Reduced motion jumps straight to revealed.
//
// Trigger: by default it starts when the observed `rootRef` element scrolls into view.
// Pass `{ startWhen }` (a boolean) to instead start when that flag becomes true — used by
// the hero, which is on-screen behind the preloader rather than scroll-triggered.
import { useEffect, useMemo, useRef } from "react";
import { useSpring, type SpringValue } from "@react-spring/web";
import { subscribeToTicker } from "@/lib/animation/ticker";

const DEFAULT_DURATION = 1400; // ms for the whole cascade
const DEFAULT_SPREAD = 0.55; // fraction of the timeline over which item starts are staggered
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export interface RevealCascade<T extends HTMLElement = HTMLElement> {
  p: SpringValue<number>;
  rootRef: React.RefObject<T | null>;
  localProg: (v: number, i: number) => number;
}

export interface RevealCascadeOptions {
  /** When provided, the cascade starts once this flag becomes true (instead of on scroll-in). */
  startWhen?: boolean;
  /** Total cascade length in ms. Default 1400. */
  duration?: number;
  /** 0–1 fraction of the timeline used to stagger item starts. Higher = clearer one-by-one. Default 0.55. */
  spread?: number;
}

export function useRevealCascade<T extends HTMLElement = HTMLElement>(
  total: number,
  options?: RevealCascadeOptions,
): RevealCascade<T> {
  const rootRef = useRef<T>(null);
  const [{ p }, api] = useSpring(() => ({ p: 0 }));
  const gated = options?.startWhen !== undefined;
  const startWhen = options?.startWhen;
  const duration = options?.duration ?? DEFAULT_DURATION;
  const spread = options?.spread ?? DEFAULT_SPREAD;

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let unsubscribe = () => {};
    // Latch is local to this effect run — Strict Mode cleanup→re-run (and client
    // remount when startWhen is already true) must be allowed to start again.
    // A persistent ref left the hero reveal stuck at opacity 0 on nav-back-home.
    let began = false;
    const start = () => {
      if (began) return;
      began = true;
      if (reduce) {
        api.start({ p: 1, immediate: true });
        return;
      }
      let t0: number | null = null;
      let done = false;
      unsubscribe = subscribeToTicker(
        (time) => {
          if (done) return;
          if (t0 === null) t0 = time;
          const t = Math.min((time - t0) / duration, 1);
          api.start({ p: t, immediate: true });
          if (t >= 1) {
            done = true;
            unsubscribe();
          }
        },
        () => 0,
      );
    };

    // Flag-gated: start once startWhen turns true.
    if (gated) {
      if (startWhen) start();
      return () => {
        unsubscribe();
        api.start({ p: 0, immediate: true });
      };
    }

    // Default: start when the element scrolls into view.
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      unsubscribe();
    };
  }, [api, gated, startWhen, duration]);

  const span = 1 - spread;
  const localProg = useMemo(
    () => (v: number, i: number) => {
      const s = total > 1 ? (i / (total - 1)) * spread : 0;
      return easeOutQuart(
        span <= 0 ? 1 : Math.min(Math.max((v - s) / span, 0), 1),
      );
    },
    [total, span, spread],
  );

  return { p, rootRef, localProg };
}
