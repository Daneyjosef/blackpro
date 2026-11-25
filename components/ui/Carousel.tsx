"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Children, useCallback, useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "./icons";

type Props = {
  children: ReactNode;
  label: string;
  /** Tailwind width classes for each slide, e.g. "basis-[85%] md:basis-1/2" */
  slideClassName?: string;
  tone?: "light" | "dark";
  className?: string;
};

/** Swipeable, keyboard-accessible carousel with prev/next buttons. */
export function Carousel({ children, label, slideClassName = "basis-[85%] sm:basis-1/2 lg:basis-1/3", tone = "dark", className = "" }: Props) {
  const [viewportRef, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    const frame = requestAnimationFrame(update);
    embla.on("select", update).on("reInit", update);
    return () => {
      cancelAnimationFrame(frame);
      embla.off("select", update).off("reInit", update);
    };
  }, [embla, update]);

  const btn =
    tone === "light"
      ? "border-ivory/30 text-ivory hover:bg-ivory hover:text-onyx"
      : "border-onyx/25 text-onyx hover:bg-onyx hover:text-ivory";

  return (
    <div className={className} role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={viewportRef} className="overflow-hidden">
        <ul className="-ml-5 flex touch-pan-y sm:-ml-6">
          {Children.map(children, (child, i) => (
            <li className={`min-w-0 shrink-0 grow-0 pl-5 sm:pl-6 ${slideClassName}`} aria-roledescription="slide" aria-label={`${i + 1} of ${Children.count(children)}`}>
              {child}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 flex gap-2">
        <button type="button" onClick={() => embla?.scrollPrev()} disabled={!canPrev} aria-label="Previous" className={`flex h-12 w-12 items-center justify-center border transition-colors disabled:pointer-events-none disabled:opacity-30 ${btn}`}>
          <ChevronLeft />
        </button>
        <button type="button" onClick={() => embla?.scrollNext()} disabled={!canNext} aria-label="Next" className={`flex h-12 w-12 items-center justify-center border transition-colors disabled:pointer-events-none disabled:opacity-30 ${btn}`}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
