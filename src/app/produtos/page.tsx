import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote-form";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { categories, products } from "@/lib/business";
import { links } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Peça cimento, areia, material elétrico, ferragens e entrega no WhatsApp da Irmãos Nascimento em Bragança Paulista.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <p className="w-fit bg-signal px-2 py-1 text-xs font-semibold tracking-[0.18em] text-navy uppercase">
        Lista para orçar
      </p>
      <h1 className="mt-2 max-w-3xl font-heading text-4xl tracking-wide uppercase sm:text-5xl">
        Encontre o que a obra precisa
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-stone-600">
        Não tem carrinho nem preço travado no site. Cada item abre o WhatsApp
        com o pedido pronto — a loja confirma valor, estoque e entrega.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.slug}
            className="rounded-2xl border border-stone-200 bg-white p-5"
          >
            <h2 className="font-heading text-xl tracking-wide uppercase">
              {category.title}
            </h2>
            <ul className="mt-3 space-y-1 text-sm text-stone-600">
              {category.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <WhatsAppLink
              href={links.category(category.title)}
              className="mt-5 h-11 px-4 text-sm"
            >
              Quero dessa linha
            </WhatsAppLink>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <h2 className="font-heading text-3xl tracking-wide uppercase">
          Peça item a item
        </h2>
        <div className="mt-6 divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-200 bg-white">
          {products.map((product) => (
            <div
              key={product.name}
              className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {product.category}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-stone-900">
                  {product.name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-stone-600">
                  {product.detail}
                </p>
              </div>
              <WhatsAppLink
                href={links.buy(product.name)}
                className="h-11 shrink-0 px-4 text-sm"
              >
                Comprar no WhatsApp
              </WhatsAppLink>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <h2 className="font-heading text-3xl tracking-wide uppercase">
            Prefere mandar a lista inteira?
          </h2>
          <p className="mt-3 text-stone-600">
            Escreva o pedido com quantidade e endereço. A conversa abre no
            WhatsApp da Irmãos Nascimento, pronta para a loja responder.
          </p>
        </div>
        <QuoteForm />
      </div>
    </div>
  );
}
