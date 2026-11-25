import type { Home, Shortlet } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Carousel } from "@/components/ui/Carousel";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ShortletCard } from "@/components/cards/ShortletCard";
import { ArrowRight } from "@/components/ui/icons";

export function FeaturedShortlets({ copy, shortlets }: { copy: Home["shortlets"]; shortlets: Shortlet[] }) {
  return (
    <section className="overflow-hidden bg-onyx py-24 text-ivory sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading tone="light" eyebrow={copy.eyebrow} title={copy.title} body={copy.body} />
          <Reveal className="shrink-0">
            <Button href="/shortlets/" variant="link-light">
              View all apartments <ArrowRight width={18} height={18} />
            </Button>
          </Reveal>
        </div>
        <Reveal className="mt-14" y={40}>
          <Carousel label="Featured apartments" tone="light">
            {shortlets.map((s) => (
              <ShortletCard key={s.slug} shortlet={s} tone="light" />
            ))}
          </Carousel>
        </Reveal>
      </Container>
    </section>
  );
}
