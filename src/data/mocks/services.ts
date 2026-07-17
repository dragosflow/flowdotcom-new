// Services page content — intro + process + specialty highlight + product listing.
import type { SiteNavContent } from "@/views/site-nav";
import type { ServiceIconId } from "@/views/services-icons";
import { navWithCta } from "@/data/mocks/nav";

export interface ServicesIntroContent {
  labelId: string;
  heading: string;
  body: string;
  /** Primary action — typically tel: “Sună acum”. */
  cta: { label: string; href: string };
}

export interface ProcessStep {
  step: string;
  title: string;
  body: string;
}

export interface ServiceItem {
  title: string;
  body: string;
  category: "Web" | "Mobile" | "Intern" | "Design";
  icon: ServiceIconId;
}

export interface ServicesHighlightItem {
  prefix: string;
  name: string;
  /** Short explanation shown under the title. */
  body: string;
  /** Column image (public path). */
  image: string;
}

export interface ServicesHighlightContent {
  labelId: string;
  heading: string;
  items: ServicesHighlightItem[];
}

export interface ServicesContent {
  nav: SiteNavContent;
  intro: ServicesIntroContent;
  process: {
    labelId: string;
    heading: string;
    steps: ProcessStep[];
  };
  /** Specialty callout — Animații + Experiențe 3D, above the product grid. */
  highlight: ServicesHighlightContent;
  list: {
    labelId: string;
    heading: string;
    items: ServiceItem[];
  };
}

const siteNav = navWithCta({
  label: "Sună acum",
  href: "tel:+40770571362",
});

const specialtyItems: ServiceItem[] = [
  {
    title: "Site-uri & experiențe 3D",
    body: "Scene WebGL, modele interactive și fundaluri immersive care transformă un site într-o experiență de brand memorabilă.",
    category: "Web",
    icon: "webgl",
  },
];

export const servicesContent: ServicesContent = {
  nav: siteNav,
  intro: {
    labelId: "services-intro",
    heading: "De la idee la produs — ce putem construi?",
    body: "Strategie, design și dezvoltare end-to-end — claritate pe obiective, ritm transparent și livrabile pe care le poți măsura.",
    cta: { label: "Sună acum", href: "tel:+40770571362" },
  },
  process: {
    labelId: "services-process",
    heading: "Proces simplu, rezultate rapide",
    steps: [
      {
        step: "01",
        title: "Discovery",
        body: "Înțelegem business-ul, publicul și prioritățile reale. Mapăm scope-ul și livrăm un plan clar înainte de design sau cod.",
      },
      {
        step: "02",
        title: "UX + Arhitectură",
        body: "Definim fluxurile, design system-ul și structura tehnică. Vezi din timp cum arată produsul și pe ce se sprijină.",
      },
      {
        step: "03",
        title: "Build în sprinturi",
        body: "Implementăm incremental, cu demo-uri frecvente și feedback aplicat continuu — până la un release stabil.",
      },
      {
        step: "04",
        title: "Launch + Growth",
        body: "Lansăm, monitorizăm și iterăm pentru rezultate măsurabile: conversie, retenție sau eficiență operațională.",
      },
    ],
  },
  highlight: {
    labelId: "services-highlight",
    heading: "Experiențe care se simt",
    items: [
      {
        prefix: "Motion",
        name: "Animații",
        body: "Motion spring-based pe scroll, hover și micro-interacțiuni — prezență și ierarhie, nu zgomot. Site-ul se simte viu, fără lag.",
        image: "/assets/images/3rd/technology.jpg",
      },
      {
        prefix: "WebGL",
        name: "Site-uri & experiențe 3D",
        body: "Scene WebGL, modele interactive și fundaluri immersive care transformă un site într-o experiență de brand memorabilă.",
        image: "/assets/images/3rd/approach.png",
      },
    ],
  },
  list: {
    labelId: "services-list",
    heading: "Ce lansăm împreună",
    items: [
      ...specialtyItems,
      {
        title: "Platforme web",
        body: "Aplicații web rapide și stabile pentru vânzări, operațiuni și relația cu clienții.",
        category: "Web",
        icon: "website",
      },
      {
        title: "Aplicații mobile",
        body: "Experiențe iOS și Android cu journeys gândite pentru activare și retenție.",
        category: "Mobile",
        icon: "mobile",
      },
      {
        title: "Sisteme interne",
        body: "Tool-uri care reduc munca manuală, cresc viteza echipei și aduc vizibilitate în procese.",
        category: "Intern",
        icon: "systems",
      },
      {
        title: "Design orientat pe business",
        body: "Fiecare ecran mapat la un obiectiv clar: lead, conversie, retenție sau eficiență.",
        category: "Design",
        icon: "design",
      },
      {
        title: "Website-uri corporate",
        body: "Prezență digitală clară, cu mesaj puternic și structură gândită pentru conversie.",
        category: "Web",
        icon: "website",
      },
      {
        title: "Landing pages",
        body: "Pagini concentrate pe un obiectiv — lead, demo sau vânzare — optimizate pe funnel.",
        category: "Web",
        icon: "landing",
      },
      {
        title: "E-commerce",
        body: "Magazine online cu checkout fluid, catalog scalabil și integrări de plăți.",
        category: "Web",
        icon: "eshop",
      },
      {
        title: "SaaS",
        body: "Produse multi-tenant cu onboarding, billing și experiență gândită pentru retenție.",
        category: "Web",
        icon: "saas",
      },
      {
        title: "CRM",
        body: "Sisteme de relații cu clienții adaptate pe procesele tale, nu pe șabloane generice.",
        category: "Intern",
        icon: "crm",
      },
      {
        title: "Dashboard-uri",
        body: "Vizualizări executive cu KPI-uri acționabile și date din sursele reale ale business-ului.",
        category: "Intern",
        icon: "dashboard",
      },
      {
        title: "Portale B2B",
        body: "Spații securizate pentru parteneri, comenzi, documente și fluxuri de colaborare.",
        category: "Web",
        icon: "portal",
      },
      {
        title: "Panouri admin",
        body: "Back-office clar pentru conținut, utilizatori, roluri și operațiuni zilnice.",
        category: "Intern",
        icon: "admin",
      },
      {
        title: "Marketplace",
        body: "Piețe digitale cu listări, search, plăți și fluxuri pentru cumpărători și vânzători.",
        category: "Web",
        icon: "marketplace",
      },
      {
        title: "Aplicații iOS",
        body: "Produse native/hibrid pe Apple, aliniate la guidelines și performanță pe device.",
        category: "Mobile",
        icon: "ios",
      },
      {
        title: "Aplicații Android",
        body: "Aplicații stabile pe ecosistemul Android, cu tracking pe ecranele critice.",
        category: "Mobile",
        icon: "android",
      },
      {
        title: "Desktop (Electron)",
        body: "Aplicații desktop cross-platform pentru fluxuri care nu încape într-un browser.",
        category: "Intern",
        icon: "desktop",
      },
    ],
  },
};
