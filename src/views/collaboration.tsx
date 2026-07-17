import { SiteNav } from "@/views/site-nav";
import { SiteFooter } from "@/views/site-footer";
import { CollaborationIntro } from "@/views/collaboration-intro";
import { ServicesProcess } from "@/views/services-process";
import type { CollaborationContent } from "@/data/mocks/collaboration";
import type { FooterContent } from "@/data/mocks/contact";

/**
 * Collaboration / contact view — centered hero + contact channels; sticky
 * “Cum lucrăm împreună” (ServicesProcess). Form temporarily hidden; footer
 * slides up over the process band.
 */
export interface CollaborationViewProps {
  content: CollaborationContent;
  footer: FooterContent;
}

export const CollaborationView = ({
  content,
  footer,
}: CollaborationViewProps) => {
  const { nav, intro, channels, ways } = content;
  return (
    <>
      <SiteNav {...nav} navLabel="Primary" />
      <main id="top" className="w-full bg-hero-page">
        <CollaborationIntro intro={intro} channels={channels} />
        <div className="relative">
          <ServicesProcess
            labelId={ways.labelId}
            heading={ways.heading}
            steps={ways.steps}
          />
          <SiteFooter content={footer} />
        </div>
      </main>
    </>
  );
};
