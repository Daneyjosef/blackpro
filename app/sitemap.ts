import type { MetadataRoute } from "next";
import { getProducts, getProjects, getShortlets, getSite } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = getSite();
  const lastModified = new Date();
  const pages = ["/", "/shortlets/", "/interiors/", "/furniture/", "/projects/", "/about/", "/contact/", "/privacy/"];
  const detail = [
    ...getShortlets().map((s) => `/shortlets/${s.slug}/`),
    ...getProjects().map((p) => `/interiors/${p.slug}/`),
    ...getProducts().map((p) => `/furniture/${p.slug}/`),
  ];
  return [
    ...pages.map((path) => ({ url: `${url}${path}`, lastModified, priority: path === "/" ? 1 : 0.8 })),
    ...detail.map((path) => ({ url: `${url}${path}`, lastModified, priority: 0.6 })),
  ];
}
