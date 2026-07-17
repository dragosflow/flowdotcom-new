"use client";

// Pulls its child toward the pointer while hovered — light magnetic feel for
// pill CTAs. Spring-only (ADR-0002); disabled on mobile / coarse pointers.
import {
  useRef,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { animated, useSpring } from "@react-spring/web";
import { useWindowWidth } from "@/hooks/use-window-size";
import { isMobileDisabled } from "@/lib/springs/config";

export interface MagneticProps {
  children: ReactNode;
  /** Max pull as a fraction of half-width/height (0–1). Default 0.35. */
  strength?: number;
  className?: string;
  disableOnMobile?: boolean;
}

export const Magnetic = ({
  children,
  strength = 0.35,
  className,
  disableOnMobile = true,
}: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const width = useWindowWidth();
  const off = isMobileDisabled(disableOnMobile, width);
  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 280, friction: 18 },
  }));

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (off) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    api.start({
      x: dx * strength,
      y: dy * strength,
    });
  };

  const onLeave = () => {
    api.start({ x: 0, y: 0 });
  };

  return (
    <animated.div
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-flex" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </animated.div>
  );
};
