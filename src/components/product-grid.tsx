"use client";

import { useMemo, useState } from "react";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { products } from "@/lib/business";
import { links } from "@/lib/whatsapp";

const filters = [
  "Todos",
  "Materiais de construção",
  "Material elétrico",
  "Ferragens e ferramentas",
  "Entrega",
  "Água",
] as const;

export function ProductGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");
  const visible = useMemo(
    () =>
      filter === "Todos"
        ? products
        : products.filter((item) => item.category === filter),
    [filter],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            className="filter-chip rounded-full border border-navy/15 bg-white px-3 py-2 text-sm"
            data-active={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((product) => (
          <article
            key={product.name}
            className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
          >
            <div className="photo-zoom h-48">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                {product.category}
              </p>
              <h3 className="mt-1 font-heading text-2xl tracking-wide uppercase">
                {product.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {product.detail}
              </p>
              <WhatsAppLink
                href={links.buy(product.name)}
                className="mt-4 h-11 px-4 text-sm"
              >
                Comprar no WhatsApp
              </WhatsAppLink>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
