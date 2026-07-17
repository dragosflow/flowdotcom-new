// Collaboration / contact page — related design system to /servicii, different layout.
import type { SiteNavContent } from "@/views/site-nav";
import type { ProcessStep } from "@/data/mocks/services";
import { navWithCta } from "@/data/mocks/nav";

export interface CollaborationChannel {
  label: string;
  value: string;
  /** Omit for non-link rows (e.g. location). */
  href?: string;
}

export interface CollaborationIntroContent {
  labelId: string;
  heading: string;
  body: string;
}

export interface CollaborationFormContent {
  labelId: string;
  heading: string;
  fields: { name: string; phone: string; email: string; message: string };
  cta: string;
  success: string;
}

export interface CollaborationContent {
  nav: SiteNavContent;
  intro: CollaborationIntroContent;
  channels: {
    labelId: string;
    heading: string;
    items: CollaborationChannel[];
  };
  /** Sticky process band — same component as /servicii process. */
  ways: {
    labelId: string;
    heading: string;
    steps: ProcessStep[];
  };
  form: CollaborationFormContent;
}

const PHONE_DISPLAY = "0770 571 362";
const PHONE_HREF = "tel:+40770571362";
const EMAIL = "dragosflow@yahoo.com";

const siteNav = navWithCta({
  label: "Sună acum",
  href: PHONE_HREF,
});

export const collaborationContent: CollaborationContent = {
  nav: siteNav,
  intro: {
    labelId: "collaboration-intro",
    heading: "Hai să vorbim despre următorul produs",
    body: "Spune-ne unde ești acum și unde vrei să ajungi — răspundem rapid cu un plan clar, fără jargon inutil.",
  },
  channels: {
    labelId: "collaboration-channels",
    heading: "Contact direct",
    items: [
      {
        label: "Telefon",
        value: PHONE_DISPLAY,
        href: PHONE_HREF,
      },
      {
        label: "Email",
        value: EMAIL,
        href: `mailto:${EMAIL}`,
      },
      {
        label: "Locație",
        value: "România — remote-first",
      },
    ],
  },
  ways: {
    labelId: "collaboration-ways",
    heading: "Cum lucrăm împreună",
    steps: [
      {
        step: "01",
        title: "Brief scurt",
        body: "Ne spui obiectivul, constrângerile și ce ai deja. Nu e nevoie de un document perfect — ajunge o conversație clară.",
      },
      {
        step: "02",
        title: "Propunere",
        body: "Îți întoarcem un plan: scope, etape, timeline și investiție. Știi exact ce urmează înainte să începem.",
      },
      {
        step: "03",
        title: "Build împreună",
        body: "Lucrăm în sprinturi, cu demo-uri frecvente și priorități vizibile. Feedback-ul tău intră în produs, nu în backlog infinit.",
      },
      {
        step: "04",
        title: "Launch + grow",
        body: "Lansăm, măsurăm și iterăm. Rămânem alături după go-live când ai nevoie de creștere sau mentenanță.",
      },
    ],
  },
  form: {
    labelId: "collaboration-form",
    heading: "Sau scrie-ne aici",
    fields: {
      name: "Nume Prenume",
      phone: "Telefon",
      email: "Email",
      message: "Despre proiect",
    },
    cta: "Trimite mesajul",
    success: "Mulțumim — revenim în curând.",
  },
};
