"use client";

// Services product grid — slides up over the pinned process (home Product over
// Chain). Cascade rise on tiles + Hover scale/rotate on icon chips.
import { useRef } from "react";
import { animated } from "@react-spring/web";
import { Hover } from "@/components/animation/springs/hover";
import { AnimatedHeading } from "@/components/common/animated-heading";
import { useRevealCascade } from "@/components/common/use-reveal-cascade";
import { ServiceIcon } from "@/views/services-icons";
import type { ServiceItem } from "@/data/mocks/services";

export interface ServicesListProps {
  labelId: string;
  heading: string;
  items: ServiceItem[];
}

const CARD_RISE = 32;
const CARD_BLUR = 14;
const HOVER_CONFIG = { tension: 280, friction: 26 };
const ICON_HOVER = { tension: 340, friction: 18 };

const CATEGORY_CHIP: Record<ServiceItem["category"], string> = {
  Web: "bg-accent-blue text-white",
  Mobile: "bg-accent-lime text-black",
  Intern: "bg-black text-hero-page",
  Design: "bg-plum text-white",
};

const ServiceCard = ({
  item,
  index,
  localProg,
  p,
}: {
  item: ServiceItem;
  index: number;
  localProg: (v: number, i: number) => number;
  p: ReturnType<typeof useRevealCascade>["p"];
}) => {
  const ref = useRef<HTMLElement>(null);

  return (
    <animated.article
      ref={ref}
      style={{
        opacity: p.to((v) => localProg(v, index)),
        transform: p.to(
          (v) => `translateY(${CARD_RISE * (1 - localProg(v, index))}px)`,
        ),
        filter: p.to(
          (v) => `blur(${CARD_BLUR * (1 - localProg(v, index))}px)`,
        ),
      }}
      className="rounded-3xl bg-card-gray text-black [will-change:transform,opacity]"
    >
      <Hover
        trigger={ref}
        tag="div"
        className="flex min-h-[15rem] flex-col p-7"
        from={{ transform: "scale(1)" }}
        to={{ transform: "scale(1.02)" }}
        config={HOVER_CONFIG}
        disableOnMobile
      >
        <div className="flex items-start justify-between gap-4">
          <Hover
            trigger={ref}
            tag="span"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${CATEGORY_CHIP[item.category]}`}
            from={{ transform: "scale(1) rotate(0deg)" }}
            to={{ transform: "scale(1.14) rotate(-8deg)" }}
            config={ICON_HOVER}
            disableOnMobile
          >
            <ServiceIcon id={item.icon} />
          </Hover>
          <span className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-black/45">
            {item.category}
          </span>
        </div>
        <h3 className="mt-8 text-xl font-medium leading-snug tracking-tight">
          {item.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-black/65">
          {item.body}
        </p>
      </Hover>
    </animated.article>
  );
};

export const ServicesList = ({
  labelId,
  heading,
  items,
}: ServicesListProps) => {
  const { p, rootRef, localProg } = useRevealCascade<HTMLDivElement>(
    items.length,
    { duration: 3200, spread: 0.8 },
  );

  return (
    <section
      aria-labelledby={labelId}
      className="relative z-20 bg-hero-page px-6 pb-24 pt-24 text-black md:px-12 lg:px-page-gutter"
    >
      <AnimatedHeading
        as="h2"
        id={labelId}
        className="mb-12 max-w-3xl text-[2rem] font-light leading-[0.95] tracking-tight text-black sm:text-[2.5rem] lg:text-[3.5rem]"
      >
        {heading}
      </AnimatedHeading>

      <div
        ref={rootRef}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item, i) => (
          <ServiceCard
            key={item.title}
            item={item}
            index={i}
            p={p}
            localProg={localProg}
          />
        ))}
      </div>
    </section>
  );
};
