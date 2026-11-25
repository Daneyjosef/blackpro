import type { Home } from "@/lib/content";
import { Img } from "@/components/ui/Img";
import { Button } from "@/components/ui/Button";
import { HeroVideo } from "./HeroVideo";

export function Hero({ hero }: { hero: Home["hero"] }) {
  return (
    <section className="relative flex min-h-svh items-end overflow-hidden bg-onyx text-ivory" aria-label="Introduction">
      <div className="absolute inset-0 animate-ken-burns">
        <Img src={hero.poster} alt={hero.posterAlt} fill loading="eager" fetchPriority="high" className="object-cover" />
      </div>
      <HeroVideo mp4={hero.videoMp4} webm={hero.videoWebm} poster={hero.poster} />
      <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/55 to-onyx/30" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-36 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-28">
        <p className="eyebrow animate-fade-up text-ivory/75 [animation-delay:150ms]">{hero.eyebrow}</p>
        <h1 className="mt-6 max-w-4xl animate-rise text-5xl leading-[0.98] text-balance sm:text-7xl lg:text-8xl">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-ivory/80 [animation-delay:450ms] sm:text-lg">{hero.subtitle}</p>
        <div className="mt-10 grid animate-fade-up gap-3 [animation-delay:600ms] sm:flex sm:flex-wrap">
          <Button href="/shortlets/" variant="solid-light">Book a Stay</Button>
          <Button href="/interiors/#consultation" variant="outline-light">Design My Space</Button>
          <Button href="/furniture/" variant="outline-light">Shop Furniture</Button>
        </div>
      </div>

      <div aria-hidden="true" className="absolute right-8 bottom-10 hidden flex-col items-center gap-4 lg:flex">
        <span className="eyebrow text-[0.62rem] text-ivory/60 [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-16 w-px overflow-hidden bg-ivory/20">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-ivory" />
        </span>
      </div>
    </section>
  );
}
