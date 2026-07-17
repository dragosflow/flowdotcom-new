// Detect / build URLs for live nav page-previews (iframe tooltips).
export const NAV_PREVIEW_QUERY = "nav-preview";

export const isInAppPageHref = (href: string) => {
  if (
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("#") ||
    href.startsWith("//")
  ) {
    return false;
  }
  return href.startsWith("/");
};

/** Same-origin path with `?nav-preview=1` for stripped chrome in the iframe. */
export const navPreviewSrc = (href: string) => {
  try {
    const url = new URL(href, "http://local");
    url.searchParams.set(NAV_PREVIEW_QUERY, "1");
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return href;
  }
};

export const readNavPreviewFlag = () => {
  if (typeof window === "undefined") return false;
  return (
    new URLSearchParams(window.location.search).get(NAV_PREVIEW_QUERY) === "1"
  );
};
