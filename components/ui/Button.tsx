import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid-light" | "solid-dark" | "outline-light" | "outline-dark" | "link-light" | "link-dark";

const styles: Record<Variant, string> = {
  "solid-light": "bg-ivory text-onyx hover:bg-white",
  "solid-dark": "bg-onyx text-ivory hover:bg-graphite",
  "outline-light": "border border-ivory/50 text-ivory hover:border-ivory hover:bg-ivory hover:text-onyx",
  "outline-dark": "border border-onyx/40 text-onyx hover:border-onyx hover:bg-onyx hover:text-ivory",
  "link-light": "text-ivory px-0! py-0! underline-offset-8 hover:underline",
  "link-dark": "text-onyx px-0! py-0! underline-offset-8 hover:underline",
};

type Props = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export function Button({ href, variant = "solid-dark", children, className = "", external }: Props) {
  const cls = `group inline-flex min-h-12 items-center justify-center gap-3 px-7 py-3.5 text-center text-[0.72rem] font-semibold uppercase tracking-[0.24em] transition-colors duration-300 ${styles[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
