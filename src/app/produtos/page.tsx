import type { Metadata } from "next";
import { ProductGrid } from "@/components/product-grid";
import { QuoteForm } from "@/components/quote-form";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Peça cimento, areia, material elétrico, ferragens e entrega no WhatsApp da Irmãos Nascimento, loja da Rua das Esmeraldas em Atibaia.",
};

export default function ProductsPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <img
          src="/images/concreto.jpg"
          alt="Materiais de construção"
          className="absolute inset-0 size-full object-cover opacity-40"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="w-fit bg-signal px-2 py-1 text-xs font-semibold tracking-[0.18em] text-navy uppercase">
            Lista para orçar
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl tracking-wide uppercase sm:text-6xl">
            Encontre o que a obra precisa
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Fotos de catálogo para ajudar a escolher. O pedido sai no WhatsApp,
            com valor e estoque na hora.
          </p>
        </div>
      </section>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <ProductGrid />
        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="font-heading text-3xl tracking-wide uppercase">
              Prefere mandar a lista inteira?
            </h2>
            <p className="mt-3 text-stone-600">
              Escreva quantidade e endereço. A conversa abre pronta no WhatsApp.
            </p>
          </div>
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
