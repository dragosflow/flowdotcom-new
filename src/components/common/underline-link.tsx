"use client";

// Text link with a spring-scaled underline (scaleX), plus custom-cursor `link`
// target. Use for secondary CTAs / footer / nav text — not for pill buttons.
import { useRef, type ReactNode, type ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { Hover } from "@/components/animation/springs/hover";
import { FOCUS_RING } from "@/lib/focus-ring";

type AnchorProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  children: ReactNode;
  className?: string;
  /** Use next/link for in-app routes. Default true when href starts with `/`. */
  internal?: boolean;
};

export const UnderlineLink = ({
  href,
  children,
  className = "",
  internal,
  ...rest
}: AnchorProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const useLink = internal ?? (href.startsWith("/") && !href.startsWith("//"));

  const shared = `group relative inline-flex items-center gap-1.5 ${FOCUS_RING} ${className}`;

  const underline = (
    <Hover
      trigger={ref}
      tag='span'
      aria-hidden='true'
      className='pointer-events-none absolute inset-x-0 -bottom-0.5 h-px origin-left bg-current'
      from={{ transform: "scaleX(0)" }}
      to={{ transform: "scaleX(1)" }}
      config={{ tension: 280, friction: 24 }}
      disableOnMobile
    />
  );

  if (useLink) {
    return (
      <Link
        ref={ref}
        href={href}
        className={shared}
        data-cursor='link'
        {...rest}
      >
        {children}
        {underline}
      </Link>
    );
  }

  return (
    <a ref={ref} href={href} className={shared} data-cursor='link' {...rest}>
      {children}
      {underline}
    </a>
  );
};
