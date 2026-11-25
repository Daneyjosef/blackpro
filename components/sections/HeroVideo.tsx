"use client";

import { useEffect, useState } from "react";

type Props = { mp4?: string; webm?: string; poster: string };

/**
 * Background video for the hero. It is only attached after the page has
 * loaded, and never for visitors who prefer reduced motion or have Data
 * Saver on, so it doesn't compete with the poster image for bandwidth.
 */
export function HeroVideo({ mp4, webm, poster }: Props) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!mp4 && !webm) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;
    const start = () => setEnabled(true);
    if (document.readyState === "complete") {
      const id = window.setTimeout(start, 300);
      return () => window.clearTimeout(id);
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [mp4, webm]);

  if (!enabled) return null;

  return (
    <video
      className="absolute inset-0 h-full w-full animate-fade-in object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden="true"
    >
      {webm && <source src={webm} type="video/webm" />}
      {mp4 && <source src={mp4} type="video/mp4" />}
    </video>
  );
}
