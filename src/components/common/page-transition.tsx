"use client";

// Quiet route cover. Fade-in runs **before** navigation (click is intercepted) so
// it isn’t fighting RSC/WebGL — that’s what made the appear stutter. After the
// sheet is solid, `router.push`; unveil waits for paint + idle, then soft fade-out.
// Single opacity on one composited layer. Clamped deltas + ticker (ADR-0015).
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { subscribeToTicker } from "@/lib/animation/ticker";
import { usePreloader } from "@/hooks/use-preloader";
import { useNavPreviewMode } from "@/hooks/use-nav-preview-mode";

const IN_MS = 280;
const OUT_MS = 400;
const READY_PAD_MS = 40;
const HOME_PAD_MS = 260;
const MAX_DT = 16;
const IDLE_TIMEOUT_MS = 400;

const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
const easeSmooth = (t: number) => {
  const x = clamp01(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
};

type Phase = "idle" | "busy";

const normalizePath = (pathname: string) =>
  pathname.replace(/\/$/, "") || "/";

const isExternalOrSame = (href: string, pathname: string) => {
  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return true;
    return (
      normalizePath(url.pathname) === normalizePath(pathname) && url.hash === ""
    );
  } catch {
    return true;
  }
};

const parseInternalHref = (
  e: MouseEvent,
  pathname: string,
): { href: string; path: string } | null => {
  if (e.defaultPrevented || e.button !== 0) return null;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  const el = (e.target as Element | null)?.closest?.("a");
  if (!el || el.hasAttribute("download") || el.getAttribute("target") === "_blank") {
    return null;
  }
  const href = el.getAttribute("href");
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return null;
  }
  if (isExternalOrSame(href, pathname)) return null;
  try {
    const url = new URL(href, window.location.origin);
    return { href: url.pathname + url.search + url.hash, path: normalizePath(url.pathname) };
  } catch {
    return null;
  }
};

const waitForPaint = (padMs: number) =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (padMs <= 0) resolve();
        else window.setTimeout(resolve, padMs);
      });
    });
  });

const waitForIdle = () =>
  new Promise<void>((resolve) => {
    const ric = (
      window as Window & {
        requestIdleCallback?: (
          cb: () => void,
          opts?: { timeout: number },
        ) => number;
      }
    ).requestIdleCallback;
    if (typeof ric === "function") {
      ric(() => resolve(), { timeout: IDLE_TIMEOUT_MS });
      return;
    }
    window.setTimeout(resolve, 48);
  });

export const PageTransition = () => {
  const pathname = usePathname();
  const router = useRouter();
  const preloaderDone = usePreloader((s) => s.done);
  const previewMode = useNavPreviewMode();

  const sheetRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>("idle");
  const pathRef = useRef(pathname);
  const toPathRef = useRef<string | null>(null);
  const coveredRef = useRef(false);
  const routeReadyRef = useRef(false);
  const unveilingRef = useRef(false);
  const animUnsub = useRef<() => void>(() => {});

  const showLayer = () => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    sheet.style.visibility = "visible";
    sheet.style.pointerEvents = "auto";
    sheet.style.willChange = "opacity";
  };

  const hideLayer = () => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    sheet.style.opacity = "0";
    sheet.style.visibility = "hidden";
    sheet.style.pointerEvents = "none";
    sheet.style.willChange = "auto";
  };

  const paint = (cover: number) => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    sheet.style.opacity = String(easeSmooth(cover));
  };

  const runOpacity = (
    from: number,
    to: number,
    duration: number,
    onDone: () => void,
  ) => {
    animUnsub.current();
    let elapsed = 0;
    let last = performance.now();
    let finished = false;
    paint(from);
    const unsub = subscribeToTicker(
      (time) => {
        if (finished) return;
        const dt = Math.min(Math.max(time - last, 0), MAX_DT);
        last = time;
        elapsed = Math.min(elapsed + dt, duration);
        const t = clamp01(elapsed / duration);
        paint(from + (to - from) * t);
        if (t >= 1) {
          finished = true;
          unsub();
          onDone();
        }
      },
      () => 0,
    );
    animUnsub.current = unsub;
  };

  const runFadeOut = () => {
    if (unveilingRef.current) return;
    unveilingRef.current = true;
    runOpacity(1, 0, OUT_MS, () => {
      hideLayer();
      phaseRef.current = "idle";
      toPathRef.current = null;
      coveredRef.current = false;
      routeReadyRef.current = false;
      unveilingRef.current = false;
    });
  };

  const tryUnveil = async () => {
    if (phaseRef.current !== "busy") return;
    if (!coveredRef.current || !routeReadyRef.current || unveilingRef.current) {
      return;
    }

    const to = toPathRef.current ?? "/";
    const pad =
      READY_PAD_MS + (normalizePath(to) === "/" ? HOME_PAD_MS : 0);
    await waitForPaint(pad);
    await waitForIdle();
    if (phaseRef.current !== "busy") return;
    if (!coveredRef.current || !routeReadyRef.current || unveilingRef.current) {
      return;
    }
    runFadeOut();
  };

  const begin = (toPath: string, href: string) => {
    if (phaseRef.current !== "idle") return;
    phaseRef.current = "busy";
    toPathRef.current = toPath;
    coveredRef.current = false;
    routeReadyRef.current = false;
    unveilingRef.current = false;

    showLayer();
    paint(0);
    // Appear alone on the main thread — navigate only once fully covered.
    runOpacity(0, 1, IN_MS, () => {
      coveredRef.current = true;
      paint(1);
      router.push(href);
      // If the route was somehow already there, still try.
      if (normalizePath(pathRef.current) === normalizePath(toPath)) {
        routeReadyRef.current = true;
        void tryUnveil();
      }
    });
  };

  useEffect(() => {
    hideLayer();
    return () => animUnsub.current();
  }, []);

  useEffect(() => {
    if (previewMode) return;
    if (!preloaderDone) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (e: MouseEvent) => {
      const parsed = parseInternalHref(e, pathRef.current);
      if (!parsed) return;
      // Take over navigation so fade-in isn’t competing with the route swap.
      e.preventDefault();
      e.stopPropagation();
      begin(parsed.path, parsed.href);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloaderDone, previewMode, router]);

  useEffect(() => {
    if (pathRef.current === pathname) return;
    pathRef.current = pathname;

    if (!preloaderDone) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (phaseRef.current !== "busy") return;

    if (
      toPathRef.current &&
      normalizePath(pathname) === normalizePath(toPathRef.current)
    ) {
      routeReadyRef.current = true;
      void tryUnveil();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, preloaderDone]);

  if (previewMode) return null;

  return (
    <div
      ref={sheetRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] flex flex-col items-center justify-center gap-6 bg-hero-page opacity-0 [transform:translateZ(0)]"
      style={{ visibility: "hidden" }}
    >
      <Zap
        className="h-14 w-14 text-black/55 sm:h-16 sm:w-16"
        aria-hidden="true"
        strokeWidth={1.75}
      />
      <div
        className="h-px w-16 bg-gradient-to-r from-preloader-from to-preloader-to opacity-70"
        aria-hidden="true"
      />
    </div>
  );
};
