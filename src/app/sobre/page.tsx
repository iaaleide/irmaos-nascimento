import type { Metadata } from "next";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { business } from "@/lib/business";
import { links } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "A casa",
  description: `${business.slogan} Conheça a Irmãos Nascimento, casa de material de construção na Rua das Esmeraldas, Atibaia.`,
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative isolate min-h-[52vh] overflow-hidden bg-navy text-white">
        <img
          src="/images/reforma.jpg"
          alt="Reforma e acabamento"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/65" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="w-fit bg-signal px-2.5 py-1 text-xs font-semibold tracking-[0.22em] text-navy uppercase">
            Uma casa de família
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl tracking-wide uppercase sm:text-6xl">
            {business.slogan}
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="space-y-5 text-lg leading-relaxed text-stone-700">
          <p>
            A {business.name} é a casa de material de construção da família
            Nascimento Marques e Ferreira. A razão social é {business.legalName},
            aberta em 9 de outubro de 2023, com o atendimento nas mãos de{" "}
            {business.owners[0]} e {business.owners[1]}.
          </p>
          <p>
            A loja fica em Atibaia, na Rua das Esmeraldas, 2260. A filial
            atende no Parque dos Estados, em Bragança Paulista — Rua Oswaldo
            Russomano, 380.
          </p>
          <p>
            As fotos do site são de catálogo, para o rascunho ter cara de loja.
            O endereço, o CNPJ e o WhatsApp são os da casa de verdade.
          </p>
        </div>
        <aside className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="photo-zoom h-48">
            <img src="/images/madeira.jpg" alt="Madeira e material de obra" />
          </div>
          <div className="p-6">
            <h2 className="font-heading text-2xl tracking-wide uppercase">
              Dados da empresa
            </h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div>
                <dt className="text-stone-500">Nome fantasia</dt>
                <dd className="font-medium">{business.name}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Loja — Rua das Esmeraldas</dt>
                <dd className="font-medium">{business.stores.atibaia.cnpj}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Filial — Parque dos Estados</dt>
                <dd className="font-medium">{business.stores.braganca.cnpj}</dd>
              </div>
            </dl>
            <WhatsAppLink href={links.general} className="mt-6">
              Falar com a casa
            </WhatsAppLink>
          </div>
        </aside>
      </section>
    </div>
  );
}
