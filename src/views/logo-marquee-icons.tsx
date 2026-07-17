// Logo marquee marks. Application types use Lucide; technology brand marks stay
// as custom SVGs (no Lucide equivalents / trademark logos).
import type { ReactNode } from "react";
import {
  Users,
  AppWindow,
  ShoppingBag,
  LayoutTemplate,
  ChartColumn,
  House,
  Cloud,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export type MarqueeIconId =
  | "crm"
  | "website"
  | "eshop"
  | "landing"
  | "dashboard"
  | "portal"
  | "saas"
  | "mobile"
  | "ios"
  | "android"
  | "php"
  | "javascript"
  | "typescript"
  | "laravel"
  | "react"
  | "react-native"
  | "elixir"
  | "node"
  | "astro"
  | "livewire"
  | "postgres"
  | "firebase";

const APP_ICONS: Partial<Record<MarqueeIconId, LucideIcon>> = {
  crm: Users,
  website: AppWindow,
  eshop: ShoppingBag,
  landing: LayoutTemplate,
  dashboard: ChartColumn,
  portal: House,
  saas: Cloud,
  mobile: Smartphone,
  ios: Smartphone,
  android: Smartphone,
};

const Shell = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-9 w-9 shrink-0"
    fill="currentColor"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const TECH: Partial<Record<MarqueeIconId, ReactNode>> = {
  php: <ellipse cx="12" cy="11" rx="9.5" ry="5.5" />,
  javascript: (
    <path
      fillRule="evenodd"
      d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm7.2 10.8c0 1.6-.9 2.4-2.5 2.4-1.3 0-2.2-.7-2.6-1.6l1.4-.8c.2.5.6.8 1.1.8.5 0 .8-.2.8-.9v-4.9h1.8v4.9Zm3.4 2.4c-1.5 0-2.5-.7-3-1.7l1.4-.8c.3.6.8 1 1.5 1 .6 0 1-.3 1-.7 0-.5-.4-.7-1.2-1l-.4-.2c-1.2-.5-2-1.2-2-2.5 0-1.3 1-2.3 2.6-2.3 1.1 0 2 .4 2.6 1.4l-1.3.9c-.3-.5-.7-.7-1.2-.7-.5 0-.8.3-.8.7 0 .5.3.7 1.1 1l.4.2c1.4.6 2.2 1.3 2.2 2.7 0 1.5-1.2 2.4-2.9 2.4Z"
    />
  ),
  typescript: (
    <path
      fillRule="evenodd"
      d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm3.8 3.2h4.2v1.5H9.3v6.1H7.5v-6.1H5.5V9.2h1.3Zm8.4 7.8c-1.7 0-2.8-.8-3.2-2l1.5-.7c.2.6.7 1 1.6 1 .7 0 1.1-.3 1.1-.8 0-.5-.4-.7-1.4-1.1l-.5-.2c-1.4-.5-2.3-1.3-2.3-2.7 0-1.4 1.1-2.5 2.9-2.5 1.3 0 2.3.5 2.9 1.6l-1.4.8c-.3-.5-.7-.8-1.4-.8-.6 0-1 .3-1 .8 0 .5.4.7 1.4 1.1l.5.2c1.5.6 2.4 1.3 2.4 2.8 0 1.6-1.2 2.6-3.1 2.6Z"
    />
  ),
  laravel: (
    <path d="M3.8 8.2 8.2 5.6l4.3 2.5v5.1l-4.3 2.5-4.4-2.5V8.2Zm8.6-.1 4.4-2.5 4.3 2.5v.1l-4.3 2.5-4.4-2.5V8.1Zm0 5.6 4.4 2.5v.1l4.3-2.5V8.7l-4.3 2.5-4.4-2.5v5ZM8.2 16.8l4.2 2.4 4.3-2.5v-2.4l-4.3 2.5-4.2-2.4v2.4Z" />
  ),
  react: (
    <>
      <circle cx="12" cy="12" r="2.2" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        transform="rotate(120 12 12)"
      />
    </>
  ),
  "react-native": (
    <>
      <rect
        x="8"
        y="2.5"
        width="8"
        height="19"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="12" cy="12" r="1.4" />
      <ellipse
        cx="12"
        cy="12"
        rx="5.5"
        ry="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="5.5"
        ry="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="5.5"
        ry="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(120 12 12)"
      />
    </>
  ),
  elixir: (
    <path d="M12 2.5c2.8 3.2 6.5 7.4 6.5 11.2A6.5 6.5 0 0 1 5.5 13.7C5.5 9.9 9.2 5.7 12 2.5Z" />
  ),
  node: (
    <path
      fillRule="evenodd"
      d="M12 2.2 20.5 7v10L12 21.8 3.5 17V7L12 2.2Zm0 2.4L5.8 8.1v7.8L12 19.4l6.2-3.5V8.1L12 4.6Z"
    />
  ),
  astro: (
    <path d="M12 2.5 16.8 15H14l-1.2-3.2h-1.6L10 15H7.2L12 2.5Zm-1.3 11.2h2.6L12 20.5l-1.3-6.8Z" />
  ),
  livewire: <path d="M13 2 5.5 13.5H11l-.8 8.5L18.5 10H13V2Z" />,
  postgres: (
    <>
      <ellipse cx="12" cy="6.5" rx="7.5" ry="3" />
      <path d="M4.5 6.5v8c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-8" />
      <path
        d="M4.5 10.5c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </>
  ),
  firebase: (
    <path d="M5.5 17.8 9.2 4.5c.2-.6 1-.7 1.3-.2l2.2 3.4-1.8 3.4 5.4-4.2c.5-.4 1.2 0 1.1.6L16.2 18c-.2 1.2-1.3 2-2.5 2H8c-1.3 0-2.3-.9-2.5-2.2Z" />
  ),
};

export const MarqueeIcon = ({ id }: { id: MarqueeIconId }) => {
  const Lucide = APP_ICONS[id];
  if (Lucide) {
    return (
      <Lucide
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
        strokeWidth={1.75}
      />
    );
  }
  return <Shell>{TECH[id]}</Shell>;
};
