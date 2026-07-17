"use client";

// WebGL backdrop for the site footer: mesh-gradient stage + textured iPhone that
// flies in with parallax and reversed spin. The phone screen shows a lit Boost
// Coffee Shop app screenshot so the prop reads as a live product. See ADR-0014.
import { useEffect, useRef } from "react";
import {
  TextureLoader,
  sRGBEncoding,
  type Object3D,
  type Mesh,
  type MeshStandardMaterial,
  type Texture,
} from "three";
import { subscribeToTicker } from "@/lib/animation/ticker";
import {
  createGradientBackground,
  type GradientBackgroundHandle,
} from "@/lib/three/gradient-background-scene";
import {
  createChainScene,
  defaultChainMaterial,
  type ChainSceneHandle,
} from "@/lib/three/chain-scene";
import { claimCanvas } from "@/lib/three/claim-canvas";

// Same blue palette as the hero/chain; a new seed → a different blob pattern.
const BASE = "#1c3ee6";
const LIGHT = "#eef3ff";
const SEED = 7.2;
const MODEL_URL = "/assets/iphone.glb";
// Settle below geometric centre — the heading sits at the top, so .5 reads too high.
const SETTLE = 0.63;

/** Portrait app UI shown on the phone screen (Boost Coffee Shop). */
const SCREEN_SHOT = "/assets/images/portfolio/boost-screen.png";

const SCREEN_ASPECT = 9 / 19.5; // approx iPhone display

/** Fit a screenshot into the portrait screen UVs. */
const fitScreenTexture = (tex: Texture) => {
  tex.encoding = sRGBEncoding;
  tex.flipY = false;
  const img = tex.image as { width?: number; height?: number } | undefined;
  if (!img?.width || !img.height) return;
  const imgAspect = img.width / img.height;
  if (imgAspect > SCREEN_ASPECT) {
    const rx = SCREEN_ASPECT / imgAspect;
    tex.repeat.set(rx, 1);
    tex.offset.set((1 - rx) / 2, 0);
  } else {
    const ry = imgAspect / SCREEN_ASPECT;
    tex.repeat.set(1, ry);
    tex.offset.set(0, (1 - ry) / 2);
  }
};

/**
 * Paint the phone's screen mesh with a lit app screenshot.
 * Returns a disposer for the active texture.
 */
const applyLivePhoneScreen = (model: Object3D): (() => void) => {
  const screens: MeshStandardMaterial[] = [];
  model.traverse((o) => {
    const mesh = o as Mesh;
    if (!mesh.isMesh) return;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const mat of mats) {
      const name = `${mat.name} ${mesh.name}`.toLowerCase();
      if (!name.includes("screen")) continue;
      screens.push(mat as MeshStandardMaterial);
    }
  });
  if (screens.length === 0) return () => undefined;

  const loader = new TextureLoader();
  let current: Texture | null = null;
  let cancelled = false;

  loader.load(SCREEN_SHOT, (tex) => {
    if (cancelled) {
      tex.dispose();
      return;
    }
    fitScreenTexture(tex);
    current = tex;
    for (const m of screens) {
      if (m.map) m.map.dispose();
      if (m.emissiveMap && m.emissiveMap !== m.map) m.emissiveMap.dispose();
      m.map = tex;
      m.emissiveMap = tex;
      m.color.set("#ffffff");
      m.emissive.set("#ffffff");
      m.emissiveIntensity = 0.95;
      m.metalness = 0;
      m.roughness = 0.4;
      m.needsUpdate = true;
    }
  });

  return () => {
    cancelled = true;
    current?.dispose();
    current = null;
  };
};

// Absolute document offset of an element (walks offsetParent).
const absoluteTop = (el: HTMLElement) => {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
};

export const FooterScene = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLCanvasElement>(null);
  const modelRef = useRef<HTMLCanvasElement>(null);
  const fallRef = useRef(SETTLE); // phone progress: 0 = above, SETTLE = rested

  useEffect(() => {
    if (!bgRef.current || !modelRef.current) return;

    const bg = claimCanvas(bgRef.current);
    const model = claimCanvas(modelRef.current);
    bgRef.current = bg;
    modelRef.current = model;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let disposed = false;
    let screenCleanup: (() => void) | undefined;
    let bgHandle: GradientBackgroundHandle | undefined;
    let modelHandle: ChainSceneHandle | undefined;
    try {
      bgHandle = createGradientBackground(bg, {
        base: BASE,
        light: LIGHT,
        seed: SEED,
      });
    } catch {
      /* no WebGL — the footer's solid fallback background shows */
    }
    try {
      modelHandle = createChainScene(model, {
        url: MODEL_URL,
        progress: () => fallRef.current,
        reducedMotion,
        // Textured iPhone — keep PBR materials; exposure tuned for the blue stage.
        preserveMaterials: true,
        material: { ...defaultChainMaterial, exposure: 1.1 },
        spinDirection: -1, // spin the opposite way to the chain
        onModelReady: (scene) => {
          if (disposed) return;
          screenCleanup = applyLivePhoneScreen(scene);
        },
      });
    } catch {
      /* no WebGL — the gradient backdrop stays */
    }

    let absTop = wrapRef.current ? absoluteTop(wrapRef.current) : 0;
    const measure = () => {
      if (wrapRef.current) absTop = absoluteTop(wrapRef.current);
    };
    window.addEventListener("resize", measure);

    const unsubscribe = subscribeToTicker(
      () => {
        const vh = window.innerHeight || 1;
        const y = window.scrollY;
        // Fly in with parallax: 0 (above the frame) as the footer's top edge enters
        // from the bottom → SETTLE (below centre) once the footer is fully in view.
        const enter = Math.min(Math.max((y - (absTop - vh)) / vh, 0), 1);
        fallRef.current = SETTLE * enter;
      },
      () => 0,
    );

    return () => {
      disposed = true;
      unsubscribe();
      window.removeEventListener("resize", measure);
      screenCleanup?.();
      modelHandle?.dispose();
      bgHandle?.dispose();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden='true'
      className='pointer-events-none absolute inset-0'
    >
      <canvas ref={bgRef} className='absolute inset-0 block h-full w-full' />
      <canvas ref={modelRef} className='absolute inset-0 block h-full w-full' />
    </div>
  );
};
