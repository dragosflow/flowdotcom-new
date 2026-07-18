"use client";

// A pinned (sticky) layer. The chrome-model scene stays fixed at the top of the
// viewport while the next section (Product) scrolls up over it — two layers at
// different scroll "heights", so the Product reads as sliding out from under the
// model. The model's vertical travel is driven off the **layered wrapper's** scroll
// (not the pinned section, whose rect.top is frozen at 0 through the whole pin): it
// flies in from the top edge down to centre, then — as the Product slides up over it —
// keeps drifting slowly down and out the bottom (the drift spans the full Product
// height, so it's a gentle deceleration into a slow fall, never an abrupt halt). The
// fall is low-passed (eased toward its scroll target, not tracked 1:1) so it never
// feels rigid, and it spins with **scroll momentum** (`scrollSpin: true`) — scrolling
// speeds up the turn, easing back to an idle spin. Pinning is CSS `sticky`
// inside the layered wrapper (see home.tsx). Backdrop is the hero "mesh gradient" with
// a different blob pattern (seed). Two stacked WebGL layers. See ADR-0014.
import { useEffect, useRef, useState } from "react";
import { subscribeToTicker } from "@/lib/animation/ticker";
import {
  createGradientBackground,
  type GradientBackgroundHandle,
} from "@/lib/three/gradient-background-scene";
import {
  createChainScene,
  defaultChainMaterial,
  type ChainMaterialConfig,
  type ChainSceneHandle,
} from "@/lib/three/chain-scene";
import { claimCanvas } from "@/lib/three/claim-canvas";
import { ChainControls } from "@/views/chain-controls";
import { AnimatedHeading } from "@/components/common/animated-heading";

// Dev scene-tuning panel — hidden. Flip to true to bring it back while tuning.
const SHOW_CONTROLS = false;

// Same gradient palette as the hero default; a different seed → different pattern.
const BASE = "#1c3ee6";
const LIGHT = "#eef3ff";
const SEED = 3.7;
const MODEL_URL = "/assets/chain.glb";

export interface ChainContent {
  /** Section heading — also the section's accessible name. */
  heading: string;
  /** Bottom-left supporting paragraph. */
  tagline: string;
  /** Oversized muted phrase, bottom-right. */
  aside: string;
}

export interface ChainProps {
  content: ChainContent;
}

export const Chain = ({ content }: ChainProps) => {
  const { heading, tagline, aside } = content;
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLCanvasElement>(null);
  const modelRef = useRef<HTMLCanvasElement>(null);
  const fallRef = useRef(0.5); // model progress: .5 = centred
  const chainHandleRef = useRef<ChainSceneHandle | null>(null);
  const [material, setMaterial] = useState<ChainMaterialConfig>(
    defaultChainMaterial,
  );

  useEffect(() => {
    if (!bgRef.current || !modelRef.current) return;

    const bg = claimCanvas(bgRef.current);
    const model = claimCanvas(modelRef.current);
    bgRef.current = bg;
    modelRef.current = model;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let bgHandle: GradientBackgroundHandle | undefined;
    let unsubscribe = () => {};
    let cancelled = false;

    // Gradient is cheap; defer the GLB/chrome scene until near the viewport so
    // nav-to-home doesn't spike WebGL while the hero is still booting.
    try {
      bgHandle = createGradientBackground(bg, {
        base: BASE,
        light: LIGHT,
        seed: SEED,
      });
    } catch {
      /* no WebGL — the section shows the wrapper behind it */
    }

    const startChain = () => {
      if (cancelled || chainHandleRef.current) return;
      try {
        chainHandleRef.current = createChainScene(model, {
          url: MODEL_URL,
          progress: () => fallRef.current,
          reducedMotion,
          material: defaultChainMaterial,
          scrollSpin: true,
          spinAccel: 0.00004,
          maxSpin: 0.045,
        });
      } catch {
        /* no WebGL — the gradient backdrop stays */
      }
    };

    const el = sectionRef.current;
    let io: IntersectionObserver | null = null;
    if (el) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startChain();
            io?.disconnect();
            io = null;
          }
        },
        { rootMargin: "40% 0px" },
      );
      io.observe(el);
    } else {
      startChain();
    }

    unsubscribe = subscribeToTicker(
      () => {
        const section = sectionRef.current;
        const wrap = section?.parentElement;
        if (!section || !wrap) return;
        const vh = section.clientHeight || window.innerHeight || 1;
        const wt = wrap.getBoundingClientRect().top;
        const pinDist = Math.max(1, wrap.offsetHeight - vh);
        const target =
          wt > 0
            ? 0.5 * (1 - Math.min(wt / vh, 1))
            : 0.5 + 0.5 * Math.min(-wt / pinDist, 1);
        fallRef.current += (target - fallRef.current) * 0.12;
      },
      () => 0,
    );

    return () => {
      cancelled = true;
      io?.disconnect();
      unsubscribe();
      chainHandleRef.current?.dispose();
      chainHandleRef.current = null;
      bgHandle?.dispose();
    };
  }, []);

  // Push live material edits (dev panel) to the running scene.
  useEffect(() => {
    chainHandleRef.current?.update(material);
  }, [material]);

  return (
    <>
      <section
        ref={sectionRef}
        aria-labelledby="chain-title"
        className="sticky top-0 z-10 h-svh overflow-hidden md:h-lvh"
      >
        <canvas
          ref={bgRef}
          aria-hidden="true"
          className="absolute inset-0 block h-full w-full"
        />
        <canvas
          ref={modelRef}
          aria-hidden="true"
          className="absolute inset-0 block h-full w-full"
        />

        {/* Marketing UI overlaid on the chrome stage. Top margin clears the fixed
            site header; bottom padding clears Safari’s chrome / home indicator. */}
        <div className="absolute inset-0 z-10 flex flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 text-white md:px-10 md:pb-10 lg:px-12 lg:pb-12">
          <AnimatedHeading
            as="h2"
            id="chain-title"
            className="mt-24 max-w-[15ch] text-5xl font-light leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-8xl"
            alpha={(f) => 1 - f * 0.65}
          >
            {heading}
          </AnimatedHeading>

          <div className="mt-auto flex items-end justify-between gap-8">
            <p className="max-w-md text-base leading-relaxed text-white">
              {tagline}
            </p>
            <p className="hidden max-w-xl text-right text-8xl font-light leading-[0.95] tracking-tight text-white/40 lg:block">
              {aside}
            </p>
          </div>
        </div>
      </section>
      {SHOW_CONTROLS && (
        <ChainControls
          config={material}
          onChange={setMaterial}
          onReset={() => setMaterial(defaultChainMaterial)}
        />
      )}
    </>
  );
};
