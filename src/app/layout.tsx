import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import {
  generateMetadata,
  generateViewport,
} from "@/utils/seo/generate-page-metadata";
import { getSiteStructuredData } from "@/utils/seo/structured-data";
import { siteConfig } from "@/lib/site";

import { JsonLd } from "@/components/common/json-ld";
import { CustomCursor } from "@/components/common/cursor";
import { AdaptiveGrid } from "@/components/common/grid";
import { ReducedMotion } from "@/components/common/reduced-motion";
import { Preloader } from "@/components/common/preloader";
import { PageTransition } from "@/components/common/page-transition";
import { ScrollLayout } from "@/layouts/scroll-layout";

import "@/app/globals.css";

const mulish = localFont({
  variable: "--font-mulish",
  display: "swap",
  src: [
    { path: "./fonts/Mulish-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/Mulish-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Mulish-Medium.ttf", weight: "500", style: "normal" },
  ],
});

// Default document metadata — routes override title/description as needed.
export const metadata: Metadata = generateMetadata({
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  url: "/",
});
export const viewport: Viewport = generateViewport();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={`${mulish.variable}`}>
        <JsonLd data={getSiteStructuredData()} />
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
        >
          Sari la conținut
        </a>
        <Preloader />
        <PageTransition />
        {/* Outside ScrollLayout so position:fixed isn't relative to a transformed ancestor. */}
        <CustomCursor />
        <ScrollLayout>
          {/* coef=1 → root font-size scales fully proportionally with the viewport
              on displays wider than the base width, so the rem-based layout grows to
              fill large monitors instead of staying small. */}
          <AdaptiveGrid coef={1} />
          <ReducedMotion />
          {children}
        </ScrollLayout>
      </body>
    </html>
  );
}
