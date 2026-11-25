import { getSite } from "@/lib/content";
import { whatsappLink } from "@/lib/format";
import { WhatsAppIcon } from "@/components/ui/icons";

export function WhatsAppFloat() {
  const site = getSite();
  const href = whatsappLink(site.contact.whatsapp, `Hello ${site.name}, I'd like to make an enquiry.`);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed right-4 bottom-4 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-ivory/25 bg-onyx text-ivory shadow-[0_10px_30px_-10px_rgb(0_0_0/0.6)] transition-transform duration-300 hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon width={26} height={26} />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap bg-onyx px-3 py-2 text-xs tracking-wide opacity-0 transition-opacity group-hover:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
    </a>
  );
}
