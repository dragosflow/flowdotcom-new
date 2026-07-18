/**
 * @fileoverview Standardised metadata + viewport generators for pages.
 *
 * `generateMetadata` builds a Next.js `Metadata` object — basic meta tags,
 * OpenGraph, Twitter cards, canonical URL, icons, robots. `metadataBase` is
 * always set (from `siteConfig`) so relative URLs (OG image, canonical)
 * resolve to absolute — required by social scrapers.
 *
 * `generateViewport` builds the `Viewport` export. `themeColor` lives here, not
 * in `Metadata` — Next deprecated it on the metadata object.
 */

import { Metadata, Viewport } from "next";

import { siteConfig } from "@/lib/site";

interface MetadataProps {
  title?: Metadata["title"];
  description?: string;
  /** Canonical path (e.g. `/about`) or absolute URL for this page. */
  url?: string;
  /** Open Graph / Twitter image — path under `public/` or absolute URL. */
  ogImage?: string;
  twitterHandle?: string;
  author?: string;
  siteName?: string;
}

const titleAsString = (title: Metadata["title"] | undefined): string => {
  if (typeof title === "string") return title;
  if (!title || typeof title !== "object") return siteConfig.name;
  if ("default" in title && typeof title.default === "string") {
    return title.default;
  }
  if ("absolute" in title && typeof title.absolute === "string") {
    return title.absolute;
  }
  return siteConfig.name;
};

export function generateMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  url = "/",
  ogImage = siteConfig.ogImage,
  twitterHandle = siteConfig.twitterHandle,
  author = siteConfig.author,
  siteName = siteConfig.name,
}: MetadataProps = {}): Metadata {
  const titleText = titleAsString(title);
  return {
    // Resolves every relative URL below to an absolute one.
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    applicationName: siteConfig.name,
    authors: [{ name: author, url: siteConfig.url }],
    creator: author,
    publisher: siteConfig.legalName,
    category: "technology",
    alternates: {
      canonical: url,
      languages: {
        "ro-RO": url,
      },
    },
    openGraph: {
      title: titleText,
      description,
      url,
      siteName,
      // Dimensions must match the real asset; 1200×630 is the ideal size.
      images: [
        {
          url: ogImage,
          width: 900,
          height: 600,
          alt: `${siteConfig.legalName} — ${siteConfig.tagline}`,
        },
      ],
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description,
      site: twitterHandle,
      creator: twitterHandle,
      images: [ogImage],
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/manifest.json",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
  };
}

export function generateViewport(): Viewport {
  return {
    themeColor: siteConfig.themeColor,
    width: "device-width",
    initialScale: 1,
    // Lets `env(safe-area-inset-*)` apply on notched / Safari-chrome phones so
    // sticky pin UIs can pad clear of the bottom browser bar.
    viewportFit: "cover",
  };
}
