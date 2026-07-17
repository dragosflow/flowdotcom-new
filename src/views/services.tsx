import { SiteNav } from "@/views/site-nav";
import { SiteFooter } from "@/views/site-footer";
import { ServicesIntro } from "@/views/services-intro";
import { ServicesProcess } from "@/views/services-process";
import { ServicesHighlight } from "@/views/services-highlight";
import { ServicesList } from "@/views/services-list";
import type { ServicesContent } from "@/data/mocks/services";
import type { FooterContent } from "@/data/mocks/contact";

/**
 * Services view — typography hero → sticky process → hover photo highlight
 * (Animații + 3D, Showcase-style) → product list → footer.
 */
export interface ServicesViewProps {
  content: ServicesContent;
  footer: FooterContent;
}

export const ServicesView = ({ content, footer }: ServicesViewProps) => {
  const { nav, intro, process, highlight, list } = content;
  return (
    <>
      <SiteNav {...nav} navLabel="Primary" />
      <main id="top" className="w-full bg-hero-page">
        <ServicesIntro content={intro} />
        {/* Process pins; highlight + list (z-20) scroll up over it — see home.tsx. */}
        <div className="relative">
          <ServicesProcess
            labelId={process.labelId}
            heading={process.heading}
            steps={process.steps}
          />
          <ServicesHighlight content={highlight} />
          <ServicesList
            labelId={list.labelId}
            heading={list.heading}
            items={list.items}
          />
        </div>
        <SiteFooter content={footer} />
      </main>
    </>
  );
};
