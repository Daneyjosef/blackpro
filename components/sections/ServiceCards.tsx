import Link from "next/link";
import type { Home } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ZoomImg } from "@/components/ui/Img";
import { ArrowRight } from "@/components/ui/icons";

export function ServiceCards({ intro, services }: { intro: Home["intro"]; services: Home["services"] }) {
  return (
    <section className="bg-ivory py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={intro.eyebrow} title={intro.title} body={intro.body} />
        <ul className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
          {services.map((s, i) => (
            <Reveal as="li" key={s.href} delay={i * 0.12}>
              <Link href={s.href} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-stone md:aspect-[4/5]">
                  <ZoomImg src={s.image} alt={s.alt} sizes="(min-width: 768px) 33vw, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx/70 via-transparent to-transparent" />
                  <span className="absolute top-5 left-5 font-serif text-xl text-ivory/90">{s.number}</span>
                </div>
                <h3 className="mt-6 text-3xl">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{s.body}</p>
                <span className="eyebrow mt-5 inline-flex items-center gap-3 text-onyx">
                  {s.cta}
                  <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1.5" width={18} height={18} />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
