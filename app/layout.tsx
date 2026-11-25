import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { getSite } from "@/lib/content";
import { localBusinessJsonLd, pageMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Analytics } from "@/components/layout/Analytics";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  // Headings only use the regular weight; each extra weight/style is another font download
  weight: "400",
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const site = getSite();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Short-lets, Interior Design & Furniture in Lagos`, template: `%s | ${site.name}` },
  applicationName: site.name,
  ...pageMetadata({ path: "/" }),
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NG" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="flex min-h-svh flex-col">
        <MotionProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
        </MotionProvider>
        <JsonLd data={localBusinessJsonLd()} />
        <Analytics measurementId={site.analytics.gaMeasurementId} />
      </body>
    </html>
  );
}
