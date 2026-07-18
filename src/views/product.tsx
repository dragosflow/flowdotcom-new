"use client";

// Product explainer — a big heading + CTA and a right-aligned lead, then a bento of
// three cards: a wide card with a photo background, and two light-grey cards. Cards do a
// soft staggered reveal (opacity + blur + slight rise) on scroll, driven by the shared
// ticker via useRevealCascade (react-spring self-springs don't run here — see ADR-0015).
// Copy from props.
import Image from "next/image";
import Link from "next/link";
import { animated } from "@react-spring/web";
import { ArrowUpRight } from "lucide-react";
import { AnimatedHeading } from "@/components/common/animated-heading";
import { MagneticCta } from "@/components/common/magnetic-cta";
import { useRevealCascade } from "@/components/common/use-reveal-cascade";
import { FOCUS_RING } from "@/lib/focus-ring";
import type { ProductContent } from "@/data/mocks/product";

export interface ProductProps {
  content: ProductContent;
}

const CARD_RISE = 24; // px cards rise from
const CARD_BLUR = 12; // px soft start blur

export const Product = ({ content }: ProductProps) => {
  const { labelId, heading, cta, cards } = content;
  const { p, rootRef, localProg } = useRevealCascade<HTMLDivElement>(3);
  const cardStyle = (i: number) => ({
    opacity: p.to((v) => localProg(v, i)),
    transform: p.to(
      (v) => `translateY(${CARD_RISE * (1 - localProg(v, i))}px)`,
    ),
    filter: p.to((v) => `blur(${CARD_BLUR * (1 - localProg(v, i))}px)`),
  });
  return (
    <section
      aria-labelledby={labelId}
      className='relative z-20 bg-hero-page px-6 py-24 text-black md:px-12 lg:px-page-gutter'
    >
      {/* Heading + CTA, centred — solo primary CTA is larger on mobile */}
      <div className='mb-10 flex flex-col items-center text-center sm:mb-14'>
        <AnimatedHeading
          as='h2'
          id={labelId}
          className='text-[2rem] font-light leading-[0.95] tracking-tight text-black sm:text-[2.5rem] lg:text-[4rem]'
        >
          {heading}
        </AnimatedHeading>
        <MagneticCta className='mt-8' cursorLabel={cta.label}>
          <Link
            href={cta.href}
            className={`inline-flex min-h-12 items-center gap-2 rounded-full bg-black px-8 py-4 text-lg font-medium text-white hover:bg-black/90 sm:min-h-0 sm:px-6 sm:py-3 sm:text-sm ${FOCUS_RING}`}
          >
            {cta.label}
            <ArrowUpRight
              className='h-4 w-4 sm:h-3.5 sm:w-3.5'
              aria-hidden='true'
              strokeWidth={2.25}
            />
          </Link>
        </MagneticCta>
      </div>

      {/* Bento — compact on mobile (no forced tall min-height); stretch only on lg */}
      <div ref={rootRef} className='grid gap-4 sm:gap-5 lg:grid-cols-4'>
        <animated.article
          style={cardStyle(0)}
          className='relative flex flex-col gap-5 overflow-hidden rounded-3xl p-6 text-black sm:gap-6 sm:p-8 lg:col-span-2 lg:min-h-[26rem] lg:justify-between lg:gap-0 [will-change:transform,opacity]'
        >
          <Image
            src='/assets/images/6th.png'
            alt=''
            fill
            sizes='(max-width: 1024px) 100vw, 50vw'
            className='object-cover'
          />
          <h3 className='relative text-2xl leading-snug tracking-tight'>
            {cards.grow.title}
          </h3>
          <p className='relative max-w-md text-lg leading-relaxed text-black/75'>
            {cards.grow.body}
          </p>
        </animated.article>

        <animated.article
          style={cardStyle(1)}
          className='flex flex-col gap-5 rounded-3xl bg-card-gray p-6 text-black sm:gap-6 sm:p-8 lg:min-h-[26rem] lg:justify-between lg:gap-0 [will-change:transform,opacity]'
        >
          <h3 className='text-2xl leading-snug tracking-tight'>
            {cards.liquid.title}
          </h3>
          <p className='text-lg leading-relaxed text-black/75'>
            {cards.liquid.body}
          </p>
        </animated.article>

        <animated.article
          style={cardStyle(2)}
          className='flex flex-col gap-5 rounded-3xl bg-card-gray p-6 text-black sm:gap-6 sm:p-8 lg:min-h-[26rem] lg:justify-between lg:gap-0 [will-change:transform,opacity]'
        >
          <h3 className='text-2xl leading-snug tracking-tight'>
            {cards.hands.title}
          </h3>
          <p className='text-lg leading-relaxed text-black/75'>
            {cards.hands.body}
          </p>
        </animated.article>
      </div>
    </section>
  );
};
