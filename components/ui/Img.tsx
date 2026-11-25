import ExportedImage from "next-image-export-optimizer";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof ExportedImage>, "src" | "alt"> & { src: string; alt: string };

/**
 * Responsive image. At build time every file in /public/media is resized
 * into WebP variants, and this picks the right one for the screen.
 */
export function Img({ sizes = "100vw", ...props }: Props) {
  return <ExportedImage sizes={sizes} {...props} />;
}

/** Image that fills its (relatively positioned) parent and zooms gently on hover of a `.group` ancestor. */
export function ZoomImg({ className = "", ...props }: Props) {
  return (
    <Img
      fill
      className={`object-cover transition-transform duration-[1.4s] ease-(--ease-luxe) group-hover:scale-[1.06] ${className}`}
      {...props}
    />
  );
}
