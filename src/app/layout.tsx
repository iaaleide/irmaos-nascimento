import type { Metadata } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { business } from "@/lib/business";
import "./globals.css";

const heading = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${business.name} | ${business.slogan}`,
    template: `%s | ${business.name}`,
  },
  description: `${business.slogan} ${business.tagline} Loja no Parque dos Estados, Bragança Paulista, e matriz em Atibaia.`,
  openGraph: {
    title: `${business.name} — ${business.slogan}`,
    description: business.tagline,
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${heading.variable} ${sans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
