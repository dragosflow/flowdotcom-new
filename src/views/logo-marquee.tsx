"use client";

// Two rows whose horizontal motion is tied to scroll position (opposite
// directions), not autoplay. Row 1 = application types; row 2 = technologies.
// Each list is repeated COPIES times and each row's translate is wrapped into
// the [-ONE_SET, 0] band, so it's seamless and always filled edge-to-edge at
// any width. Motion is a react-spring value chasing the scroll offset
// (spring-based, ADR-0002). Icons are flat monochrome marks (`text-logo`).
import { useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import { subscribeToTicker } from "@/lib/animation/ticker";
import { Hover } from "@/components/animation/springs/hover";
import {
  MarqueeIcon,
  type MarqueeIconId,
} from "@/views/logo-marquee-icons";

export interface MarqueeItem {
  name: string;
  icon: MarqueeIconId;
}

export interface LogoMarqueeProps {
  /** First row — product / application types. */
  applications: MarqueeItem[];
  /** Second row — tech stack. */
  technologies: MarqueeItem[];
  label: string;
}

const COPIES = 6; // repeats of the set; half the track always overflows the viewport
const ONE_SET = 100 / COPIES; // percent width of one set

const Row = ({
  items,
  direction,
  speed,
}: {
  items: MarqueeItem[];
  direction: "left" | "right";
  speed: number;
}) => {
  // `s` chases the scroll offset (px * speed); the spring smooths it. The wrap into
  // [0, ONE_SET) happens in the interpolation, so the spring never sees a jump.
  const [{ s }, api] = useSpring(() => ({
    s: 0,
    config: { tension: 90, friction: 34 }, // soft → light, smooth drift
  }));

  useEffect(() => {
    const unsubscribe = subscribeToTicker(
      () => api.start({ s: window.scrollY * speed }),
      () => 0,
    );
    return unsubscribe;
  }, [api, speed]);

  const transform = s.to((v) => {
    const m = ((v % ONE_SET) + ONE_SET) % ONE_SET; // 0..ONE_SET
    const off = direction === "left" ? -m : -(ONE_SET - m); // stays in [-ONE_SET, 0]
    return `translate3d(${off}%,0,0)`;
  });

  return (
    <div className="flex overflow-hidden">
      <animated.div
        style={{ transform }}
        className="flex w-max shrink-0 items-center text-logo"
      >
        {Array.from({ length: COPIES }).flatMap((_, c) =>
          items.map((item, i) => (
            <Hover
              key={`${c}-${item.icon}-${i}`}
              tag="span"
              className="flex shrink-0 items-center gap-3 pr-16"
              from={{ transform: "scale(1)", opacity: 1 }}
              to={{ transform: "scale(1.06)", opacity: 0.85 }}
              config={{ tension: 280, friction: 22 }}
              disableOnMobile
            >
              <MarqueeIcon id={item.icon} />
              <span className="whitespace-nowrap text-3xl font-semibold tracking-tight">
                {item.name}
              </span>
            </Hover>
          )),
        )}
      </animated.div>
    </div>
  );
};

export const LogoMarquee = ({
  applications,
  technologies,
  label,
}: LogoMarqueeProps) => {
  return (
    <section aria-label={label} className="bg-hero-page py-12">
      <div className="flex flex-col gap-10">
        <Row items={applications} direction="left" speed={0.005} />
        <Row items={technologies} direction="right" speed={0.0038} />
      </div>
    </section>
  );
};
