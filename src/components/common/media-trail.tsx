"use client";

// Image trail that follows the pointer while a media region is active. Parent
// owns mouse coords; this component only paints a short fading stack via
// react-spring. Off on mobile / reduced motion.
import { useEffect, useRef } from "react";
import { animated, useSprings } from "@react-spring/web";
import { useWindowWidth } from "@/hooks/use-window-size";
import { isMobileDisabled } from "@/lib/springs/config";

const TRAIL = 5;
const THUMB = 72;

export interface MediaTrailProps {
  src: string;
  active: boolean;
  /** Latest pointer position in viewport coords; null when idle. */
  point: { x: number; y: number } | null;
}

export const MediaTrail = ({ src, active, point }: MediaTrailProps) => {
  const width = useWindowWidth();
  const off = isMobileDisabled(true, width);
  const reduceRef = useRef(false);
  const points = useRef(
    Array.from({ length: TRAIL }, () => ({ x: 0, y: 0 })),
  );

  useEffect(() => {
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const [springs, api] = useSprings(TRAIL, () => ({
    x: 0,
    y: 0,
    opacity: 0,
    scale: 0.6,
    config: { tension: 220, friction: 22 },
  }));

  useEffect(() => {
    if (off || reduceRef.current || !active || !point) {
      api.start({ opacity: 0, scale: 0.6 });
      return;
    }
    const next = [point, ...points.current.slice(0, TRAIL - 1)];
    points.current = next;
    api.start((i) => ({
      x: next[i].x,
      y: next[i].y,
      opacity: 0.55 - i * 0.1,
      scale: 1 - i * 0.08,
      delay: i * 12,
    }));
  }, [active, point, off, api]);

  if (off) return null;

  return (
    <>
      {springs.map((style, i) => (
        <animated.div
          key={i}
          aria-hidden="true"
          className="pointer-events-none fixed z-[70] overflow-hidden rounded-xl border border-white/30 shadow-lg"
          style={{
            width: THUMB,
            height: THUMB,
            left: style.x,
            top: style.y,
            opacity: style.opacity,
            transform: style.scale.to(
              (s) => `translate(-50%, -50%) scale(${s})`,
            ),
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
    </>
  );
};
