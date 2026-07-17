"use client";

// Services hero — same simple pattern as collaboration: centered AnimatedHeading
// + body + optional CTA. No letter cascade, no insight aside.
import { ArrowUpRight } from "lucide-react";
import { Inview } from "@/components/animation/springs/in-view";
import { AnimatedHeading } from "@/components/common/animated-heading";
import { MagneticCta } from "@/components/common/magnetic-cta";
import { FOCUS_RING } from "@/lib/focus-ring";
import type { ServicesIntroContent } from "@/data/mocks/services";

export interface ServicesIntroProps {
  content: ServicesIntroContent;
}

export const ServicesIntro = ({ content }: ServicesIntroProps) => {
  const { labelId, heading, body, cta } = content;

  return (
    <section
      aria-labelledby={labelId}
      className="bg-hero-page px-6 pb-20 pt-32 text-black md:px-12 md:pt-40 lg:px-page-gutter"
    >
      <div className="mx-auto max-w-3xl text-center">
        <AnimatedHeading
          as="h1"
          id={labelId}
          className="text-[2.25rem] font-light leading-[0.95] tracking-tight sm:text-[2.75rem] lg:text-[4rem]"
        >
          {heading}
        </AnimatedHeading>
        <Inview
          tag="p"
          innerTag="span"
          mode="once"
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 220, friction: 28 }}
          delayIn={120}
          className="mx-auto mt-8 block max-w-xl text-base leading-relaxed text-black/60 sm:text-lg"
        >
          {body}
        </Inview>
        <Inview
          tag="div"
          mode="once"
          from={{ opacity: 0, y: 14 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 240, friction: 28 }}
          delayIn={220}
          className="mt-10"
        >
          <MagneticCta cursorLabel={cta.label}>
            <a
              href={cta.href}
              className={`inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/90 ${FOCUS_RING}`}
            >
              {cta.label}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2.25} />
            </a>
          </MagneticCta>
        </Inview>
      </div>
    </section>
  );
};
