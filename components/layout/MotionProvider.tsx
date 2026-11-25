"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/** Loads only the animation features the site uses, keeping the JS bundle small. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
