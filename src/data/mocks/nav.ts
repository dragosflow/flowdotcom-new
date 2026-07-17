// Shared marketing nav — brand + primary links used on every page.
// Page-specific CTAs (tel vs /colaborare) stay in each page mock.
// Hover previews are static screenshots in public/assets/images/nav-preview/
// (regenerate with: node scripts/capture-nav-previews.mjs — needs Playwright).
import type { SiteNavContent, SiteNavItem } from "@/views/site-nav";

export const NAV_PREVIEW = {
  home: "/assets/images/nav-preview/home.png",
  services: "/assets/images/nav-preview/servicii.png",
  collaboration: "/assets/images/nav-preview/colaborare.png",
} as const;

export const navBrand = "flowdotcom";

export const navItems: SiteNavItem[] = [
  { label: "Acasă", href: "/", preview: NAV_PREVIEW.home },
  { label: "Servicii", href: "/servicii", preview: NAV_PREVIEW.services },
  {
    label: "Colaborare",
    href: "/colaborare",
    preview: NAV_PREVIEW.collaboration,
  },
];

export const navWithCta = (cta: SiteNavItem): SiteNavContent => ({
  brand: navBrand,
  brandPreview: NAV_PREVIEW.home,
  items: navItems,
  cta: isInApp(cta.href)
    ? {
        ...cta,
        preview: cta.preview ?? previewForHref(cta.href),
      }
    : cta,
});

const isInApp = (href: string) => href.startsWith("/") && !href.startsWith("//");

const previewForHref = (href: string) => {
  const path = href.replace(/\/$/, "") || "/";
  if (path === "/") return NAV_PREVIEW.home;
  if (path === "/servicii") return NAV_PREVIEW.services;
  if (path === "/colaborare") return NAV_PREVIEW.collaboration;
  return undefined;
};
