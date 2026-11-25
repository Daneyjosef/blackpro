import Link from "next/link";
import type { Category, Home, Product } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { ProductCard } from "@/components/cards/ProductCard";

type Props = { copy: Home["furniture"]; products: Product[]; categories: Category[] };

export function FurnitureShowcase({ copy, products, categories }: Props) {
  const categoryName = Object.fromEntries(categories.map((c) => [c.slug, c.name]));
  return (
    <section className="bg-stone py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} body={copy.body} />
          <Reveal className="shrink-0">
            <Button href="/furniture/" variant="outline-dark">Browse the catalogue</Button>
          </Reveal>
        </div>

        <Reveal>
          <ul className="mt-12 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]" aria-label="Furniture categories">
            {categories.map((c) => (
              <li key={c.slug} className="shrink-0">
                <Link
                  href={`/furniture/?category=${c.slug}`}
                  className="inline-flex min-h-11 items-center border border-onyx/20 px-5 text-[0.7rem] font-semibold tracking-[0.2em] whitespace-nowrap uppercase transition-colors hover:border-onyx hover:bg-onyx hover:text-ivory"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 4) * 0.08}>
              <ProductCard product={p} categoryName={categoryName[p.category]} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-24" y={40}>
          <div id="fit-outs" className="group relative grid overflow-hidden bg-onyx text-ivory lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[480px]">
              <Img src={copy.fitOut.image} alt={copy.fitOut.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-(--ease-luxe) group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <p className="eyebrow text-ash">Office furnishing</p>
              <h3 className="mt-5 text-4xl text-balance sm:text-5xl">{copy.fitOut.title}</h3>
              <p className="mt-5 leading-relaxed text-ash">{copy.fitOut.body}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="/furniture/#quote" variant="solid-light">Request a Quote</Button>
                <Button href="/furniture/#fit-outs" variant="outline-light">See fit-outs</Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
