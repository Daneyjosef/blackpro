import type { Home } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function WhyBlackPro({ why }: { why: Home["why"] }) {
  return (
    <section className="bg-onyx py-24 text-ivory sm:py-32">
      <Container>
        <SectionHeading tone="light" eyebrow={why.eyebrow} title={why.title} />

        <dl className="mt-16 grid grid-cols-2 border-t border-line-dark lg:grid-cols-4">
          {why.stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.1}
              className={`flex flex-col-reverse border-b border-line-dark py-8 pr-4 lg:border-b-0 lg:py-10 ${i % 2 === 1 ? "border-l pl-6" : ""} ${i > 0 ? "lg:border-l lg:pl-8" : ""}`}
            >
              <dt className="mt-3 text-sm leading-snug text-ash">{s.label}</dt>
              <dd className="font-serif text-5xl sm:text-6xl">{s.value}</dd>
            </Reveal>
          ))}
        </dl>

        <ul className="mt-20 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {why.points.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.1}>
              <div className="sheen-line w-12 opacity-80" />
              <h3 className="mt-6 text-2xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
