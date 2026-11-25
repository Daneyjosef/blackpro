"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance in px the element travels up while fading in */
  y?: number;
  as?: "div" | "li" | "article";
};

/** Fades and slides content in once, the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
