import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);
export const ChevronLeft = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
);
export const ChevronRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);
export const MenuIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 8h18M3 16h18" />
  </svg>
);
export const CloseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);
export const BedIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 00-3-3h-7v5M7 11.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  </svg>
);
export const BathIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12h16v2a5 5 0 01-5 5H9a5 5 0 01-5-5v-2zM6 12V6a2 2 0 014 0M7 19l-1 2M17 19l1 2" />
  </svg>
);
export const GuestsIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 11a4 4 0 100-8 4 4 0 000 8zM2 21a7 7 0 0114 0M16 3.5a4 4 0 010 7.5M18 14a6 6 0 014 7" />
  </svg>
);
export const PinIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-6.1 7-12a7 7 0 10-14 0c0 5.9 7 12 7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
export const PhoneIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  </svg>
);
export const MailIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);
export const InstagramIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);
export const FacebookIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M15 3h-2.5A3.5 3.5 0 009 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 011-1H15V3z" />
  </svg>
);
export const LinkedinIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 014 0v4M12 10v7" />
  </svg>
);
export const TiktokIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 3v11.5a3.5 3.5 0 11-3.5-3.5M14 3c.5 2.5 2.5 4.5 5 4.5" />
  </svg>
);
export const WhatsAppIcon = (p: IconProps) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M19.05 4.91A9.82 9.82 0 0012.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28z" />
  </svg>
);
