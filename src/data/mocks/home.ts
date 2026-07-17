// Homepage content for the home view — migrated from flowdotcom (Romanian).
// Kept out of components per the data rules — passed in as props.
// See obsidian/frontend/component-conventions.md (Data rules).
import type { HeroContent } from "@/views/hero";
import type { AboutContent } from "@/views/about";
import type { StatsContent } from "@/views/stats";
import type { ShowcaseContent } from "@/views/showcase";
import type { WorksContent } from "@/views/works";
import type { ChainContent } from "@/views/chain";
import type { SiteNavContent } from "@/views/site-nav";
import { navWithCta } from "@/data/mocks/nav";
import type { MarqueeItem } from "@/views/logo-marquee";

export interface HomeContent {
  /** Shared fixed site header (rendered once). */
  nav: SiteNavContent;
  hero: HeroContent;
  logos: {
    label: string;
    /** First marquee row — application / product types. */
    applications: MarqueeItem[];
    /** Second marquee row — technologies. */
    technologies: MarqueeItem[];
  };
  about: AboutContent & { labelId: string };
  stats: StatsContent;
  showcase: ShowcaseContent;
  works: WorksContent;
  chain: ChainContent;
}

const siteNav = navWithCta({
  label: "Vreau un proiect",
  href: "/colaborare",
});

export const homeContent: HomeContent = {
  nav: siteNav,
  hero: {
    titleLines: ["Design & Dezvoltare.", "Produs construit pentru business."],
    sectionLabel: "Hero",
    sceneLabel: "Animated plasma burst",
    cta: { label: "Vreau un proiect", href: "/colaborare" },
    secondaryCta: { label: "Sună acum", href: "tel:+40770571362" },
    insightTitle:
      "Acoperim end-to-end strategia de produs, designul experienței, dezvoltarea tehnică și optimizarea continuă post-lansare.",
    insightBody:
      "Concepem și dezvoltăm experiențe digitale premium, de la primul wireframe până la produsul live. Pentru companii care vor claritate, viteză și impact business măsurabil.",
    stats: [
      { value: "Web", label: "Platforme & site-uri" },
      { value: "App", label: "Aplicații mobile" },
      { value: "B2B", label: "Sisteme interne" },
    ],
  },
  logos: {
    label: "Ce construim & cu ce",
    applications: [
      { name: "CRM", icon: "crm" },
      { name: "Websites", icon: "website" },
      { name: "E-shops", icon: "eshop" },
      { name: "Landing Pages", icon: "landing" },
      { name: "Dashboards", icon: "dashboard" },
      { name: "Portale B2B", icon: "portal" },
      { name: "SaaS", icon: "saas" },
      { name: "Mobile Apps", icon: "mobile" },
      { name: "iOS Apps", icon: "ios" },
      { name: "Android Apps", icon: "android" },
    ],
    technologies: [
      { name: "PHP", icon: "php" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Laravel", icon: "laravel" },
      { name: "React", icon: "react" },
      { name: "React Native", icon: "react-native" },
      { name: "Elixir", icon: "elixir" },
      { name: "Node.js", icon: "node" },
      { name: "Astro", icon: "astro" },
      { name: "Livewire", icon: "livewire" },
      { name: "Postgres", icon: "postgres" },
      { name: "Firebase", icon: "firebase" },
    ],
  },
  about: {
    labelId: "about-title",
    eyebrow: "Capabilități",
    lead: "Tot ce ai nevoie pentru un",
    mutedLead: "produs modern",
  },
  stats: {
    label: "DE CE FLOWDOTCOM",
    brand: "flowdotcom",
    collab: {
      value: "End-to-end",
      desc: "Strategie, design și dezvoltare — de la primul wireframe până la produsul live.",
    },
    commitment: {
      eyebrow: "Colaborare",
      value: "Claritate",
      body: "Lucrăm ca o extensie a echipei tale — fără jargon inutil, fără surprize la final. Știi mereu ce se întâmplă, de ce se întâmplă și ce urmează.",
      quote:
        "Obiective clare, livrabile concrete și un ritm transparent la fiecare etapă — ca să poți decide rapid și să vezi progresul real, nu doar statusuri.",
      points: [
        "Check-in-uri scurte, pe subiecte concrete",
        "Priorități vizibile și scope ținut sub control",
        "Feedback aplicat înainte să crească costul schimbării",
      ],
    },
    data: {
      label: "Ce construim",
      value: "Web & App",
      desc: "Platforme web, aplicații mobile și sisteme interne gândite pentru business.",
    },
    reach: { label: "Tehnologii", value: "12+" },
  },
  chain: {
    heading: "Proces simplu, rezultate rapide",
    tagline:
      "Fiecare etapă are obiective clare, output-uri concrete și un ritm de lucru transparent, astfel încât să știi permanent unde este proiectul și ce urmează.",
    aside: "Launch + Growth",
  },
  showcase: {
    heading: "De la wireframe la produs live — proiecte livrate end-to-end.",
    items: [
      {
        prefix: "Web",
        name: "Platforme Web",
        image: "/assets/images/3rd/approach.png",
      },
      {
        prefix: "Mobile",
        name: "Aplicații Mobile",
        image: "/assets/images/3rd/technology.jpg",
      },
      {
        prefix: "Intern",
        name: "Sisteme Interne",
        image: "/assets/images/3rd/security.jpg",
      },
      {
        prefix: "Design",
        name: "Design orientat pe business",
        image: "/assets/images/3rd/team.jpg",
      },
    ],
  },
  works: {
    heading: "Selected Work",
    viewLabel: "Vezi proiectul",
    items: [
      {
        name: "The Ritual",
        year: "2026",
        image: "/assets/images/portfolio/the-ritual.png",
        href: "https://ritual-pi.vercel.app",
      },
      {
        name: "Briscan Media",
        year: "2026",
        image: "/assets/images/portfolio/briscan-media.png",
        href: "https://briscan-media-h2eokzc9r-dragosflows-projects.vercel.app",
      },
      {
        name: "RN Imobiliare",
        year: "2026",
        image: "/assets/images/portfolio/rn-imobiliare.png",
        href: "https://www.rnimobiliare.ro",
      },
      {
        name: "Vivodentis",
        year: "2026",
        image: "/assets/images/portfolio/vivodentis.png",
        href: "https://vivodentis-web.vercel.app/acasa",
      },
      {
        name: "Boost Coffee Shop",
        year: "2026",
        image: "/assets/images/portfolio/boost.png",
      },
    ],
  },
};
