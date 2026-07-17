// Product explainer section content — migrated from flowdotcom (Romanian).
export interface ProductContent {
  labelId: string;
  heading: string;
  cta: { label: string; href: string };
  description: string;
  cards: {
    grow: { title: string; body: string };
    liquid: { title: string; body: string };
    hands: { title: string; body: string };
  };
}

export const productContent: ProductContent = {
  labelId: "product-title",
  heading: "Tot ce ai nevoie pentru un produs modern",
  cta: { label: "Vreau un proiect", href: "/colaborare" },
  description:
    "Acoperim end-to-end strategia de produs, designul experienței, dezvoltarea tehnică și optimizarea continuă post-lansare.",
  cards: {
    grow: {
      title: "Discovery",
      body: "Înțelegem business-ul, publicul și obiectivele reale. Mapăm prioritățile și livrăm un plan clar înainte de design sau cod.",
    },
    liquid: {
      title: "UX + Arhitectură",
      body: "Definim fluxurile, design system-ul și structura tehnică. Vezi din timp cum arată produsul și pe ce se sprijină.",
    },
    hands: {
      title: "Dezvoltare & lansare",
      body: "Construim pe etape vizibile, cu feedback aplicat continuu — până la go-live, handover și optimizări după lansare.",
    },
  },
};
