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
      <section className="relative isolate overflow-hidden bg-stone-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,92,38,0.35),transparent_45%),linear-gradient(135deg,#1c1917_0%,#3f2a1d_52%,#1c1917_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="relative mx-auto flex min-h-[82vh] w-full max-w-6xl flex-col justify-center px-4 py-20 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.22em] text-amber-200 uppercase">
            Parque dos Estados · Bragança Paulista
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-tight tracking-wide uppercase sm:text-6xl">
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
            <WhatsAppLink href={links.directions(braganca)} appearance="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
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
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
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
              <div className={`h-28 bg-linear-to-br ${category.tone}`} />
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

      <section className="bg-stone-950 text-stone-100">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-amber-200 uppercase">
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
                <li key={step} className="flex gap-3 text-stone-200">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-amber-300" />
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
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
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
