import Link from "next/link";
import type { Project } from "@/lib/content";
import { ZoomImg } from "@/components/ui/Img";

type Props = { project: Project; sizes?: string; aspect?: string };

export function ProjectCard({ project: p, sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw", aspect = "aspect-[4/3]" }: Props) {
  return (
    <Link href={`/interiors/${p.slug}/`} className="group block">
      <div className={`relative overflow-hidden bg-stone ${aspect}`}>
        <ZoomImg src={p.cover.src} alt={p.cover.alt} sizes={sizes} />
      </div>
      <p className="eyebrow mt-5 text-mist">
        {p.category === "commercial" ? "Commercial" : "Residential"} · {p.location}
      </p>
      <h3 className="mt-2 text-2xl sm:text-3xl">{p.title}</h3>
    </Link>
  );
}
