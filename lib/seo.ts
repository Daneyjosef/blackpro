import type { Metadata } from "next";
import { getSite } from "./content";
import { isPlaceholder } from "./format";

type PageMeta = { title?: string; description?: string; path: string; image?: string };

/** Per-page metadata with canonical URL and Open Graph/Twitter cards. */
export function pageMetadata({ title, description, path, image }: PageMeta): Metadata {
  const site = getSite();
  const desc = description ?? site.description;
  const images = [{ url: image ?? "/media/brand/og-default.jpg", width: 1200, height: 630 }];
  return {
    ...(title ? { title } : {}),
    description: desc,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: site.name, title: title ?? site.name, description: desc, url: path, images, locale: "en_NG" },
    twitter: { card: "summary_large_image", title: title ?? site.name, description: desc, images: images.map((i) => i.url) },
  };
}

/** LocalBusiness structured data, with placeholder contact fields left out. */
export function localBusinessJsonLd() {
  const site = getSite();
  const { contact } = site;
  const sameAs = Object.entries(site.socials)
    .filter(([k, v]) => k !== "instagramHandle" && v)
    .map(([, v]) => v);
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    logo: `${site.url}/media/brand/logo-black.png`,
    image: `${site.url}/media/brand/og-default.jpg`,
    ...(isPlaceholder(contact.phone) ? {} : { telephone: contact.phone }),
    ...(isPlaceholder(contact.email) ? {} : { email: contact.email }),
    address: {
      "@type": "PostalAddress",
      ...(isPlaceholder(contact.address) ? {} : { streetAddress: contact.address }),
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    areaServed: "Lagos, Nigeria",
    ...(sameAs.length ? { sameAs } : {}),
  };
}
