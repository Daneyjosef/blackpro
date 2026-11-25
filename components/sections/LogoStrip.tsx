import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Client/partner logos. Until real logo files are supplied, each entry in
 * content/home.json "partners" renders as a text placeholder.
 */
export function LogoStrip({ partners }: { partners: string[] }) {
  if (partners.length === 0) return null;
  return (
    <section className="border-y border-line-light bg-ivory py-14" aria-label="Clients and partners">
      <Container>
        <Reveal>
          <p className="eyebrow text-center text-mist">Trusted by homeowners, hosts and businesses</p>
          <ul className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {partners.map((name, i) => (
              <li key={i} className="flex h-12 items-center justify-center border border-dashed border-onyx/20 text-[0.7rem] tracking-[0.2em] text-mist uppercase">
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
