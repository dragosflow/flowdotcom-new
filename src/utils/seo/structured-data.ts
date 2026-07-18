/**
 * @fileoverview JSON-LD structured data helpers (SEO + AIO).
 *
 * Structured data lets search engines and answer engines understand the site as
 * entities (Organization, WebSite, Service, WebPage) rather than just text.
 * Render inside `<script type="application/ld+json">`. No microdata / RDFa.
 */

import { siteConfig } from "@/lib/site";
import { servicesContent } from "@/data/mocks/services";
import { footerContent } from "@/data/mocks/contact";

const orgId = () => `${siteConfig.url}/#organization`;
const siteId = () => `${siteConfig.url}/#website`;

export interface WebPageJsonLdInput {
  /** Canonical path, e.g. `/servicii`. */
  path: string;
  title: string;
  description: string;
}

export interface BreadcrumbItem {
  name: string;
  /** Absolute URL or path under the site origin. */
  path: string;
}

const abs = (path: string) =>
  path.startsWith("http") ? path : `${siteConfig.url}${path === "/" ? "" : path}`;

/**
 * Organization + WebSite + service ItemList for the site root.
 * Emit once in the root layout. Nodes are linked by `@id`.
 */
export function getSiteStructuredData() {
  const logoUrl = `${siteConfig.url}/android-icon-192x192.png`;
  const services = servicesContent.list.items;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId(),
        name: siteConfig.legalName,
        legalName: siteConfig.legalName,
        alternateName: [siteConfig.name, "flowdotcom"],
        description: siteConfig.description,
        slogan: siteConfig.tagline,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
          width: 192,
          height: 192,
        },
        image: logoUrl,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.telephone,
        address: {
          "@type": "PostalAddress",
          addressCountry: footerContent.contact.address,
        },
        areaServed: {
          "@type": "Country",
          name: "Romania",
        },
        knowsAbout: [...siteConfig.knowsAbout],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: siteConfig.contact.email,
            telephone: siteConfig.contact.telephone,
            areaServed: siteConfig.contact.areaServed,
            availableLanguage: [...siteConfig.contact.availableLanguage],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": siteId(),
        name: siteConfig.name,
        alternateName: siteConfig.legalName,
        description: siteConfig.description,
        url: siteConfig.url,
        inLanguage: siteConfig.language,
        publisher: { "@id": orgId() },
        copyrightHolder: { "@id": orgId() },
        about: { "@id": orgId() },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#professional-service`,
        name: `${siteConfig.name} — design & dezvoltare produs digital`,
        description: siteConfig.description,
        url: `${siteConfig.url}/servicii`,
        provider: { "@id": orgId() },
        areaServed: siteConfig.contact.areaServed,
        serviceType: [...siteConfig.knowsAbout],
      },
      {
        "@type": "ItemList",
        "@id": `${siteConfig.url}/#service-list`,
        name: "Servicii flowdotcom",
        description:
          "Servicii de produs digital: web, mobile, sisteme interne, design, animații și experiențe 3D / WebGL.",
        numberOfItems: services.length,
        itemListElement: services.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            "@id": `${siteConfig.url}/servicii#${encodeURIComponent(item.title)}`,
            name: item.title,
            description: item.body,
            provider: { "@id": orgId() },
            areaServed: siteConfig.contact.areaServed,
            category: item.category,
            url: `${siteConfig.url}/servicii`,
          },
        })),
      },
    ],
  };
}

/** WebPage node for a specific route — emit on that page. */
export function getWebPageStructuredData({
  path,
  title,
  description,
}: WebPageJsonLdInput) {
  const pageUrl = abs(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": siteId() },
    about: { "@id": orgId() },
    publisher: { "@id": orgId() },
  };
}

/** BreadcrumbList for interior pages. */
export function getBreadcrumbStructuredData(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

/** Serialize for `<script type="application/ld+json">`. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data);
}
