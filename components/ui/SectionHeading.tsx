import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  body?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
};

/** tone="dark" = dark text for light backgrounds; tone="light" = light text for dark backgrounds */
export function SectionHeading({ eyebrow, title, body, tone = "dark", align = "left", className = "", as: H = "h2" }: Props) {
  const muted = tone === "dark" ? "text-mist" : "text-ash";
  return (
    <Reveal className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow mb-5 ${muted}`}>{eyebrow}</p>}
      <H className="text-4xl text-balance sm:text-5xl lg:text-6xl">{title}</H>
      {body && <p className={`mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${muted} ${align === "center" ? "mx-auto" : ""}`}>{body}</p>}
    </Reveal>
  );
}
