"use client";

import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { ContentImage } from "@/lib/content";
import { Img } from "./Img";

type Props = { before: ContentImage; after: ContentImage; className?: string; sizes?: string };

/** Drag (mouse or touch) or use arrow keys to compare a before and after image. */
export function BeforeAfterSlider({ before, after, className = "", sizes = "(min-width: 1024px) 60vw, 100vw" }: Props) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = useCallback((clientX: number) => {
    const rect = box.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onPointerDown = (e: PointerEvent) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  };
  const onPointerMove = (e: PointerEvent) => dragging.current && moveTo(e.clientX);
  const onPointerUp = () => (dragging.current = false);

  const onKeyDown = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    const next = { ArrowLeft: pos - step, ArrowRight: pos + step, Home: 0, End: 100 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setPos(Math.min(100, Math.max(0, next)));
  };

  return (
    <div
      ref={box}
      className={`relative cursor-ew-resize touch-pan-y overflow-hidden select-none ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <Img src={after.src} alt={after.alt} fill sizes={sizes} className="object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Img src={before.src} alt={before.alt} fill sizes={sizes} className="object-cover" draggable={false} />
      </div>

      <span className="eyebrow pointer-events-none absolute top-4 left-4 bg-onyx/75 px-3 py-1.5 text-[0.62rem] text-ivory">Before</span>
      <span className="eyebrow pointer-events-none absolute top-4 right-4 bg-ivory/85 px-3 py-1.5 text-[0.62rem] text-onyx">After</span>

      <div className="pointer-events-none absolute inset-y-0 w-px bg-ivory" style={{ left: `${pos}%` }}>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Before and after comparison"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% before image shown`}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory bg-onyx/70 text-ivory backdrop-blur-sm"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
