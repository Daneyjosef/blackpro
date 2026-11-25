import Link from "next/link";
import { getSite } from "@/lib/content";
import { isPlaceholder } from "@/lib/format";
import { mainNav } from "@/lib/nav";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, LinkedinIcon, MailIcon, PhoneIcon, PinIcon, TiktokIcon } from "@/components/ui/icons";
import { Logo } from "./Logo";

export function Footer() {
  const site = getSite();
  const { contact, socials } = site;
  const socialLinks = [
    { href: socials.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: socials.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: socials.tiktok, label: "TikTok", Icon: TiktokIcon },
    { href: socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  ].filter((s) => s.href);

  return (
    <footer className="bg-onyx text-ivory">
      <Container className="pt-20 pb-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="h-24 w-auto" />
            <p className="mt-6 max-w-sm font-serif text-2xl leading-snug text-ivory/90">{site.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ash">{site.description}</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="eyebrow mb-6 font-sans text-ash">Explore</h2>
              <ul className="space-y-3 text-sm">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-ivory/80 transition-colors hover:text-ivory">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow mb-6 font-sans text-ash">Services</h2>
              <ul className="space-y-3 text-sm">
                <li><Link href="/shortlets/" className="text-ivory/80 hover:text-ivory">Book a stay</Link></li>
                <li><Link href="/interiors/#consultation" className="text-ivory/80 hover:text-ivory">Request a consultation</Link></li>
                <li><Link href="/furniture/#quote" className="text-ivory/80 hover:text-ivory">Request a quote</Link></li>
                <li><Link href="/furniture/#fit-outs" className="text-ivory/80 hover:text-ivory">Office fit-outs</Link></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="eyebrow mb-6 font-sans text-ash">Contact</h2>
              <ul className="space-y-4 text-sm text-ivory/80">
                <li className="flex gap-3">
                  <PhoneIcon className="mt-0.5 shrink-0 text-ash" width={16} height={16} />
                  {contact.phoneHref ? <a href={`tel:${contact.phoneHref}`} className="hover:text-ivory">{contact.phone}</a> : <span>{contact.phone}</span>}
                </li>
                <li className="flex gap-3">
                  <MailIcon className="mt-0.5 shrink-0 text-ash" width={16} height={16} />
                  {isPlaceholder(contact.email) ? <span>{contact.email}</span> : <a href={`mailto:${contact.email}`} className="break-all hover:text-ivory">{contact.email}</a>}
                </li>
                <li className="flex gap-3">
                  <PinIcon className="mt-0.5 shrink-0 text-ash" width={16} height={16} />
                  <span>{contact.address}</span>
                </li>
              </ul>
              {socialLinks.length > 0 && (
                <ul className="mt-6 flex gap-2">
                  {socialLinks.map(({ href, label, Icon }) => (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-11 w-11 items-center justify-center border border-line-dark transition-colors hover:bg-ivory hover:text-onyx">
                        <Icon />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </nav>
        </div>

        <div className="sheen-line mt-16 opacity-40" />
        <div className="mt-8 flex flex-col gap-4 text-xs text-ash sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <Link href="/privacy/" className="hover:text-ivory">Privacy policy</Link>
        </div>
      </Container>
    </footer>
  );
}
