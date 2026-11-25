import type { Home, Project } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ArrowRight } from "@/components/ui/icons";

type Props = { copy: Home["portfolio"]; showcase: Project; projects: Project[] };

export function PortfolioHighlights({ copy, showcase, projects }: Props) {
  return (
    <section className="bg-ivory py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow={copy.eyebrow} title={copy.title} body={copy.body} />
            <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button href="/interiors/#consultation" variant="solid-dark">Request a Consultation</Button>
              <Button href="/projects/" variant="outline-dark">View Portfolio</Button>
            </Reveal>
          </div>
          {showcase.beforeAfter && (
            <Reveal className="lg:col-span-8" y={40}>
              <BeforeAfterSlider before={showcase.beforeAfter.before} after={showcase.beforeAfter.after} className="aspect-[4/3] sm:aspect-[16/10]" />
              <p className="mt-4 text-sm text-mist">
                {showcase.title}, {showcase.location}
              </p>
            </Reveal>
          )}
        </div>

        <ul className="mt-20 grid gap-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-10">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.1}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-14">
          <Button href="/interiors/" variant="link-dark">
            Explore interior design <ArrowRight width={18} height={18} />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
