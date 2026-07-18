import type { Metadata } from "next";
import { ServicesView } from "@/views/services";
import { servicesContent } from "@/data/mocks/services";
import { footerContent } from "@/data/mocks/contact";
import { JsonLd } from "@/components/common/json-ld";
import { siteConfig } from "@/lib/site";
import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import {
  getBreadcrumbStructuredData,
  getWebPageStructuredData,
} from "@/utils/seo/structured-data";

/** Segment only — layout template appends `· flowdotcom`. */
const title = "Servicii";
const documentTitle = `${title} · ${siteConfig.name}`;
const description =
  "Platforme web, aplicații mobile, sisteme interne, design orientat pe business, animații web și scene 3D / WebGL. Proces clar de la discovery la launch.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  url: "/servicii",
});

export default function ServiciiPage() {
  return (
    <>
      <JsonLd
        data={[
          getWebPageStructuredData({
            path: "/servicii",
            title: documentTitle,
            description,
          }),
          getBreadcrumbStructuredData([
            { name: "Acasă", path: "/" },
            { name: title, path: "/servicii" },
          ]),
        ]}
      />
      <ServicesView content={servicesContent} footer={footerContent} />
    </>
  );
}
