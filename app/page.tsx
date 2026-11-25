import { getCategories, getHome, getProducts, getProject, getProjects, getShortlets, getSite } from "@/lib/content";
import { whatsappLink } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { FeaturedShortlets } from "@/components/sections/FeaturedShortlets";
import { PortfolioHighlights } from "@/components/sections/PortfolioHighlights";
import { FurnitureShowcase } from "@/components/sections/FurnitureShowcase";
import { WhyBlackPro } from "@/components/sections/WhyBlackPro";
import { Testimonials } from "@/components/sections/Testimonials";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = pageMetadata({ path: "/" });

export default function HomePage() {
  const site = getSite();
  const home = getHome();
  const showcase = getProject(home.portfolio.beforeAfterProject);
  if (!showcase) throw new Error(`content/home.json: portfolio.beforeAfterProject "${home.portfolio.beforeAfterProject}" not found in content/interiors`);

  const shortlets = getShortlets().filter((s) => s.featured);
  // Featured projects first, topped up with others so the row is always full
  const projects = getProjects()
    .filter((p) => p.slug !== showcase.slug)
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 3);
  const products = getProducts()
    .filter((p) => p.featured)
    .slice(0, 4);

  return (
    <>
      <Hero hero={home.hero} />
      <ServiceCards intro={home.intro} services={home.services} />
      <FeaturedShortlets copy={home.shortlets} shortlets={shortlets} />
      <PortfolioHighlights copy={home.portfolio} showcase={showcase} projects={projects} />
      <FurnitureShowcase copy={home.furniture} products={products} categories={getCategories()} />
      <WhyBlackPro why={home.why} />
      <Testimonials testimonials={home.testimonials} />
      <LogoStrip partners={home.partners} />
      <GalleryGrid images={home.gallery} socials={site.socials} />
      <CtaBand cta={home.cta} whatsappHref={whatsappLink(site.contact.whatsapp, `Hello ${site.name}, I'd like to make an enquiry.`)} />
    </>
  );
}
