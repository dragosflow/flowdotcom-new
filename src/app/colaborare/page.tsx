import type { Metadata } from "next";
import { CollaborationView } from "@/views/collaboration";
import { collaborationContent } from "@/data/mocks/collaboration";
import { footerContent } from "@/data/mocks/contact";
import { JsonLd } from "@/components/common/json-ld";
import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import {
  getBreadcrumbStructuredData,
  getWebPageStructuredData,
} from "@/utils/seo/structured-data";

const title = "Colaborare — flowdotcom | FLOWDOTCOM S.R.L";
const description =
  "Contactează FLOWDOTCOM S.R.L (flowdotcom) pentru următorul produs digital: web, mobile, animații sau experiențe 3D. Brief scurt, propunere clară, build împreună.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  url: "/colaborare",
});

export default function ColaborarePage() {
  return (
    <>
      <JsonLd
        data={[
          getWebPageStructuredData({
            path: "/colaborare",
            title,
            description,
          }),
          getBreadcrumbStructuredData([
            { name: "Acasă", path: "/" },
            { name: "Colaborare", path: "/colaborare" },
          ]),
        ]}
      />
      <CollaborationView content={collaborationContent} footer={footerContent} />
    </>
  );
}
