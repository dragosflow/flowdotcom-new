"use client";

// Site footer — a full-height blue mesh-gradient panel (with a chrome iPhone mock
// that settles at its centre on desktop only, see FooterScene) that slides up over
// the pinned contact form (relative z-20 over the form's sticky z-10, the same
// two-layer reveal the Product uses over the chain; see home.tsx). Laid out as a
// full-height column: a centred "questions?" heading + jump-to-form link at the
// top, the phone in the open centre (md+), then the link columns and bottom bar
// pushed to the base.
import { ArrowUpRight } from "lucide-react";
import type { FooterContent, FooterLink } from "@/data/mocks/contact";
import { FooterScene } from "@/views/footer-scene";
import { AnimatedHeading } from "@/components/common/animated-heading";
import { MagneticCta } from "@/components/common/magnetic-cta";
import { UnderlineLink } from "@/components/common/underline-link";
import { FOCUS_RING } from "@/lib/focus-ring";

export interface SiteFooterProps {
  content: FooterContent;
}

// External links open in a new tab and carry rel="noopener"; in-page/placeholder
// anchors are plain same-origin hrefs.
const linkProps = (link: FooterLink) =>
  link.external
    ? { href: link.href, target: "_blank", rel: "noopener" as const }
    : { href: link.href };

export const SiteFooter = ({ content }: SiteFooterProps) => {
  const {
    labelId,
    heading,
    cta,
    backToTop,
    linksLabel,
    sitemap,
    contact,
    copyright,
    credit,
    tagline,
    entityNote,
  } = content;

  const colTitle =
    "mb-4 text-sm font-medium uppercase tracking-wide text-footer-muted sm:text-xs";
  const colLink = "text-base text-footer-fg/80 hover:text-footer-fg sm:text-sm";

  return (
    <footer
      aria-labelledby={labelId}
      className='relative z-20 flex min-h-lvh flex-col overflow-hidden bg-footer px-6 pb-0 pt-20 text-footer-fg md:px-10 lg:px-12'
    >
      <FooterScene />

      <div className='relative z-10 flex flex-1 flex-col'>
        <div className='flex flex-col items-center text-center'>
          <AnimatedHeading
            as='h2'
            id={labelId}
            className='mx-auto max-w-[14ch] text-[2rem] font-light leading-[1.05] tracking-tight sm:text-[2.5rem] lg:max-w-none lg:text-[4rem]'
          >
            {heading}
          </AnimatedHeading>
          <MagneticCta className='mt-8' cursorLabel={cta.label}>
            <a
              href={cta.href}
              className={`inline-flex min-h-12 items-center gap-2 rounded-full border border-footer-fg/25 bg-footer-fg/10 px-8 py-4 text-lg font-medium backdrop-blur-md hover:border-footer-fg/45 hover:bg-footer-fg/20 sm:min-h-0 sm:px-6 sm:py-3 sm:text-sm ${FOCUS_RING}`}
            >
              {cta.label}
              <ArrowUpRight
                className='h-3.5 w-3.5'
                aria-hidden='true'
                strokeWidth={2.25}
              />
            </a>
          </MagneticCta>
        </div>

        <div className='flex-1' />

        <nav
          aria-label='Footer'
          className='-mx-6 mt-16 flex flex-col gap-10 border-t border-footer-fg/15 px-6 pt-12 md:-mx-10 md:mt-12 md:flex-row md:justify-between md:px-10 lg:-mx-12 lg:px-12'
        >
          <div className='flex gap-12 sm:gap-20'>
            <div>
              <h3 className={colTitle}>{linksLabel}</h3>
              <UnderlineLink
                href={backToTop.href}
                internal={false}
                className={colLink}
              >
                {backToTop.label}
              </UnderlineLink>
            </div>

            <div>
              <h3 className={colTitle}>{sitemap.title}</h3>
              <ul className='flex flex-col gap-2'>
                {sitemap.links.map((link) => (
                  <li key={link.label}>
                    <UnderlineLink
                      {...linkProps(link)}
                      internal={!link.external}
                      className={colLink}
                    >
                      {link.label}
                    </UnderlineLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className={colTitle}>{contact.title}</h3>
            <address className='flex flex-col gap-2 text-sm not-italic text-footer-fg/80'>
              <span className='font-medium text-footer-fg'>
                {contact.company}
              </span>
              <span>{contact.address}</span>
              <UnderlineLink
                href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                internal={false}
                className='hover:text-footer-fg'
              >
                {contact.phone}
              </UnderlineLink>
              <UnderlineLink
                href={`mailto:${contact.email}`}
                internal={false}
                className='hover:text-footer-fg'
              >
                {contact.email}
              </UnderlineLink>
            </address>
          </div>
        </nav>

        {/* Bottom legal bar — navy scrim + bottom padding here (not on <footer>)
            so there’s no empty gap under the copy. */}
        <div className='-mx-6 mt-10 border-t border-footer-fg/10 bg-gradient-to-t from-footer from-50% via-footer/95 to-transparent px-6 pb-6 pt-6 text-sm md:-mx-10 md:px-10 md:pb-10 md:text-xs lg:-mx-12 lg:px-12 lg:pb-12'>
          <div className='flex flex-col gap-2 text-footer-muted md:flex-row md:items-start md:justify-between md:gap-6'>
            <div className='flex flex-col gap-2'>
              <p>{entityNote}</p>
              <p>{copyright}</p>
            </div>
            <p className='md:text-right'>
              <span>{tagline}</span>
              <span className='mx-2 text-footer-fg/35' aria-hidden='true'>
                ·
              </span>
              {credit}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
