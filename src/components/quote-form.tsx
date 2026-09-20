"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { messages, whatsappUrl } from "@/lib/whatsapp";
import type { StoreId } from "@/lib/business";

export function QuoteForm() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("Bragança Paulista");
  const [store, setStore] = useState<StoreId | "qualquer">("braganca");
  const [items, setItems] = useState("");

  const ready = name.trim().length > 1 && items.trim().length > 3;
  const href = whatsappUrl(
    messages.quoteForm({
      name: name.trim() || "Cliente",
      city: city.trim() || "Não informado",
      store,
      items: items.trim() || "Quero um orçamento",
    }),
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready) return;
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Seu nome</Label>
          <Input
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Como devemos te chamar"
            className="h-11"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="city">Cidade da obra</Label>
          <Input
            id="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Bragança Paulista"
            className="h-11"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="store">Loja de preferência</Label>
        <select
          id="store"
          value={store}
          onChange={(event) =>
            setStore(event.target.value as StoreId | "qualquer")
          }
          className="h-11 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="braganca">Bragança Paulista — Parque dos Estados</option>
          <option value="atibaia">Atibaia — Chácaras Fernão Dias</option>
          <option value="qualquer">Tanto faz, o que tiver mais rápido</option>
        </select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="items">O que você precisa</Label>
        <Textarea
          id="items"
          value={items}
          onChange={(event) => setItems(event.target.value)}
          placeholder="Ex.: 20 sacos de cimento, 4 m³ de areia e entrega na Rua X, Parque dos Estados"
          className="min-h-32"
          required
        />
      </div>

      <WhatsAppLink
        href={href}
        className={`w-full sm:w-auto ${!ready ? "pointer-events-none opacity-50" : ""}`}
        aria-disabled={!ready}
      >
        Enviar orçamento no WhatsApp
      </WhatsAppLink>
      <p className="text-xs text-stone-500">
        O formulário não grava pedido no site. Ele abre a conversa no WhatsApp
        com o texto pronto para a loja responder.
      </p>
    </form>
  );
}
