/* eslint-disable @next/next/no-img-element -- small PNG logo; no resizing needed */

/** The BH monogram. "light" for dark backgrounds, "dark" for light backgrounds. */
export function Logo({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <img
      src={tone === "light" ? "/media/brand/logo-white.png" : "/media/brand/logo-black.png"}
      alt=""
      width={210}
      height={200}
      className={className}
    />
  );
}
