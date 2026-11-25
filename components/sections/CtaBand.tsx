import type { Home } from "@/lib/content";
import { Img } from "@/components/ui/Img";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/icons";

export function CtaBand({ cta, whatsappHref }: { cta: Home["cta"]; whatsappHref: string }) {
  return (
    <section className="relative overflow-hidden bg-onyx text-ivory">
      <Img src={cta.image} alt={cta.alt} fill sizes="100vw" className="object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-r from-onyx via-onyx/70 to-onyx/20" />
      <div className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36 lg:px-12">
        <Reveal className="max-w-2xl">
          <h2 className="text-5xl text-balance sm:text-7xl">{cta.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-ivory/80">{cta.body}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact/" variant="solid-light">Get in Touch</Button>
            <Button href={whatsappHref} variant="outline-light" external>
              <WhatsAppIcon width={18} height={18} /> WhatsApp Us
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
