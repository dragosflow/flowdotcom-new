"use client";

// Fixed site header overlaid on the page: brand + links pill (desktop) on the
// left; on mobile a phone icon + Menu on the right (phone sits immediately left
// of Menu). Desktop keeps the text CTA on the right. Mobile opens a spring panel
// with the same page links. Current route’s nav item (and brand when on `/`) is
// not a link — aria-current + muted. In-app links show screenshot previews on
// hover (desktop only).
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { animated, useSpring } from "@react-spring/web";
import { ArrowUpRight, Menu, Phone, X, Zap } from "lucide-react";
import { Hover } from "@/components/animation/springs/hover";
import { Magnetic } from "@/components/common/magnetic";
import { isInAppPageHref } from "@/utils/nav-preview";
import { FOCUS_RING } from "@/lib/focus-ring";
import { siteConfig } from "@/lib/site";

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
  "flex h-12 items-center rounded-full border border-white/10 bg-black/30 backdrop-blur-md sm:h-11";

const PREVIEW_CONFIG = { tension: 320, friction: 28 };
const MENU_CONFIG = { tension: 280, friction: 28 };

const PHONE_HREF = `tel:${siteConfig.contact.telephone}`;

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
  onNavigate,
}: {
  href: string;
  preview?: string;
  className: string;
  children: ReactNode;
  cursor?: "link" | "cta";
  cursorLabel?: string;
  onNavigate?: () => void;
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
        onClick={onNavigate}
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const menuSpring = useSpring({
    opacity: menuOpen ? 1 : 0,
    y: menuOpen ? 0 : -10,
    config: MENU_CONFIG,
  });

  const closeMenu = () => setMenuOpen(false);
  const phoneHref = cta.href.startsWith("tel:") ? cta.href : PHONE_HREF;
  const phoneLabel = cta.href.startsWith("tel:") ? cta.label : "Sună acum";

  return (
    <header className='fixed inset-x-4 top-4 z-50 text-white md:inset-x-6 md:top-6'>
      {menuOpen ? (
        <button
          type='button'
          aria-label='Închide meniul'
          className='fixed inset-0 z-40 bg-black/40 md:hidden'
          onClick={closeMenu}
        />
      ) : null}

      <div className='relative z-50 flex items-center justify-between gap-3'>
        <div className='flex min-w-0 items-center gap-3'>
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
              onNavigate={closeMenu}
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
                    className='rounded-full px-4 py-2 text-base text-white/40 sm:text-sm'
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
                    className={`rounded-full px-4 py-2 text-base text-white sm:text-sm ${FOCUS_RING}`}
                  >
                    {item.label}
                  </NavLink>
                </Hover>
              );
            })}
          </nav>
        </div>

        <div className='flex shrink-0 items-center gap-2 sm:gap-3'>
          {/* Mobile: phone icon immediately left of Menu */}
          <a
            href={phoneHref}
            aria-label={phoneLabel}
            data-cursor='cta'
            data-cursor-label={phoneLabel}
            className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-plum shadow-sm hover:bg-white/90 md:hidden ${FOCUS_RING}`}
          >
            <Phone className='h-5 w-5' aria-hidden='true' strokeWidth={2.25} />
          </a>

          <button
            type='button'
            className={`${PILL} px-4 md:hidden ${FOCUS_RING}`}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className='h-5 w-5' aria-hidden='true' strokeWidth={2.25} />
            ) : (
              <Menu className='h-5 w-5' aria-hidden='true' strokeWidth={2.25} />
            )}
          </button>

          {/* Desktop: full text CTA */}
          {pathsMatch(cta.href, pathname) ? (
            <span className='hidden h-11 items-center gap-1.5 rounded-full bg-white/70 px-6 text-sm font-medium text-plum/70 md:inline-flex'>
              {cta.label}
            </span>
          ) : (
            <span className='hidden md:inline-flex'>
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
            </span>
          )}
        </div>
      </div>

      <animated.div
        className='absolute inset-x-0 top-[calc(100%+0.75rem)] z-50 md:hidden'
        style={{
          opacity: menuSpring.opacity,
          transform: menuSpring.y.to((value) => `translateY(${value}px)`),
          pointerEvents: menuOpen ? "auto" : "none",
          visibility: menuSpring.opacity.to((value) =>
            value < 0.01 ? "hidden" : "visible",
          ),
        }}
        aria-hidden={!menuOpen}
      >
        <nav
          id={menuId}
          aria-label={navLabel}
          className='rounded-3xl border border-white/10 bg-black/80 p-2 shadow-2xl backdrop-blur-md'
        >
          <ul className='flex flex-col'>
            {items.map((item) => {
              const current = pathsMatch(item.href, pathname);
              return (
                <li key={item.label}>
                  {current ? (
                    <span
                      aria-current='page'
                      className='block rounded-2xl px-5 py-3.5 text-base text-white/40'
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block rounded-2xl px-5 py-3.5 text-base text-white hover:bg-white/10 ${FOCUS_RING}`}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </animated.div>
    </header>
  );
};
