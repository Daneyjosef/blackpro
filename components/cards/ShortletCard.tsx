import Link from "next/link";
import type { Shortlet } from "@/lib/content";
import { formatNaira } from "@/lib/format";
import { ZoomImg } from "@/components/ui/Img";
import { BathIcon, BedIcon, GuestsIcon } from "@/components/ui/icons";

type Props = { shortlet: Shortlet; tone?: "light" | "dark"; sizes?: string };

export function ShortletCard({ shortlet: s, tone = "dark", sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw" }: Props) {
  const muted = tone === "light" ? "text-ash" : "text-mist";
  const rule = tone === "light" ? "border-line-dark" : "border-line-light";
  return (
    <Link href={`/shortlets/${s.slug}/`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
        <ZoomImg src={s.images[0].src} alt={s.images[0].alt} sizes={sizes} />
        <span className="absolute top-4 left-4 bg-onyx/80 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.2em] text-ivory uppercase backdrop-blur-sm">
          {s.location}
        </span>
      </div>
      <h3 className="mt-5 text-2xl sm:text-3xl">{s.name}</h3>
      <ul className={`mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm ${muted}`}>
        <li className="flex items-center gap-2"><BedIcon width={16} height={16} />{s.bedrooms} bed{s.bedrooms > 1 ? "s" : ""}</li>
        <li className="flex items-center gap-2"><BathIcon width={16} height={16} />{s.bathrooms} bath{s.bathrooms > 1 ? "s" : ""}</li>
        <li className="flex items-center gap-2"><GuestsIcon width={16} height={16} />{s.guests} guests</li>
      </ul>
      <p className={`mt-4 border-t pt-4 text-sm ${rule} ${muted}`}>
        From <span className={`font-serif text-xl ${tone === "light" ? "text-ivory" : "text-onyx"}`}>{formatNaira(s.pricePerNight)}</span> / night
      </p>
    </Link>
  );
}
