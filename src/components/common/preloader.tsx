"use client";

// First-load preloader. Progress advances by **clamped frame deltas** (not wall
// clock), so a main-thread hitch can't skip the bar/counter ahead. Styles are
// written imperatively on refs — no per-frame react-spring starts — to keep the
// overlay cheap while the rest of the app boots. setDone fires late in the exit
// so hero/WebGL don't spike mid-load.
import { useEffect, useRef, useState } from "react";
import { Zap } from "lucide-react";
import { subscribeToTicker } from "@/lib/animation/ticker";
import { usePreloader } from "@/hooks/use-preloader";
import { readNavPreviewFlag } from "@/utils/nav-preview";
import { siteConfig } from "@/lib/site";

const LOAD = 2200; // ms — bar + counter
const EXIT = 1400; // ms — scale + slide
const A = LOAD / (LOAD + EXIT);
// Release hero only near the end of the slide — avoids WebGL/boot hitch mid-load.
const DONE_AT = A + (1 - A) * 0.9;
const BAR_PX = 56;
/** Cap one frame's contribution so a freeze doesn't jump progress. */
const MAX_DT = 20;

const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const Preloader = () => {
  const [gone, setGone] = useState(false);
  const [skip] = useState(() => readNavPreviewFlag());
  const setDone = usePreloader((s) => s.setDone);
  const doneFired = useRef(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const counterWrapRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barOuterRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const lastPct = useRef(-1);

  useEffect(() => {
    if (!skip) return;
    setDone();
    setGone(true);
  }, [skip, setDone]);

  useEffect(() => {
    if (skip) return;
    const thin = clamp01(BAR_PX / window.innerHeight);
    let elapsed = 0;
    let last = performance.now();
    let finished = false;
    const total = LOAD + EXIT;

    const unsubscribe = subscribeToTicker(
      (time) => {
        if (finished) return;
        const dt = Math.min(Math.max(time - last, 0), MAX_DT);
        last = time;
        elapsed = Math.min(elapsed + dt, total);
        const v = elapsed / total;

        const loadT = clamp01(elapsed / LOAD);
        const exitT = clamp01((elapsed - LOAD) / EXIT);
        const fill = easeOutCubic(loadT);
        const exit = easeInOutCubic(exitT);

        const root = rootRef.current;
        if (root) root.style.transform = `translate3d(0, ${-exit * 100}%, 0)`;

        const logo = logoRef.current;
        if (logo) logo.style.opacity = String(1 - exit * 0.85);

        const counterWrap = counterWrapRef.current;
        if (counterWrap) {
          const left = Math.max(fill, 0.16) * 100;
          counterWrap.style.left = `${left}%`;
          counterWrap.style.opacity = String(1 - exit);
        }

        const pct = Math.round(fill * 100);
        if (pct !== lastPct.current && pctRef.current) {
          lastPct.current = pct;
          pctRef.current.textContent = `${pct}%`;
        }

        const barOuter = barOuterRef.current;
        if (barOuter) {
          barOuter.style.transform = `scaleY(${thin + (1 - thin) * easeOutCubic(exit)})`;
        }
        const barFill = barFillRef.current;
        if (barFill) barFill.style.transform = `scaleX(${fill})`;

        if (!doneFired.current && v >= DONE_AT) {
          doneFired.current = true;
          setDone();
        }
        if (elapsed >= total) {
          finished = true;
          unsubscribe();
          setGone(true);
        }
      },
      () => 0,
    );
    return unsubscribe;
  }, [setDone, skip]);

  if (skip || gone) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] overflow-hidden bg-white will-change-transform"
    >
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center text-black"
      >
        <span className="flex items-center gap-2 text-3xl font-medium tracking-tight">
          <Zap className="h-7 w-7" aria-hidden="true" strokeWidth={2.25} />
          {siteConfig.name}
        </span>
      </div>

      <div
        ref={counterWrapRef}
        className="pointer-events-none absolute bottom-16 will-change-[left,opacity] md:bottom-20"
        style={{ left: "16%", transform: "translateX(-100%)" }}
      >
        <span
          ref={pctRef}
          className="block whitespace-nowrap pr-6 text-5xl font-light leading-[0.95] tracking-tight text-black tabular-nums sm:text-6xl lg:text-8xl"
        >
          0%
        </span>
      </div>

      <div
        ref={barOuterRef}
        className="absolute inset-x-0 bottom-0 h-lvh origin-bottom overflow-hidden will-change-transform"
        style={{ transform: `scaleY(${clamp01(BAR_PX / 900)})` }}
      >
        <div
          ref={barFillRef}
          className="h-full w-full origin-left bg-gradient-to-r from-preloader-from to-preloader-to will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
};
