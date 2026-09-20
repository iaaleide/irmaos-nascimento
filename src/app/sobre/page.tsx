import type { Metadata } from "next";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { business } from "@/lib/business";
import { links } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "A casa",
  description: `${business.slogan} Conheça a Irmãos Nascimento, casa de material de construção em Bragança Paulista e Atibaia.`,
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,196,0,0.2),transparent_40%),linear-gradient(160deg,#0b1f3a_0%,#14345c_60%,#0b1f3a_100%)]" />
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
            Nascimento Marques e Ferreira. A razão social é{" "}
            {business.legalName}, aberta em 9 de outubro de 2023, com o
            atendimento nas mãos de {business.owners[0]} e {business.owners[1]}.
          </p>
          <p>
            A matriz fica em Atibaia, na Rua das Esmeraldas, 2260. Em 15 de maio
            de 2025 a casa chegou a Bragança Paulista, no Parque dos Estados —
            Rua Oswaldo Russomano, 380 — para ficar mais perto de quem constrói
            e reforma por aqui.
          </p>
          <p>
            O slogan não é enfeite: a ideia é que ninguém saia da loja perdido.
            Se falta um saco de cimento, um disjuntor ou só a rota até o pátio,
            a conversa vai para o WhatsApp e a gente resolve com calma.
          </p>
        </div>
        <aside className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-2xl tracking-wide uppercase">
            Dados da empresa
          </h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div>
              <dt className="text-stone-500">Nome fantasia</dt>
              <dd className="font-medium">{business.name}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Razão social</dt>
              <dd className="font-medium">{business.legalName}</dd>
            </div>
            <div>
              <dt className="text-stone-500">CNPJ da loja em Bragança</dt>
              <dd className="font-medium">{business.stores.braganca.cnpj}</dd>
            </div>
            <div>
              <dt className="text-stone-500">CNPJ da matriz em Atibaia</dt>
              <dd className="font-medium">{business.stores.atibaia.cnpj}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Atividade</dt>
              <dd className="font-medium">
                Comércio varejista de materiais de construção, material
                elétrico, ferragens, entrega e caminhão pipa.
              </dd>
            </div>
          </dl>
          <WhatsAppLink href={links.general} className="mt-6">
            Falar com a casa
          </WhatsAppLink>
        </aside>
      </section>
    </div>
  );
}
