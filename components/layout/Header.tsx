"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/lib/nav";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock page scroll and close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname.startsWith(href);
  // No backdrop-filter while the menu is open: it would make the fixed menu
  // panel position itself relative to the header instead of the viewport.
  const background = open
    ? "border-line-dark bg-onyx"
    : scrolled
      ? "border-line-dark bg-onyx/90 backdrop-blur-md"
      : "border-transparent bg-gradient-to-b from-onyx/60 to-transparent";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b text-ivory transition-[background-color,border-color] duration-500 ${background}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ivory focus:px-4 focus:py-2 focus:text-onyx">
        Skip to content
      </a>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-[height] duration-500 sm:px-8 lg:px-12 ${scrolled ? "h-16" : "h-20 lg:h-24"}`}>
        <Link href="/" aria-label="BlackPro Homes, home" className="flex items-center gap-3">
          <Logo className={`w-auto transition-[height] duration-500 ${scrolled ? "h-10" : "h-12 lg:h-14"}`} />
          <span className="hidden font-serif text-lg tracking-[0.18em] uppercase sm:inline">BlackPro Homes</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="relative py-2 text-[0.72rem] font-semibold tracking-[0.22em] uppercase text-ivory/80 transition-colors hover:text-ivory after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-ivory after:transition-transform after:duration-500 hover:after:scale-x-100 aria-[current=page]:text-ivory aria-[current=page]:after:scale-x-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/shortlets/"
            className="hidden min-h-11 items-center border border-ivory/40 px-5 text-[0.7rem] font-semibold tracking-[0.22em] uppercase transition-colors hover:bg-ivory hover:text-onyx md:inline-flex"
          >
            Book a Stay
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon width={26} height={26} /> : <MenuIcon width={26} height={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="fixed inset-0 -z-10 overflow-y-auto bg-onyx px-5 pt-28 pb-12 sm:px-8 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col">
              {mainNav.map((item, i) => (
                <m.li
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-line-dark"
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="block py-5 font-serif text-4xl text-ivory/85 aria-[current=page]:text-ivory"
                  >
                    {item.label}
                  </Link>
                </m.li>
              ))}
            </ul>
            <Link href="/shortlets/" className="mt-10 flex min-h-12 items-center justify-center bg-ivory text-[0.72rem] font-semibold tracking-[0.24em] text-onyx uppercase">
              Book a Stay
            </Link>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
