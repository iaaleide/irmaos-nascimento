import type { Metadata } from "next";
import { Clock3, Phone } from "lucide-react";
import { QuoteForm } from "@/components/quote-form";
import { StoreCard } from "@/components/store-card";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { business } from "@/lib/business";
import { links } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Peça orçamento, compra e rota da Irmãos Nascimento pelo WhatsApp. Loja no Parque dos Estados, Bragança Paulista.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <p className="w-fit bg-signal px-2 py-1 text-xs font-semibold tracking-[0.18em] text-navy uppercase">
        Fale com a loja
      </p>
      <h1 className="mt-2 max-w-3xl font-heading text-4xl tracking-wide uppercase sm:text-5xl">
        {business.slogan}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-stone-600">
        Compra, orçamento e como chegar passam pelo WhatsApp {business.whatsapp.display}.
        É o mesmo número da casa, com conversa direta.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <WhatsAppLink href={links.quote}>Pedir orçamento</WhatsAppLink>
        <WhatsAppLink
          href={links.directions(business.stores.braganca)}
          appearance="outline"
        >
          Pedir rota de Bragança
        </WhatsAppLink>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <Phone className="size-5 text-primary" />
          <h2 className="mt-3 font-heading text-xl tracking-wide uppercase">
            WhatsApp
          </h2>
          <p className="mt-2 text-sm text-stone-600">{business.whatsapp.display}</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <Clock3 className="size-5 text-primary" />
          <h2 className="mt-3 font-heading text-xl tracking-wide uppercase">
            Horário
          </h2>
          <ul className="mt-2 space-y-1 text-sm text-stone-600">
            {business.hours.map((item) => (
              <li key={item.days}>
                {item.days}: {item.time}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-stone-500">{business.hoursNote}</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <span className="grid size-5 place-items-center rounded-sm border border-primary text-[10px] font-bold text-primary">
            IG
          </span>
          <h2 className="mt-3 font-heading text-xl tracking-wide uppercase">
            Instagram
          </h2>
          <a
            href={business.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-primary underline-offset-4 hover:underline"
          >
            {business.instagramHandle}
          </a>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <StoreCard store={business.stores.braganca} />
        <StoreCard store={business.stores.atibaia} />
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="font-heading text-3xl tracking-wide uppercase">
            Mande o pedido agora
          </h2>
          <p className="mt-3 text-stone-600">
            Escreva o que falta na obra. O site só monta a mensagem e abre o
            WhatsApp — nada fica salvo por aqui.
          </p>
        </div>
        <QuoteForm />
      </div>
    </div>
  );
}
