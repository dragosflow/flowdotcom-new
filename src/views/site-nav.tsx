"use client";

// Fixed site header overlaid on the page: a brand pill and a separate links pill on
// the left, and a white CTA on the right — all the same height (h-11). The current
// route’s nav item (and brand when on `/`) is not a link — aria-current + muted.
// Clickable in-app links show a small screenshot preview on hover (desktop only).
import { useRef, type ReactNode, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Zap } from "lucide-react";
import { Hover } from "@/components/animation/springs/hover";
import { Magnetic } from "@/components/common/magnetic";
import { isInAppPageHref } from "@/utils/nav-preview";
import { FOCUS_RING } from "@/lib/focus-ring";

export interface SiteNavItem {
  label: string;
  href: string;
  /** Page screenshot for hover preview (public path). */
  preview?: string;
}

export interface SiteNavContent {
  brand: string;
  /** Home screenshot when brand links away from `/`. */
  brandPreview?: string;
  items: SiteNavItem[];
  cta: SiteNavItem;
}

export interface SiteNavProps extends SiteNavContent {
  /** Accessible name for the <nav> landmark. */
  navLabel?: string;
}

const PILL =
  "flex h-11 items-center rounded-full border border-white/10 bg-black/30 backdrop-blur-md";

const PREVIEW_CONFIG = { tension: 320, friction: 28 };

const normalizePath = (pathname: string) => pathname.replace(/\/$/, "") || "/";

const pathsMatch = (href: string, pathname: string) => {
  if (
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("#")
  ) {
    return false;
  }
  try {
    const url = new URL(href, "http://local");
    return normalizePath(url.pathname) === normalizePath(pathname);
  } catch {
    return normalizePath(href) === normalizePath(pathname);
  }
};

const PagePreview = ({
  trigger,
  image,
}: {
  trigger: RefObject<HTMLElement | null>;
  image: string;
}) => (
  <Hover
    trigger={trigger}
    tag='div'
    aria-hidden='true'
    className='pointer-events-none absolute left-1/2 top-[calc(100%+0.35rem)] z-[60] w-44 origin-top -translate-x-1/2 sm:w-52'
    from={{ opacity: 0, y: 6, scale: 0.96 }}
    to={{ opacity: 1, y: 0, scale: 1 }}
    config={PREVIEW_CONFIG}
    delayIn={40}
    delayOut={20}
    disableOnMobile
  >
    <div
      className='mx-auto h-0 w-0 border-x-[6px] border-b-[7px] border-x-transparent border-b-white'
      aria-hidden='true'
    />
    <div className='overflow-hidden rounded-xl border border-white/25 bg-white shadow-2xl'>
      <div className='relative aspect-[2/1] w-full'>
        <Image
          src={image}
          alt=''
          fill
          sizes='208px'
          className='object-cover object-top'
        />
      </div>
    </div>
  </Hover>
);

const NavLink = ({
  href,
  preview,
  className,
  children,
  cursor,
  cursorLabel,
}: {
  href: string;
  preview?: string;
  className: string;
  children: ReactNode;
  cursor?: "link" | "cta";
  cursorLabel?: string;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const showPreview = Boolean(preview) && isInAppPageHref(href);
  return (
    <span className='relative inline-flex'>
      <Link
        ref={ref}
        href={href}
        className={className}
        data-cursor={cursor ?? "link"}
        {...(cursorLabel ? { "data-cursor-label": cursorLabel } : {})}
      >
        {children}
      </Link>
      {showPreview && preview ? (
        <PagePreview trigger={ref} image={preview} />
      ) : null}
    </span>
  );
};

export const SiteNav = ({
  brand,
  brandPreview,
  items,
  cta,
  navLabel = "Primary",
}: SiteNavProps) => {
  const pathname = usePathname();
  const onHome = pathsMatch("/", pathname);

  return (
    <header className='fixed inset-x-4 top-4 z-50 flex items-center justify-between gap-4 text-white md:inset-x-6 md:top-6'>
      <div className='flex items-center gap-3'>
        {onHome ? (
          <span
            className={`${PILL} gap-2 px-5 font-medium text-white/50`}
            aria-current='page'
          >
            <Zap className='h-4 w-4' aria-hidden='true' strokeWidth={2.25} />
            {brand}
          </span>
        ) : (
          <NavLink
            href='/'
            preview={brandPreview}
            className={`${PILL} gap-2 px-5 font-medium ${FOCUS_RING}`}
          >
            <Zap className='h-4 w-4' aria-hidden='true' strokeWidth={2.25} />
            {brand}
          </NavLink>
        )}
        <nav aria-label={navLabel} className={`${PILL} hidden px-2 md:flex`}>
          {items.map((item) => {
            const current = pathsMatch(item.href, pathname);
            if (current) {
              return (
                <span
                  key={item.label}
                  aria-current='page'
                  className='rounded-full px-4 py-2 text-sm text-white/40'
                >
                  {item.label}
                </span>
              );
            }
            return (
              <Hover
                key={item.label}
                tag='span'
                className='inline-flex'
                from={{ opacity: 0.8 }}
                to={{ opacity: 1 }}
                config={{ tension: 320, friction: 24 }}
                disableOnMobile
              >
                <NavLink
                  href={item.href}
                  preview={item.preview}
                  className={`rounded-full px-4 py-2 text-sm text-white ${FOCUS_RING}`}
                >
                  {item.label}
                </NavLink>
              </Hover>
            );
          })}
        </nav>
      </div>
      {pathsMatch(cta.href, pathname) ? (
        <span className='inline-flex h-11 items-center gap-1.5 rounded-full bg-white/70 px-6 text-sm font-medium text-plum/70'>
          {cta.label}
        </span>
      ) : (
        <Magnetic>
          <Hover
            tag='span'
            className='inline-flex'
            from={{ transform: "scale(1)" }}
            to={{ transform: "scale(1.04)" }}
            config={{ tension: 320, friction: 20 }}
            disableOnMobile
          >
            <NavLink
              href={cta.href}
              preview={cta.preview}
              cursor='cta'
              cursorLabel={cta.label}
              className={`inline-flex h-11 items-center gap-1.5 rounded-full bg-white px-6 text-sm font-medium text-plum shadow-sm hover:bg-white/90 ${FOCUS_RING}`}
            >
              {cta.label}
              <ArrowUpRight
                className='h-3.5 w-3.5'
                aria-hidden='true'
                strokeWidth={2.25}
              />
            </NavLink>
          </Hover>
        </Magnetic>
      )}
    </header>
  );
};
