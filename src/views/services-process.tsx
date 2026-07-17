"use client";

// Process — same mesh-gradient as home Chain. Sticky pin so the product list
// (ServicesList) scrolls up over it — home Chain + Product two-layer reveal.
import { useEffect, useRef } from "react";
import { Hover } from "@/components/animation/springs/hover";
import { Inview } from "@/components/animation/springs/in-view";
import { AnimatedHeading } from "@/components/common/animated-heading";
import {
  createGradientBackground,
  type GradientBackgroundHandle,
} from "@/lib/three/gradient-background-scene";
import { claimCanvas } from "@/lib/three/claim-canvas";
import type { ProcessStep } from "@/data/mocks/services";

export interface ServicesProcessProps {
  labelId: string;
  heading: string;
  steps: ProcessStep[];
}

// Match chain.tsx exactly — same palette + seed → same blob pattern.
const BASE = "#1c3ee6";
const LIGHT = "#eef3ff";
const SEED = 3.7;

const HOVER_CONFIG = { tension: 280, friction: 24 };

export const ServicesProcess = ({
  labelId,
  heading,
  steps,
}: ServicesProcessProps) => {
  const bgRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!bgRef.current) return;
    const canvas = claimCanvas(bgRef.current);
    bgRef.current = canvas;
    let handle: GradientBackgroundHandle | undefined;
    try {
      handle = createGradientBackground(canvas, {
        base: BASE,
        light: LIGHT,
        seed: SEED,
      });
    } catch {
      /* no WebGL — solid footer fallback shows through */
    }
    return () => handle?.dispose();
  }, []);

  return (
    <section
      id={labelId}
      aria-labelledby={`${labelId}-heading`}
      className="sticky top-0 z-10 h-lvh overflow-hidden bg-footer text-white"
    >
      <canvas
        ref={bgRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 block h-full w-full"
      />

      <div className="relative z-10 flex h-full flex-col justify-center px-6 py-20 md:px-12 lg:px-page-gutter">
        <AnimatedHeading
          as="h2"
          id={`${labelId}-heading`}
          className="mb-10 max-w-3xl text-[2rem] font-light leading-[0.95] tracking-tight sm:text-[2.5rem] lg:text-[3.5rem]"
        >
          {heading}
        </AnimatedHeading>

        <ol className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {steps.map((step, i) => (
            <ProcessStepCard key={step.step} step={step} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
};

const ProcessStepCard = ({
  step,
  index,
}: {
  step: ProcessStep;
  index: number;
}) => {
  const ref = useRef<HTMLElement>(null);
  const fromLeft = index % 2 === 0;

  return (
    <Inview
      tag="li"
      mode="once"
      from={{
        opacity: 0,
        x: fromLeft ? -36 : 36,
      }}
      to={{ opacity: 1, x: 0 }}
      config={{ tension: 200, friction: 28 }}
      delayIn={index * 90}
      className="list-none"
    >
      <article
        ref={ref}
        className="flex min-h-[14rem] flex-col justify-between border-b border-white/10 px-1 py-6 sm:min-h-[16rem] sm:border-b-0 sm:px-5 lg:px-7"
      >
        <Hover
          trigger={ref}
          tag="div"
          className="flex h-full flex-col justify-between"
          from={{ transform: "scale(1)" }}
          to={{ transform: "scale(1.03)" }}
          config={HOVER_CONFIG}
          disableOnMobile
        >
          <span className="text-4xl font-light tracking-tight text-white/35">
            {step.step}
          </span>
          <div className="mt-10">
            <h3 className="text-xl font-medium leading-snug tracking-tight">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
              {step.body}
            </p>
          </div>
        </Hover>
      </article>
    </Inview>
  );
};
