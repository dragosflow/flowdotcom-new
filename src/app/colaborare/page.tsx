import type { Metadata } from "next";
import { CollaborationView } from "@/views/collaboration";
import { collaborationContent } from "@/data/mocks/collaboration";
import { footerContent } from "@/data/mocks/contact";
import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";

export const metadata: Metadata = buildMetadata({
  title: "Colaborare — flowdotcom",
  description:
    "Hai să vorbim despre următorul produs. Brief scurt, propunere clară, build împreună — contactează flowdotcom.",
  url: "/colaborare",
});

export default function ColaborarePage() {
  return (
    <CollaborationView content={collaborationContent} footer={footerContent} />
  );
}
