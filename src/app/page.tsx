import Link from "next/link";
import { CheckCircle2, HeartHandshake, MapPinned, PackageSearch, Smile } from "lucide-react";
import { QuoteForm } from "@/components/quote-form";
import { StoreCard } from "@/components/store-card";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { business, categories } from "@/lib/business";
import { links } from "@/lib/whatsapp";

export default function HomePage() {
  const braganca = business.stores.braganca;

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(245,196,0,0.22),transparent_36%),linear-gradient(135deg,#0b1f3a_0%,#14345c_55%,#0b1f3a_100%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(245,196,0,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="relative mx-auto flex min-h-[70svh] w-full max-w-6xl flex-col justify-center px-4 py-14 sm:min-h-[82vh] sm:px-6 sm:py-20">
          <p className="w-fit bg-signal px-2.5 py-1 text-xs font-semibold tracking-[0.22em] text-navy uppercase">
            Parque dos Estados · Bragança Paulista
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-[2rem] leading-tight tracking-wide uppercase sm:text-6xl">
            {business.slogan}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-100/90">
            {business.tagline} Compra, orçamento e rota saem no WhatsApp, sem
            burocracia e com conversa de gente.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink href={links.quote} appearance="light">
              Pedir orçamento
            </WhatsAppLink>
            <WhatsAppLink href={links.directions(braganca)} appearance="outline" className="border-white/35 bg-transparent text-white hover:bg-white/10">
              Como chegar
            </WhatsAppLink>
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
          {[
            {
              icon: PackageSearch,
              title: "Encontre o que precisa",
              text: "Cimento, areia, elétrico, ferragem e entrega — o básico da obra num só balcão.",
            },
            {
              icon: HeartHandshake,
              title: "Seja bem atendido",
              text: "A gente escuta o pedido, tira a dúvida e monta o que falta sem pressa nem enrolação.",
            },
            {
              icon: Smile,
              title: "Saia feliz com a obra",
              text: "Resolver o material no mesmo dia deixa a reforma mais leve e o cliente mais tranquilo.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <item.icon className="mt-1 size-6 shrink-0 text-primary" />
              <div>
                <h2 className="font-heading text-lg tracking-wide uppercase">
                  {item.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-stone-600">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="w-fit bg-signal px-2 py-1 text-xs font-semibold tracking-[0.18em] text-navy uppercase">
              O que tem na casa
            </p>
            <h2 className="mt-2 font-heading text-3xl tracking-wide uppercase sm:text-4xl">
              Do alicerce à ferragem
            </h2>
          </div>
          <Link href="/produtos" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
            Ver tudo que orçamos
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.slug}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
            >
              <div className={`relative h-28 bg-linear-to-br ${category.tone}`}>
                <span className="absolute inset-x-0 top-0 h-1.5 bg-signal" />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-xl tracking-wide uppercase">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {category.summary}
                </p>
                <WhatsAppLink
                  href={links.category(category.title)}
                  className="mt-4 h-11 px-4 text-sm"
                >
                  Pedir no WhatsApp
                </WhatsAppLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-navy text-slate-100">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="w-fit bg-signal px-2 py-1 text-xs font-semibold tracking-[0.18em] text-navy uppercase">
              Como funciona
            </p>
            <h2 className="mt-2 font-heading text-3xl tracking-wide uppercase sm:text-4xl">
              Três passos e a obra anda
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                "Manda no WhatsApp o que falta: lista, foto ou só a dúvida.",
                "A gente confirma estoque, valor e se tem entrega no dia.",
                "Você retira no Parque dos Estados ou pede a rota e o carregamento.",
              ].map((step, index) => (
                <li key={step} className="flex gap-3 text-slate-200">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-signal" />
                  <span>
                    <strong className="text-white">{index + 1}.</strong> {step}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <QuoteForm />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="w-fit bg-signal px-2 py-1 text-xs font-semibold tracking-[0.18em] text-navy uppercase">
              Onde estamos
            </p>
            <h2 className="mt-2 font-heading text-3xl tracking-wide uppercase sm:text-4xl">
              Bragança primeiro, Atibaia também
            </h2>
            <p className="mt-3 max-w-2xl text-stone-600">
              A rota não abre no mapa sozinha: peça o caminho no WhatsApp e a
              loja te manda o jeito mais fácil de chegar, com ponto de
              referência do bairro.
            </p>
          </div>
          <MapPinned className="hidden size-10 text-primary sm:block" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <StoreCard store={business.stores.braganca} />
          <StoreCard store={business.stores.atibaia} />
        </div>
      </section>
    </div>
  );
}
