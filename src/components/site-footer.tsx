import Link from "next/link";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { business, storeAddress } from "@/lib/business";
import { links } from "@/lib/whatsapp";

export function SiteFooter() {
  const braganca = business.stores.braganca;
  const atibaia = business.stores.atibaia;

  return (
    <footer className="mt-auto border-t-4 border-signal bg-navy text-slate-100">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-heading text-2xl tracking-wide uppercase">
            {business.name}
          </p>
          <p className="mt-3 max-w-md font-medium text-signal">
            {business.slogan}
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
            Casa de material de construção em Bragança Paulista, com matriz em
            Atibaia. Orçamento, compra e rota saem direto no WhatsApp.
          </p>
          <WhatsAppLink href={links.general} className="mt-6">
            Falar no WhatsApp
          </WhatsAppLink>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-signal uppercase">
            Loja em Bragança
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {storeAddress(braganca)}
          </p>
          <p className="mt-2 text-xs text-slate-400">CNPJ {braganca.cnpj}</p>
          <WhatsAppLink
            href={links.directions(braganca)}
            appearance="light"
            className="mt-4 h-10 px-4 text-sm"
          >
            Pedir rota
          </WhatsAppLink>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-signal uppercase">
            Horário
          </p>
          <ul className="mt-3 space-y-1 text-sm text-slate-300">
            {business.hours.map((item) => (
              <li key={item.days}>
                <span className="text-white">{item.days}:</span> {item.time}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate-300">
            WhatsApp {business.whatsapp.display}
          </p>
          <a
            href={business.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-signal underline-offset-4 hover:underline"
          >
            {business.instagramHandle}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-stone-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            {business.legalName} · Matriz Atibaia CNPJ {atibaia.cnpj}
          </p>
          <div className="flex gap-4">
            <Link href="/produtos" className="hover:text-white">
              Produtos
            </Link>
            <Link href="/contato" className="hover:text-white">
              Contato
            </Link>
            <Link href="/sobre" className="hover:text-white">
              A casa
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
