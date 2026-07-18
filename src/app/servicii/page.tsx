import type { Metadata } from "next";
import { ServicesView } from "@/views/services";
import { servicesContent } from "@/data/mocks/services";
import { footerContent } from "@/data/mocks/contact";
import { JsonLd } from "@/components/common/json-ld";
import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import {
  getBreadcrumbStructuredData,
  getWebPageStructuredData,
} from "@/utils/seo/structured-data";

const title = "Servicii — flowdotcom | web, mobile, animații & 3D";
const description =
  "Servicii FLOWDOTCOM S.R.L (flowdotcom): platforme web, aplicații mobile, sisteme interne, design orientat pe business, animații web și scene 3D / WebGL. Proces clar de la discovery la launch.";

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
            title,
            description,
          }),
          getBreadcrumbStructuredData([
            { name: "Acasă", path: "/" },
            { name: "Servicii", path: "/servicii" },
          ]),
        ]}
      />
      <ServicesView content={servicesContent} footer={footerContent} />
    </>
  );
}
