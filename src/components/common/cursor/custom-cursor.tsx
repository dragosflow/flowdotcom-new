"use client";

// Spring-driven custom cursor — a small filled core + a thin outer ring that
// blooms on interactive targets. Fully imperative (refs + shared ticker); no
// React re-renders on move. Off on touch / narrow / prefers-reduced-motion.
// Native cursor stays until the first pointer move.
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSpring } from "@react-spring/web";
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

const readKind = (el: Element | null): CursorKind => {
  const node = el?.closest?.("[data-cursor]") as HTMLElement | null;
  if (!node) return "default";
  const raw = node.dataset.cursor;
  return raw === "link" || raw === "cta" || raw === "media" ? raw : "default";
};

export const CustomCursor = () => {
  const width = useWindowWidth();
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  const armedRef = useRef(false);
  const kindRef = useRef<CursorKind>("default");

  const [pos] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 420, friction: 34 },
  }));
  // Core follows a touch tighter / slightly ahead of the ring for lag feel.
  const [corePos] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 900, friction: 40 },
  }));
  const [look] = useSpring(() => ({
    ring: RING.default,
    opacity: 0,
    coreScale: 1,
    config: { tension: 300, friction: 22 },
  }));

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
      armedRef.current = false;
      return;
    }

    const applyLook = () => {
      const kind = kindRef.current;
      look.ring.start(RING[kind]);
      look.opacity.start(1);
      look.coreScale.start(kind === "default" ? 1 : 0.55);
    };

    const move = (clientX: number, clientY: number, el: Element | null) => {
      if (!armedRef.current) {
        pos.x.start(clientX, { immediate: true });
        pos.y.start(clientY, { immediate: true });
        corePos.x.start(clientX, { immediate: true });
        corePos.y.start(clientY, { immediate: true });
        armedRef.current = true;
        document.documentElement.classList.add("has-custom-cursor");
      } else {
        pos.x.start(clientX);
        pos.y.start(clientY);
        corePos.x.start(clientX);
        corePos.y.start(clientY);
      }
      kindRef.current = readKind(el);
      applyLook();
    };

    const onPointerMove = (e: PointerEvent) =>
      move(e.clientX, e.clientY, e.target as Element | null);
    const onMouseMove = (e: MouseEvent) =>
      move(e.clientX, e.clientY, e.target as Element | null);
    const onOver = (e: Event) => {
      kindRef.current = readKind(e.target as Element | null);
      applyLook();
    };
    const onLeave = () => look.opacity.start(0);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    const unsubscribe = subscribeToTicker(
      () => {
        const opacity = look.opacity.get();
        const ring = look.ring.get();
        const coreScale = look.coreScale.get();

        const root = rootRef.current;
        if (root) {
          // Root is only a stacking/opacity shell — children carry their own x/y.
          root.style.opacity = String(opacity);
        }

        const ringEl = ringRef.current;
        if (ringEl) {
          const x = pos.x.get();
          const y = pos.y.get();
          ringEl.style.width = `${ring}px`;
          ringEl.style.height = `${ring}px`;
          ringEl.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        }

        const coreEl = coreRef.current;
        if (coreEl) {
          const x = corePos.x.get();
          const y = corePos.y.get();
          coreEl.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${coreScale})`;
        }
      },
      () => 0,
    );

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      unsubscribe();
    };
  }, [enabled, pos, corePos, look]);

  if (!mounted || !enabled) return null;

  return createPortal(
    <div
      ref={rootRef}
      data-cursor-root=""
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] mix-blend-difference"
      style={{ opacity: 0 }}
    >
      {/* Soft lagging ring */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 rounded-full will-change-transform"
        style={{
          width: RING.default,
          height: RING.default,
          border: "1.5px solid rgba(255,255,255,0.95)",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.2)",
        }}
      />
      {/* Snappy core dot */}
      <div
        ref={coreRef}
        className="absolute left-0 top-0 rounded-full bg-white will-change-transform"
        style={{
          width: CORE,
          height: CORE,
          boxShadow: "0 0 0 1px rgba(0,0,0,0.25)",
        }}
      />
    </div>,
    document.body,
  );
};
