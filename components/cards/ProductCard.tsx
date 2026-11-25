import Link from "next/link";
import type { Product } from "@/lib/content";
import { formatNaira } from "@/lib/format";
import { ZoomImg } from "@/components/ui/Img";

type Props = { product: Product; categoryName?: string; sizes?: string };

export function ProductCard({ product: p, categoryName, sizes = "(min-width: 1024px) 25vw, 50vw" }: Props) {
  return (
    <Link href={`/furniture/${p.slug}/`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-ivory">
        <ZoomImg src={p.image.src} alt={p.image.alt} sizes={sizes} />
      </div>
      {categoryName && <p className="eyebrow mt-4 text-[0.62rem] text-mist">{categoryName}</p>}
      <h3 className="mt-1.5 text-xl leading-tight sm:text-2xl">{p.name}</h3>
      <p className="mt-1.5 text-sm text-mist">{p.priceFrom ? `From ${formatNaira(p.priceFrom)}` : "Price on request"}</p>
    </Link>
  );
}
