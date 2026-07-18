import type { Metadata } from "next";
import { HomeView } from "@/views/home";
import { homeContent } from "@/data/mocks/home";
import { JsonLd } from "@/components/common/json-ld";
import { siteConfig } from "@/lib/site";
import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import { getWebPageStructuredData } from "@/utils/seo/structured-data";

/** Absolute — home already includes the brand; skip the layout `%s · flowdotcom` template. */
const title = `${siteConfig.name} — ${siteConfig.tagline}`;
const description = siteConfig.description;

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  description,
  url: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd
        data={getWebPageStructuredData({
          path: "/",
          title,
          description,
        })}
      />
      <HomeView content={homeContent} />
    </>
  );
}
