import Link from "next/link";
import { CheckCircle2, HeartHandshake, PackageSearch, Smile } from "lucide-react";
import { Gallery } from "@/components/gallery";
import { QuoteForm } from "@/components/quote-form";
import { StoreCard } from "@/components/store-card";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { business, categories } from "@/lib/business";
import { links } from "@/lib/whatsapp";

export default function HomePage() {
  const atibaia = business.stores.atibaia;

  return (
    <div>
      <section className="relative isolate min-h-[88svh] overflow-hidden bg-navy text-white">
        <img
          src="/images/hero.jpg"
          alt="Canteiro de obra com estrutura em concreto"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,31,58,0.88)_0%,rgba(11,31,58,0.55)_55%,rgba(11,31,58,0.25)_100%)]" />
        <div className="relative mx-auto flex min-h-[88svh] w-full max-w-6xl flex-col justify-end px-4 py-16 sm:px-6 sm:py-20">
          <p className="w-fit bg-signal px-2.5 py-1 text-xs font-semibold tracking-[0.22em] text-navy uppercase">
            Rua das Esmeraldas, 2260 · Atibaia
          </p>
          <h1 className="reveal mt-4 max-w-3xl font-heading text-[2.1rem] leading-[1.05] tracking-wide uppercase sm:text-6xl">
            {business.slogan}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            {business.tagline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink href={links.quote} appearance="light">
              Pedir orçamento
            </WhatsAppLink>
            <WhatsAppLink
              href={links.directions(atibaia)}
              appearance="outline"
              className="border-white/35 bg-transparent text-white hover:bg-white/10"
            >
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
              text: "Cimento, areia, elétrico, ferragem e entrega no mesmo balcão.",
            },
            {
              icon: HeartHandshake,
              title: "Seja bem atendido",
              text: "A gente escuta o pedido e monta o que falta sem enrolação.",
            },
            {
              icon: Smile,
              title: "Saia feliz com a obra",
              text: "Resolver o material no mesmo dia deixa a reforma mais leve.",
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
            <h2 className="mt-2 font-heading text-3xl tracking-wide uppercase sm:text-5xl">
              Do alicerce à ferragem
            </h2>
          </div>
          <Link
            href="/produtos"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Ver tudo que orçamos
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.slug}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
            >
              <div className="photo-zoom relative h-52">
                <img src={category.image} alt={category.title} />
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

      <section className="bg-[#f6f3ea]">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="w-fit bg-signal px-2 py-1 text-xs font-semibold tracking-[0.18em] text-navy uppercase">
            A cara da obra
          </p>
          <h2 className="mt-2 max-w-2xl font-heading text-3xl tracking-wide uppercase sm:text-5xl">
            Fotos de referência para você se imaginar na loja
          </h2>
          <p className="mt-3 max-w-2xl text-stone-600">
            Imagens de catálogo para o rascunho do site — o atendimento e o
            endereço são da Irmãos Nascimento. Toque para ampliar.
          </p>
          <div className="mt-8">
            <Gallery />
          </div>
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
                "Você retira na Rua das Esmeraldas ou pede a rota e o carregamento.",
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
          <div className="overflow-hidden rounded-2xl">
            <div className="photo-zoom h-52">
              <img src="/images/balcao.jpg" alt="Atendimento de materiais" />
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <p className="w-fit bg-signal px-2 py-1 text-xs font-semibold tracking-[0.18em] text-navy uppercase">
          Onde estamos
        </p>
        <h2 className="mt-2 font-heading text-3xl tracking-wide uppercase sm:text-4xl">
          Loja da Rua das Esmeraldas
        </h2>
        <p className="mt-3 max-w-2xl text-stone-600">
          A casa principal fica na Rua das Esmeraldas, 2260, em Atibaia. A
          filial do Parque dos Estados aparece embaixo, com o endereço completo.
        </p>
        <div className="mt-8 max-w-3xl">
          <StoreCard store={business.stores.atibaia} showFilial />
        </div>
      </section>
    </div>
  );
}
