"use client";

// Lightweight custom cursor — filled core (instant) + lagging ring (lerp).
// No React re-renders on move. Ticker runs only while the ring/look is settling,
// then unsubscribes so idle pages cost nothing. Off on touch / narrow /
// prefers-reduced-motion. Native cursor stays until the first pointer move.
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { subscribeToTicker } from "@/lib/animation/ticker";
import { useWindowWidth } from "@/hooks/use-window-size";
import { springsConfig } from "@/lib/springs/config";

export type CursorKind = "default" | "link" | "cta" | "media";

/** Outer ring diameter by hover kind. */
const RING: Record<CursorKind, number> = {
  default: 28,
  link: 48,
  cta: 56,
  media: 64,
};

const CORE = 6;
const RING_BASE = RING.default;

/** Ring follow speed (0–1 per frame @60fps). Higher = snappier, less “laggy”. */
const RING_LERP = 0.28;
/** Look (size/opacity) lerp. */
const LOOK_LERP = 0.2;
const EPS = 0.15;

const readKind = (el: Element | null): CursorKind => {
  const node = el?.closest?.("[data-cursor]") as HTMLElement | null;
  if (!node) return "default";
  const raw = node.dataset.cursor;
  return raw === "link" || raw === "cta" || raw === "media" ? raw : "default";
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const CustomCursor = () => {
  const width = useWindowWidth();
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const ringRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = width > springsConfig.mobileWidth;
    setEnabled(fine && !reduce && desktop);
  }, [width]);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-custom-cursor");
      return;
    }

    let armed = false;
    let kind: CursorKind = "default";
    let targetX = 0;
    let targetY = 0;
    let ringX = 0;
    let ringY = 0;
    let ringSize = RING_BASE;
    let targetRing = RING_BASE;
    let opacity = 0;
    let targetOpacity = 0;
    let coreScale = 1;
    let targetCoreScale = 1;
    let settling = false;
    let unsub: (() => void) | null = null;

    const writeCore = (x: number, y: number, scale: number) => {
      const el = coreRef.current;
      if (!el) return;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
    };

    const writeRing = (x: number, y: number, size: number, op: number) => {
      const el = ringRef.current;
      if (!el) return;
      const s = size / RING_BASE;
      el.style.opacity = String(op);
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${s})`;
    };

    const ensureTicker = () => {
      if (unsub) return;
      settling = true;
      unsub = subscribeToTicker(
        () => {
          ringX = lerp(ringX, targetX, RING_LERP);
          ringY = lerp(ringY, targetY, RING_LERP);
          ringSize = lerp(ringSize, targetRing, LOOK_LERP);
          opacity = lerp(opacity, targetOpacity, LOOK_LERP);
          coreScale = lerp(coreScale, targetCoreScale, LOOK_LERP);

          writeRing(ringX, ringY, ringSize, opacity);
          writeCore(targetX, targetY, coreScale);

          const done =
            Math.abs(ringX - targetX) < EPS &&
            Math.abs(ringY - targetY) < EPS &&
            Math.abs(ringSize - targetRing) < EPS &&
            Math.abs(opacity - targetOpacity) < 0.01 &&
            Math.abs(coreScale - targetCoreScale) < 0.01;

          if (done) {
            ringX = targetX;
            ringY = targetY;
            ringSize = targetRing;
            opacity = targetOpacity;
            coreScale = targetCoreScale;
            writeRing(ringX, ringY, ringSize, opacity);
            writeCore(targetX, targetY, coreScale);
            settling = false;
            unsub?.();
            unsub = null;
          }
        },
        () => 0,
      );
    };

    const applyKind = (next: CursorKind) => {
      if (kind === next && targetOpacity === 1) return;
      kind = next;
      targetRing = RING[next];
      targetCoreScale = next === "default" ? 1 : 0.55;
      targetOpacity = 1;
      ensureTicker();
    };

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!armed) {
        armed = true;
        ringX = targetX;
        ringY = targetY;
        document.documentElement.classList.add("has-custom-cursor");
        writeCore(targetX, targetY, coreScale);
        writeRing(ringX, ringY, ringSize, opacity);
        applyKind(readKind(e.target as Element | null));
      } else {
        // Core snaps — feels precise; ring catches up via ticker.
        writeCore(targetX, targetY, coreScale);
      }

      ensureTicker();
    };

    const onOver = (e: Event) => {
      applyKind(readKind(e.target as Element | null));
    };

    const onLeave = () => {
      targetOpacity = 0;
      ensureTicker();
    };

    // pointermove alone — mousemove would double-fire on mouse and waste work.
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      unsub?.();
      void settling;
    };
  }, [enabled]);

  if (!mounted || !enabled) return null;

  return createPortal(
    <>
      <div
        ref={ringRef}
        data-cursor-root=""
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full mix-blend-difference will-change-transform"
        style={{
          width: RING_BASE,
          height: RING_BASE,
          opacity: 0,
          border: "1.5px solid rgba(255,255,255,0.95)",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.2)",
        }}
      />
      <div
        ref={coreRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white mix-blend-difference will-change-transform"
        style={{
          width: CORE,
          height: CORE,
          boxShadow: "0 0 0 1px rgba(0,0,0,0.25)",
        }}
      />
    </>,
    document.body,
  );
};
