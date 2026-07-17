"use client";

// Pill CTA chrome: magnetic pull + scale Hover + custom-cursor target attrs.
// Put the actual <a>/<Link> (and any Lucide icon) as children.
import type { ReactNode } from "react";
import { Hover } from "@/components/animation/springs/hover";
import { Magnetic } from "@/components/common/magnetic";

export interface MagneticCtaProps {
  children: ReactNode;
  className?: string;
  /** Shown inside the custom cursor while hovering. */
  cursorLabel?: string;
}

export const MagneticCta = ({
  children,
  className,
  cursorLabel,
}: MagneticCtaProps) => (
  <Magnetic className={className}>
    <Hover
      tag='span'
      className='inline-flex'
      from={{ transform: "scale(1)" }}
      to={{ transform: "scale(1.04)" }}
      config={{ tension: 320, friction: 20 }}
      disableOnMobile
      data-cursor='cta'
      {...(cursorLabel ? { "data-cursor-label": cursorLabel } : {})}
    >
      {children}
    </Hover>
  </Magnetic>
);
