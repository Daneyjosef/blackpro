import type { ContentImage, Site } from "@/lib/content";
import { isPlaceholder } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ZoomImg } from "@/components/ui/Img";
import { InstagramIcon } from "@/components/ui/icons";

export function GalleryGrid({ images, socials }: { images: ContentImage[]; socials: Site["socials"] }) {
  const handle = socials.instagramHandle;
  const link = socials.instagram;
  return (
    <section className="bg-onyx py-24 text-ivory sm:py-32">
      <Container>
        <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-ash">Follow along</p>
            <h2 className="mt-5 text-4xl sm:text-5xl">{isPlaceholder(handle) ? handle : `@${handle.replace(/^@/, "")}`}</h2>
          </div>
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="eyebrow inline-flex min-h-11 items-center gap-3 border border-ivory/40 px-5 transition-colors hover:bg-ivory hover:text-onyx">
              <InstagramIcon width={18} height={18} /> Follow on Instagram
            </a>
          )}
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {images.map((img, i) => (
            <Reveal as="li" key={img.src} delay={(i % 3) * 0.08} className="group relative aspect-square overflow-hidden bg-graphite">
              <ZoomImg src={img.src} alt={img.alt} sizes="(min-width: 640px) 33vw, 50vw" />
              <div className="absolute inset-0 bg-onyx/0 transition-colors duration-500 group-hover:bg-onyx/30" />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
