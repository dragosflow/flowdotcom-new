"use client";

// Collaboration hero — AnimatedHeading (not the services letter cascade). Contact
// channels sit as large linked rows under the copy so details are first-class.
import { useRef } from "react";
import { animated } from "@react-spring/web";
import { Mail, MapPin, Phone } from "lucide-react";
import { Hover } from "@/components/animation/springs/hover";
import { Inview } from "@/components/animation/springs/in-view";
import { AnimatedHeading } from "@/components/common/animated-heading";
import { useRevealCascade } from "@/components/common/use-reveal-cascade";
import { FOCUS_RING } from "@/lib/focus-ring";
import type {
  CollaborationChannel,
  CollaborationIntroContent,
} from "@/data/mocks/collaboration";

export interface CollaborationIntroProps {
  intro: CollaborationIntroContent;
  channels: {
    labelId: string;
    heading: string;
    items: CollaborationChannel[];
  };
}

const ROW_RISE = 28;
const ROW_BLUR = 10;

const ChannelIcon = ({ label }: { label: string }) => {
  const key = label.toLowerCase();
  const props = {
    className: "h-4 w-4 shrink-0",
    "aria-hidden": true as const,
    strokeWidth: 1.75,
  };
  if (key.includes("mail") || key.includes("email")) return <Mail {...props} />;
  if (key.includes("loc") || key.includes("map")) return <MapPin {...props} />;
  return <Phone {...props} />;
};

export const CollaborationIntro = ({
  intro,
  channels,
}: CollaborationIntroProps) => {
  const { p, rootRef, localProg } = useRevealCascade<HTMLUListElement>(
    channels.items.length,
    { duration: 1600, spread: 0.55 },
  );

  return (
    <section
      aria-labelledby={intro.labelId}
      className="bg-hero-page px-6 pb-20 pt-32 text-black md:px-12 md:pt-40 lg:px-page-gutter"
    >
      <div className="mx-auto max-w-3xl text-center">
        <AnimatedHeading
          as="h1"
          id={intro.labelId}
          className="text-[2.25rem] font-light leading-[0.95] tracking-tight sm:text-[2.75rem] lg:text-[4rem]"
        >
          {intro.heading}
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
          {intro.body}
        </Inview>
      </div>

      <div className="mx-auto mt-20 max-w-3xl">
        <Inview
          tag="h2"
          innerTag="span"
          mode="once"
          from={{ opacity: 0, y: 12 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 240, friction: 30 }}
          className="mb-8 block text-xs font-medium uppercase tracking-[0.2em] text-muted"
        >
          {channels.heading}
        </Inview>

        <ul
          ref={rootRef}
          aria-label={channels.heading}
          className="divide-y divide-black/10 border-y border-black/10"
        >
          {channels.items.map((item, i) => (
            <ChannelRow
              key={item.label}
              item={item}
              index={i}
              p={p}
              localProg={localProg}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

const ChannelRow = ({
  item,
  index,
  p,
  localProg,
}: {
  item: CollaborationChannel;
  index: number;
  p: ReturnType<typeof useRevealCascade>["p"];
  localProg: (v: number, i: number) => number;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const rowClass =
    "flex flex-col gap-1 py-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8";
  const body = (
    <>
      <span className="flex items-center gap-2 text-sm text-black/45">
        <ChannelIcon label={item.label} />
        {item.label}
      </span>
      <span className="text-2xl font-light tracking-tight sm:text-3xl lg:text-4xl">
        {item.value}
      </span>
    </>
  );

  return (
    <animated.li
      ref={ref}
      style={{
        opacity: p.to((v) => localProg(v, index)),
        transform: p.to(
          (v) => `translateY(${ROW_RISE * (1 - localProg(v, index))}px)`,
        ),
        filter: p.to(
          (v) => `blur(${ROW_BLUR * (1 - localProg(v, index))}px)`,
        ),
      }}
      className="[will-change:transform,opacity]"
    >
      {item.href ? (
        <Hover
          trigger={ref}
          tag="div"
          from={{ transform: "translateX(0px)" }}
          to={{ transform: "translateX(8px)" }}
          config={{ tension: 280, friction: 24 }}
          disableOnMobile
        >
          <a
            href={item.href}
            className={`${rowClass} ${FOCUS_RING}`}
            data-cursor="link"
          >
            {body}
          </a>
        </Hover>
      ) : (
        <div className={rowClass}>{body}</div>
      )}
    </animated.li>
  );
};
