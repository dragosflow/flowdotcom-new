// After `renderer.dispose()` + `forceContextLoss()`, the same <canvas> DOM node
// keeps a lost WebGL context and cannot host a healthy new renderer. That shows
// up as a blank home hero after client navigations (and Strict Mode effect
// re-invoke): create runs again on the dead node. Swap in a fresh element that
// copies class / ARIA; callers must assign the return value back onto their ref.

export function claimCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const stale =
    canvas.hasAttribute("data-engine") || canvas.dataset.webglLost === "1";
  if (!stale) return canvas;

  const fresh = document.createElement("canvas");
  fresh.className = canvas.className;
  for (const name of ["role", "aria-label", "aria-hidden"] as const) {
    const v = canvas.getAttribute(name);
    if (v != null) fresh.setAttribute(name, v);
  }
  canvas.replaceWith(fresh);
  return fresh;
}

/** Call after forceContextLoss so the next claimCanvas knows to swap. */
export function markCanvasLost(canvas: HTMLCanvasElement): void {
  canvas.dataset.webglLost = "1";
  canvas.removeAttribute("data-engine");
}
