// Contact form + site footer content — migrated from flowdotcom (Romanian).

export interface ContactContent {
  labelId: string;
  /** Bold intro prompt above the form. */
  heading: string;
  /** Placeholder / label text for each field. */
  fields: { name: string; phone: string; email: string };
  cta: string;
}

export const contactContent: ContactContent = {
  labelId: "contact-title",
  heading:
    "Hai să construim produsul tău. Spune-ne unde ești acum și unde vrei să ajungi.",
  fields: { name: "Nume Prenume", phone: "Telefon", email: "Email" },
  cta: "Trimite solicitarea",
};

export interface FooterLink {
  label: string;
  href: string;
  /** External links open in a new tab and get rel="noopener". */
  external?: boolean;
}

export interface FooterNavGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterContent {
  tagline: string;
  labelId: string;
  heading: string;
  cta: FooterLink;
  backToTop: FooterLink;
  linksLabel: string;
  sitemap: FooterNavGroup;
  /** Single contact block (phone / email / address) — not duplicated elsewhere. */
  contact: {
    title: string;
    address: string;
    phone: string;
    email: string;
  };
  copyright: string;
  credit: string;
}

export const footerContent: FooterContent = {
  tagline: "Construit pentru claritate, viteză și creștere.",
  labelId: "footer-title",
  heading: "De la brief la produs live — pe orice ecran.",
  cta: { label: "Vreau un proiect", href: "/colaborare" },
  backToTop: { label: "Înapoi sus", href: "#top" },
  linksLabel: "Linkuri",
  sitemap: {
    title: "Navigare",
    links: [
      { label: "Acasă", href: "/" },
      { label: "Servicii", href: "/servicii" },
      { label: "Colaborare", href: "/colaborare" },
    ],
  },
  contact: {
    title: "Contact",
    address: "România",
    phone: "0770571362",
    email: "dragosflow@yahoo.com",
  },
  copyright: "© 2026 flowdotcom. All rights reserved.",
  credit: "Product design and development",
};
