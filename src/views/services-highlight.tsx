"use client";

// Specialty highlight — same hover photo-reveal columns as home Showcase, but
// two columns (Animații + Experiențe 3D). Clip-path + contrast scrim via <Hover>
// (ADR-0002). Photos in public/assets/images/3rd/.
import { useRef } from "react";
import Image from "next/image";
import { Hover } from "@/components/animation/springs/hover";
import { AnimatedHeading } from "@/components/common/animated-heading";
import type { ServicesHighlightContent } from "@/data/mocks/services";

export interface ServicesHighlightProps {
  content: ServicesHighlightContent;
}

const REVEAL_CONFIG = { tension: 170, friction: 26 };

const Column = ({
  prefix,
  name,
  body,
  image,
}: ServicesHighlightContent["items"][number]) => {
  const ref = useRef<HTMLElement>(null);
  return (
    <article
      ref={ref}
      className="relative min-h-[42vh] overflow-hidden rounded-2xl lg:min-h-[85vh] lg:rounded-none"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 1024px) 50vw, 50vw"
        className="object-cover lg:hidden"
      />

      <Hover
        trigger={ref}
        tag="div"
        className="absolute inset-0 hidden will-change-[clip-path] lg:block"
        from={{ clipPath: "inset(100% 0% 0% 0%)" }}
        to={{ clipPath: "inset(0% 0% 0% 0%)" }}
        config={REVEAL_CONFIG}
      >
        <Image src={image} alt="" fill sizes="50vw" className="object-cover" />
      </Hover>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent lg:hidden"
      />
      <Hover
        trigger={ref}
        tag="div"
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/2 origin-bottom bg-gradient-to-t from-white via-white/80 to-transparent will-change-transform lg:block"
        from={{ transform: "scaleY(0)" }}
        to={{ transform: "scaleY(1)" }}
        config={REVEAL_CONFIG}
      />

      <div className="pointer-events-none absolute inset-x-5 bottom-6 max-w-md lg:inset-x-8 lg:bottom-10">
        <span className="block text-2xl font-normal leading-[1.05] tracking-tight text-white lg:text-4xl lg:text-black">
          {prefix}
        </span>
        <span className="block text-2xl font-normal leading-[1.05] tracking-tight text-white lg:text-4xl lg:text-black">
          {name}
        </span>
        <p className="mt-3 text-base leading-relaxed text-white/80 lg:mt-4 lg:text-black/65">
          {body}
        </p>
      </div>
    </article>
  );
};

export const ServicesHighlight = ({ content }: ServicesHighlightProps) => {
  const { labelId, heading, items } = content;
  return (
    <section
      aria-labelledby={labelId}
      className="relative z-20 overflow-hidden border-y border-plum/10 bg-hero-page text-black"
    >
      <div className="relative z-10 px-6 pb-10 pt-14 md:px-10 lg:pointer-events-none lg:absolute lg:left-1/2 lg:right-0 lg:top-14 lg:z-20 lg:px-12 lg:pb-0">
        <AnimatedHeading
          as="h2"
          id={labelId}
          className="text-[2rem] font-light leading-[0.95] tracking-tight sm:text-[2.5rem] lg:text-[3rem]"
        >
          {heading}
        </AnimatedHeading>
      </div>

      <div className="grid grid-cols-1 gap-4 px-6 pb-6 sm:grid-cols-2 sm:gap-5 md:px-10 lg:grid-cols-2 lg:gap-0 lg:px-0 lg:pb-0 lg:divide-x lg:divide-plum/10">
        {items.map((item) => (
          <Column
            key={item.name}
            prefix={item.prefix}
            name={item.name}
            body={item.body}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
};
