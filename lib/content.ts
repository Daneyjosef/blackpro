/**
 * Content loaders. Everything the site shows comes from JSON files in /content.
 * Each file is validated at build time, so a typo or missing field fails the
 * build with a readable message instead of silently breaking a page.
 */
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

const CONTENT_DIR = path.join(process.cwd(), "content");

const image = z.object({ src: z.string().startsWith("/media/"), alt: z.string().min(1) });
export type ContentImage = z.infer<typeof image>;

const siteSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  tagline: z.string(),
  description: z.string(),
  url: z.url(),
  contact: z.object({
    phone: z.string(),
    phoneHref: z.string(),
    whatsapp: z.string(),
    whatsappDisplay: z.string(),
    email: z.string(),
    address: z.string(),
    mapQuery: z.string(),
  }),
  hours: z.array(z.object({ days: z.string(), time: z.string() })),
  socials: z.object({
    instagram: z.string(),
    instagramHandle: z.string(),
    facebook: z.string(),
    tiktok: z.string(),
    linkedin: z.string(),
  }),
  analytics: z.object({ gaMeasurementId: z.string() }),
});
export type Site = z.infer<typeof siteSchema>;

const homeSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    subtitle: z.string(),
    poster: z.string(),
    posterAlt: z.string(),
    videoMp4: z.string(),
    videoWebm: z.string(),
  }),
  intro: z.object({ eyebrow: z.string(), title: z.string(), body: z.string() }),
  services: z.array(
    z.object({
      number: z.string(),
      title: z.string(),
      body: z.string(),
      image: z.string(),
      alt: z.string(),
      href: z.string(),
      cta: z.string(),
    }),
  ),
  shortlets: z.object({ eyebrow: z.string(), title: z.string(), body: z.string() }),
  portfolio: z.object({
    eyebrow: z.string(),
    title: z.string(),
    body: z.string(),
    beforeAfterProject: z.string(),
  }),
  furniture: z.object({
    eyebrow: z.string(),
    title: z.string(),
    body: z.string(),
    fitOut: z.object({ title: z.string(), body: z.string(), image: z.string(), alt: z.string() }),
  }),
  why: z.object({
    eyebrow: z.string(),
    title: z.string(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })),
    points: z.array(z.object({ title: z.string(), body: z.string() })),
  }),
  testimonials: z.array(z.object({ quote: z.string(), name: z.string(), context: z.string() })),
  partners: z.array(z.string()),
  gallery: z.array(image),
  cta: z.object({ title: z.string(), body: z.string(), image: z.string(), alt: z.string() }),
});
export type Home = z.infer<typeof homeSchema>;

const shortletSchema = z.object({
  sample: z.boolean().default(false),
  slug: z.string(),
  name: z.string(),
  location: z.string(),
  summary: z.string(),
  description: z.string(),
  bedrooms: z.number().int().positive(),
  bathrooms: z.number().int().positive(),
  guests: z.number().int().positive(),
  pricePerNight: z.number().positive(),
  featured: z.boolean().default(false),
  images: z.array(image).min(1),
  amenities: z.array(z.string()),
  houseRules: z.array(z.string()),
  mapQuery: z.string(),
});
export type Shortlet = z.infer<typeof shortletSchema>;

export const PROJECT_CATEGORIES = ["residential", "commercial"] as const;
const projectSchema = z.object({
  sample: z.boolean().default(false),
  slug: z.string(),
  title: z.string(),
  category: z.enum(PROJECT_CATEGORIES),
  location: z.string(),
  year: z.string(),
  summary: z.string(),
  description: z.string(),
  scope: z.array(z.string()),
  featured: z.boolean().default(false),
  cover: image,
  beforeAfter: z.object({ before: image, after: image }).optional(),
  images: z.array(image),
});
export type Project = z.infer<typeof projectSchema>;

const categorySchema = z.object({ slug: z.string(), name: z.string(), description: z.string() });
export type Category = z.infer<typeof categorySchema>;

const productSchema = z.object({
  sample: z.boolean().default(false),
  slug: z.string(),
  name: z.string(),
  category: z.string(),
  summary: z.string(),
  description: z.string(),
  image,
  images: z.array(image).default([]),
  materials: z.array(z.string()),
  dimensions: z.string(),
  leadTime: z.string(),
  priceFrom: z.number().positive().nullable(),
  featured: z.boolean().default(false),
});
export type Product = z.infer<typeof productSchema>;

const fitOutSchema = z.object({
  sample: z.boolean().default(false),
  title: z.string(),
  summary: z.string(),
  image,
});
export type FitOut = z.infer<typeof fitOutSchema>;

function readJson<T>(file: string, schema: z.ZodType<T>): T {
  const full = path.join(CONTENT_DIR, file);
  const result = schema.safeParse(JSON.parse(fs.readFileSync(full, "utf8")));
  if (!result.success) {
    throw new Error(`Invalid content in content/${file}:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

function readFolder<T extends { slug: string }>(folder: string, schema: z.ZodType<T>): T[] {
  const dir = path.join(CONTENT_DIR, folder);
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => {
      const item = readJson(path.join(folder, f), schema);
      if (`${item.slug}.json` !== f) {
        throw new Error(`content/${folder}/${f}: "slug" must match the file name (expected "${f.replace(/\.json$/, "")}")`);
      }
      return item;
    });
}

export const getSite = () => readJson("site.json", siteSchema);
export const getHome = () => readJson("home.json", homeSchema);

export const getShortlets = () => readFolder("shortlets", shortletSchema);
export const getShortlet = (slug: string) => getShortlets().find((s) => s.slug === slug);

export const getProjects = () => readFolder("interiors", projectSchema);
export const getProject = (slug: string) => getProjects().find((p) => p.slug === slug);

export const getCategories = () => readJson("furniture/categories.json", z.array(categorySchema));
export const getFitOuts = () => readJson("furniture/fit-outs.json", z.array(fitOutSchema));
export function getProducts() {
  const categories = new Set(getCategories().map((c) => c.slug));
  const products = readFolder("furniture/products", productSchema);
  for (const p of products) {
    if (!categories.has(p.category)) {
      throw new Error(`content/furniture/products/${p.slug}.json: unknown category "${p.category}". Add it to content/furniture/categories.json first.`);
    }
  }
  return products;
}
export const getProduct = (slug: string) => getProducts().find((p) => p.slug === slug);
