import { MapPin, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { business, storeAddress, type Store } from "@/lib/business";
import { links } from "@/lib/whatsapp";

export function StoreCard({
  store,
  showFilial,
}: {
  store: Store;
  showFilial?: boolean;
}) {
  const filial = business.stores.braganca;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="relative min-h-56 bg-stone-100">
        <iframe
          title={`Mapa da loja em ${store.city}`}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(store.mapQuery)}&z=16&output=embed`}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{store.role}</Badge>
          {store.highlight ? (
            <Badge className="bg-signal text-navy">Rua das Esmeraldas</Badge>
          ) : null}
        </div>
        <div>
          <h3 className="font-heading text-2xl tracking-wide uppercase">
            {store.title}
          </h3>
          <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-stone-600">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            {storeAddress(store)}
          </p>
          <p className="mt-2 flex items-center gap-2 text-xs text-stone-500">
            <Building2 className="size-3.5" />
            CNPJ {store.cnpj}
          </p>
        </div>
        <div className="mt-auto flex flex-col gap-2 sm:flex-row">
          <WhatsAppLink href={links.directions(store)} className="flex-1">
            Pedir rota no WhatsApp
          </WhatsAppLink>
          <WhatsAppLink
            href={links.quote}
            appearance="outline"
            className="flex-1"
          >
            Pedir orçamento
          </WhatsAppLink>
        </div>
        {showFilial ? (
          <div className="border-t border-stone-200 pt-4">
            <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
              Filial
            </p>
            <p className="mt-1 font-heading text-lg tracking-wide uppercase">
              {filial.title} · Parque dos Estados
            </p>
            <p className="mt-1 text-sm text-stone-600">{storeAddress(filial)}</p>
            <p className="mt-1 text-xs text-stone-500">CNPJ {filial.cnpj}</p>
            <WhatsAppLink
              href={links.directions(filial)}
              appearance="outline"
              className="mt-3 h-11 px-4 text-sm"
            >
              Rota da filial
            </WhatsAppLink>
          </div>
        ) : null}
      </div>
    </article>
  );
}
