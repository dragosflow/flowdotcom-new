import type { Metadata } from "next";
import { HomeView } from "@/views/home";
import { homeContent } from "@/data/mocks/home";
import { JsonLd } from "@/components/common/json-ld";
import { siteConfig } from "@/lib/site";
import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import { getWebPageStructuredData } from "@/utils/seo/structured-data";

const title = `${siteConfig.name} — ${siteConfig.tagline}`;
const description = siteConfig.description;

export const metadata: Metadata = buildMetadata({
  title,
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
