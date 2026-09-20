import { business, storeAddress, type Store, type StoreId } from "@/lib/business";

export function whatsappUrl(message: string) {
  return `https://wa.me/${business.whatsapp.e164}?text=${encodeURIComponent(message)}`;
}

export const messages = {
  general:
    "Olá, Irmãos Nascimento! Vim pelo site e quero atendimento na loja de Bragança Paulista.",
  quote:
    "Olá, Irmãos Nascimento! Quero um orçamento de materiais de construção para a loja de Bragança Paulista.",
  buy(product: string) {
    return `Olá, Irmãos Nascimento! Quero comprar: ${product}. Podem me passar valor, disponibilidade e entrega para Bragança Paulista?`;
  },
  category(title: string) {
    return `Olá, Irmãos Nascimento! Quero ver opções de ${title.toLowerCase()} na loja de Bragança Paulista.`;
  },
  directions(store: Store) {
    return `Olá, Irmãos Nascimento! Quero a melhor rota até a loja de ${store.city}, em ${storeAddress(store)}.`;
  },
  quoteForm(input: {
    name: string;
    city: string;
    store: StoreId | "qualquer";
    items: string;
  }) {
    const storeLabel =
      input.store === "qualquer"
        ? "qualquer loja"
        : business.stores[input.store].title;
    return [
      "Olá, Irmãos Nascimento! Quero um orçamento pelo site.",
      `Nome: ${input.name}`,
      `Cidade: ${input.city}`,
      `Loja: ${storeLabel}`,
      `Pedido: ${input.items}`,
    ].join("\n");
  },
};

export const links = {
  general: whatsappUrl(messages.general),
  quote: whatsappUrl(messages.quote),
  buy: (product: string) => whatsappUrl(messages.buy(product)),
  category: (title: string) => whatsappUrl(messages.category(title)),
  directions: (store: Store) => whatsappUrl(messages.directions(store)),
};
