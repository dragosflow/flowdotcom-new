import type { Metadata } from "next";
import { ServicesView } from "@/views/services";
import { servicesContent } from "@/data/mocks/services";
import { footerContent } from "@/data/mocks/contact";
import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";

export const metadata: Metadata = buildMetadata({
  title: "Servicii — flowdotcom",
  description:
    "Platforme web, aplicații mobile, sisteme interne și design orientat pe business. Proces clar de la discovery la launch.",
  url: "/servicii",
});

export default function ServiciiPage() {
  return <ServicesView content={servicesContent} footer={footerContent} />;
}
