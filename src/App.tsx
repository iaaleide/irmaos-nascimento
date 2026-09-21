import { HeartHandshake, MapPin, Menu, PackageSearch, Smile, X } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  business,
  categories,
  isHoliday,
  isOpenNow,
  mapsUrl,
  messages,
  products,
  storeAddress,
  whatsappUrl,
  type Store,
  type StoreId,
} from "./data";

const nav = [
  { href: "#inicio", label: "Início" },
  { href: "#produtos", label: "Produtos" },
  { href: "#sobre", label: "A casa" },
  { href: "#lojas", label: "Lojas" },
  { href: "#orcamento", label: "Orçamento" },
];

function WhatsAppButton({
  href,
  children,
  tone = "yellow",
}: {
  href: string;
  children: ReactNode;
  tone?: "yellow" | "navy" | "ghost";
}) {
  const className =
    tone === "yellow"
      ? "inline-flex items-center justify-center bg-signal px-5 py-3 text-sm font-semibold tracking-wide text-navy uppercase hover:brightness-95"
      : tone === "navy"
        ? "inline-flex items-center justify-center bg-navy px-5 py-3 text-sm font-semibold tracking-wide text-white uppercase hover:bg-navy-mid"
        : "inline-flex items-center justify-center border border-white/40 px-5 py-3 text-sm font-semibold tracking-wide text-white uppercase hover:bg-white/10";
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

function StoreBlock({ store }: { store: Store }) {
  return (
    <article className="border border-stone-200 bg-white p-6">
      <p className="w-fit bg-signal px-2 py-0.5 text-xs font-semibold tracking-[0.16em] text-navy uppercase">
        {store.role}
      </p>
      <h3 className="mt-3 font-heading text-2xl tracking-wide text-navy uppercase">{store.title}</h3>
      <p className="mt-2 text-stone-600">{storeAddress(store)}</p>
      <p className="mt-2 text-sm text-stone-500">CNPJ {store.cnpj}</p>
      <p className="mt-1 text-sm text-stone-500">{store.phones.join(" · ")}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <WhatsAppButton href={whatsappUrl(messages.directions(store))} tone="navy">
          Como chegar no WhatsApp
        </WhatsAppButton>
        <a
          href={mapsUrl(store)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy underline underline-offset-4"
        >
          <MapPin className="size-4" />
          Ver no mapa
        </a>
      </div>
    </article>
  );
}

function QuoteForm() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("Atibaia");
  const [store, setStore] = useState<StoreId | "qualquer">("atibaia");
  const [items, setItems] = useState("");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !items.trim()) {
      setError("Preencha seu nome e o que precisa orçar.");
      return;
    }
    const storeLabel = store === "qualquer" ? "qualquer loja" : business.stores[store].title;
    const message = [
      "Olá, Irmãos Nascimento! Quero um orçamento pelo site.",
      `Nome: ${name.trim()}`,
      `Cidade: ${city.trim()}`,
      `Loja: ${storeLabel}`,
      `Pedido: ${items.trim()}`,
    ].join("\n");
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 bg-white p-6 shadow-sm">
      <label className="grid gap-1 text-sm font-medium text-navy">
        Nome
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-stone-300 px-3 py-2 text-base font-normal text-stone-800 outline-none focus:border-navy"
          placeholder="Seu nome"
        />
      </label>
      <label className="grid gap-1 text-sm font-medium text-navy">
        Cidade da obra
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-stone-300 px-3 py-2 text-base font-normal text-stone-800 outline-none focus:border-navy"
        />
      </label>
      <label className="grid gap-1 text-sm font-medium text-navy">
        Loja
        <select
          value={store}
          onChange={(e) => setStore(e.target.value as StoreId | "qualquer")}
          className="border border-stone-300 px-3 py-2 text-base font-normal text-stone-800 outline-none focus:border-navy"
        >
          <option value="atibaia">Rua das Esmeraldas — Atibaia</option>
          <option value="braganca">Parque dos Estados — Bragança</option>
          <option value="qualquer">Tanto faz</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm font-medium text-navy">
        O que você precisa
        <textarea
          value={items}
          onChange={(e) => setItems(e.target.value)}
          rows={4}
          className="border border-stone-300 px-3 py-2 text-base font-normal text-stone-800 outline-none focus:border-navy"
          placeholder="Ex.: 20 sacos de cimento, 3 m³ de areia e 200 tijolos"
        />
      </label>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button
        type="submit"
        className="bg-signal px-5 py-3 text-sm font-semibold tracking-wide text-navy uppercase hover:brightness-95"
      >
        Peça o Orçamento
      </button>
      <p className="text-xs text-stone-500">
        Sem carrinho e sem cadastro. O pedido abre direto no WhatsApp {business.whatsapp.display}.
      </p>
    </form>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const openNow = isOpenNow();
  const holiday = isHoliday();
  const statusLabel = openNow ? (holiday ? "Aberto · feriado" : "Aberto agora") : holiday ? "Fechado · feriado" : "Fechado agora";

  return (
    <div className="min-h-svh bg-[#f6f4ef] text-stone-900">
      {!openNow ? (
        <div className="bg-signal px-4 py-2.5 text-center text-sm font-semibold text-navy sm:px-6">
          {holiday ? "Hoje é feriado. " : "Fora do horário agora. "}
          Funcionamos {business.hoursSummary}. Pode mandar no WhatsApp — respondemos assim que abrir.
        </div>
      ) : null}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-navy text-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-18 sm:px-6">
          <a href="#inicio" className="font-heading text-lg tracking-wide uppercase sm:text-xl">
            Irmãos Nascimento
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-signal">
                {item.label}
              </a>
            ))}
            <WhatsAppButton href={whatsappUrl(messages.quote)}>Peça o Orçamento</WhatsAppButton>
          </nav>
          <button
            type="button"
            className="md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open ? (
          <div className="grid gap-3 border-t border-white/10 px-4 py-4 md:hidden">
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="py-1">
                {item.label}
              </a>
            ))}
            <WhatsAppButton href={whatsappUrl(messages.quote)}>Peça o Orçamento</WhatsAppButton>
          </div>
        ) : null}
      </header>

      <main>
        <section id="inicio" className="relative isolate min-h-[88svh] overflow-hidden bg-navy text-white">
          <img src="/images/hero.jpg" alt="Canteiro de obra" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,31,58,0.9)_0%,rgba(11,31,58,0.55)_60%,rgba(11,31,58,0.2)_100%)]" />
          <div className="relative mx-auto flex min-h-[88svh] w-full max-w-6xl flex-col justify-end px-4 py-16 sm:px-6 sm:py-20">
            <p className="w-fit bg-signal px-2.5 py-1 text-xs font-semibold tracking-[0.22em] text-navy uppercase">
              Rua das Esmeraldas, 2260 · Atibaia
            </p>
            <h1 className="mt-4 max-w-3xl font-heading text-[2.1rem] leading-[1.05] tracking-wide uppercase sm:text-5xl md:text-6xl">
              Peça o seu orçamento na melhor casa de materiais da região
            </h1>
            <div className="mt-8">
              <WhatsAppButton href={whatsappUrl(messages.quote)}>Peça o Orçamento</WhatsAppButton>
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
                <item.icon className="mt-1 size-6 shrink-0 text-navy" />
                <div>
                  <h2 className="font-heading text-lg tracking-wide uppercase">{item.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-stone-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="produtos" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="w-fit bg-signal px-2 py-1 text-xs font-semibold tracking-[0.18em] text-navy uppercase">
            O que tem na casa
          </p>
          <h2 className="mt-2 font-heading text-3xl tracking-wide text-navy uppercase sm:text-5xl">
            Do alicerce à ferragem
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <a
                key={category.title}
                href={whatsappUrl(messages.buy(category.title))}
                target="_blank"
                rel="noreferrer"
                className="photo-zoom group overflow-hidden border border-stone-200 bg-white"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={category.image} alt={category.title} className="size-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-lg tracking-wide uppercase">{category.title}</h3>
                  <p className="mt-1 text-sm text-stone-600">{category.summary}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article key={product.name} className="border border-stone-200 bg-white">
                <div className="photo-zoom aspect-[4/3] overflow-hidden">
                  <img src={product.image} alt={product.name} className="size-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-heading tracking-wide uppercase">{product.name}</h3>
                  <p className="mt-1 text-sm text-stone-600">{product.detail}</p>
                  <a
                    href={whatsappUrl(messages.buy(product.name))}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm font-semibold text-navy underline underline-offset-4"
                  >
                    Comprar no WhatsApp
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="sobre" className="bg-navy text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 sm:items-center">
            <div>
              <p className="w-fit bg-signal px-2 py-1 text-xs font-semibold tracking-[0.18em] text-navy uppercase">
                A casa
              </p>
              <h2 className="mt-3 font-heading text-3xl tracking-wide uppercase sm:text-5xl">
                {business.slogan}
              </h2>
              <p className="mt-4 max-w-xl text-white/80">{business.tagline}</p>
              <p className="mt-4 text-sm text-white/70">{business.legalName}</p>
            </div>
            <div className="photo-zoom overflow-hidden">
              <img src="/images/balcao.jpg" alt="Atendimento de materiais" className="w-full object-cover" />
            </div>
          </div>
        </section>

        <section id="lojas" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="w-fit bg-signal px-2 py-1 text-xs font-semibold tracking-[0.18em] text-navy uppercase">
            Onde estamos
          </p>
          <h2 className="mt-2 font-heading text-3xl tracking-wide text-navy uppercase sm:text-5xl">
            Loja da Rua das Esmeraldas
          </h2>
          <p className="mt-3 max-w-2xl text-stone-600">
            O atendimento principal é na loja de Atibaia. A filial do Parque dos Estados, em Bragança Paulista, fica logo abaixo.
          </p>
          <div className="mt-8 grid gap-4">
            <StoreBlock store={business.stores.atibaia} />
            <StoreBlock store={business.stores.braganca} />
          </div>
          <div className="mt-8 border border-stone-200 bg-white p-6">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-heading text-xl tracking-wide text-navy uppercase">Horário</h3>
              <span
                className={`px-2 py-0.5 text-xs font-semibold tracking-wide uppercase ${
                  openNow ? "bg-emerald-100 text-emerald-900" : "bg-signal text-navy"
                }`}
              >
                {statusLabel}
              </span>
            </div>
            <ul className="mt-3 grid gap-2 text-stone-700 sm:grid-cols-3">
              {business.hours.map((row) => (
                <li key={row.days}>
                  <strong>{row.days}:</strong> {row.time}
                </li>
              ))}
            </ul>
            {!openNow ? (
              <p className="mt-4 text-sm text-stone-600">
                Pode mandar o pedido no WhatsApp mesmo assim — a mensagem já inclui nosso horário e respondemos quando a loja abrir.
              </p>
            ) : null}
          </div>
        </section>

        <section id="orcamento" className="bg-concrete">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 sm:items-start">
            <div>
              <p className="w-fit bg-signal px-2 py-1 text-xs font-semibold tracking-[0.18em] text-navy uppercase">
                WhatsApp
              </p>
              <h2 className="mt-2 font-heading text-3xl tracking-wide text-navy uppercase sm:text-5xl">
                Peça o Orçamento
              </h2>
              <p className="mt-4 text-stone-700">
                Compra, orçamento e rota saem só pelo WhatsApp. Sem carrinho no site.
              </p>
              <p className="mt-4 font-semibold text-navy">{business.whatsapp.display}</p>
            </div>
            <QuoteForm />
          </div>
        </section>
      </main>

      <footer className="bg-navy text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
          <div>
            <p className="font-heading text-xl tracking-wide uppercase">{business.name}</p>
            <p className="mt-2 text-sm text-white/75">{business.slogan}</p>
          </div>
          <div className="text-sm text-white/80">
            <p className="font-semibold text-signal">Atibaia</p>
            <p>{storeAddress(business.stores.atibaia)}</p>
            <p className="mt-3 font-semibold text-signal">Filial · Bragança</p>
            <p>{storeAddress(business.stores.braganca)}</p>
          </div>
          <div className="text-sm">
            <a href={whatsappUrl(messages.general)} target="_blank" rel="noreferrer" className="font-semibold text-signal">
              WhatsApp {business.whatsapp.display}
            </a>
            <p className="mt-2">
              <a href={business.instagram} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                {business.instagramHandle}
              </a>
            </p>
          </div>
        </div>
      </footer>

      <a
        href={whatsappUrl(messages.quote)}
        target="_blank"
        rel="noreferrer"
        className="fixed right-4 bottom-4 z-40 bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg"
      >
        WhatsApp
      </a>
    </div>
  );
}
