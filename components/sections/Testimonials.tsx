"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import type { Home } from "@/lib/content";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";

type Props = { testimonials: Home["testimonials"] };

/** One testimonial at a time, auto-advancing until the visitor interacts. */
export function Testimonials({ testimonials }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => window.clearInterval(id);
  }, [paused, count]);

  const go = (dir: number) => {
    setPaused(true);
    setIndex((i) => (i + dir + count) % count);
  };
  const t = testimonials[index];

  return (
    <section className="bg-ivory py-24 sm:py-32" aria-label="Client testimonials">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="eyebrow text-mist">Kind words</p>
        <span aria-hidden="true" className="mt-8 block font-serif text-8xl leading-none text-onyx/15">&ldquo;</span>
        <div className="relative min-h-[16rem] sm:min-h-[13rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <m.figure
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="font-serif text-2xl leading-snug text-balance sm:text-4xl">{t.quote}</blockquote>
              <figcaption className="mt-8 text-sm">
                <span className="font-semibold tracking-wide">{t.name}</span>
                <span className="text-mist"> · {t.context}</span>
              </figcaption>
            </m.figure>
          </AnimatePresence>
        </div>
        {count > 1 && (
          <div className="mt-10 flex items-center justify-center gap-6">
            <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="flex h-12 w-12 items-center justify-center border border-onyx/25 transition-colors hover:bg-onyx hover:text-ivory">
              <ChevronLeft />
            </button>
            <span className="text-sm text-mist tabular-nums">
              {index + 1} / {count}
            </span>
            <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="flex h-12 w-12 items-center justify-center border border-onyx/25 transition-colors hover:bg-onyx hover:text-ivory">
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
