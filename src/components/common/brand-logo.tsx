import type { SVGProps } from "react";
import { siteConfig } from "@/lib/site";

/**
 * Brand lockup — Lucide Zap + wordmark (16px bolt, stroke 2.25).
 * Tight 4px gap; viewBox cropped to content (no trailing dead space).
 * Uses `currentColor` so parents control colour.
 */
export type BrandLogoProps = SVGProps<SVGSVGElement> & {
  /** Accessible name; defaults to the site brand. */
  title?: string;
};

const ZAP_PATH =
  "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z";

export const BrandLogo = ({
  title = siteConfig.name,
  className,
  ...rest
}: BrandLogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 90 24"
    fill="none"
    role="img"
    aria-label={title}
    className={className}
    {...rest}
  >
    <title>{title}</title>
    <svg x="0" y="4" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={ZAP_PATH}
        stroke="currentColor"
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <text
      x="20"
      y="16.5"
      fill="currentColor"
      fontFamily="var(--font-mulish), ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="500"
      letterSpacing="-0.01em"
    >
      {title}
    </text>
  </svg>
);
