export const business = {
  name: "Irmãos Nascimento",
  legalName: "Nascimento Marques e Ferreira Material de Construção Ltda",
  slogan: "Aqui você encontra o que precisa, é bem atendido e sai feliz.",
  tagline:
    "Casa de material de construção na Rua das Esmeraldas, em Atibaia: atendimento de verdade, o item certo para a obra e a paz de resolver tudo no mesmo lugar.",
  instagram: "https://www.instagram.com/irmaosnascimento2023",
  instagramHandle: "@irmaosnascimento2023",
  email: "alonsomarques1@gmail.com",
  whatsapp: {
    e164: "5511975004168",
    display: "(11) 97500-4168",
  },
  hours: [
    { days: "Segunda a sábado", time: "07h às 18h" },
    { days: "Domingo", time: "07h às 12h" },
    { days: "Feriados", time: "Fechado" },
  ],
  /** Texto pronto para Mensagem de ausência no WhatsApp Business. */
  awayAutoReply: [
    "Olá! Obrigado por falar com a *Irmãos Nascimento*.",
    "",
    "No momento estamos *fora do horário de atendimento*.",
    "",
    "Nosso horário de funcionamento:",
    "• Segunda a sábado: 07h às 18h",
    "• Domingo: 07h às 12h",
    "• Feriados: fechado",
    "",
    "Deixe sua mensagem com nome, o que precisa e a cidade da obra.",
    "Assim que a loja abrir, retornamos por aqui.",
  ].join("\n"),
  hoursSummary:
    "Segunda a sábado: 07h às 18h · Domingo: 07h às 12h · Feriados: fechado",
  stores: {
    atibaia: {
      id: "atibaia",
      title: "Atibaia",
      role: "Loja",
      street: "Rua das Esmeraldas, 2260",
      neighborhood: "Chácaras Fernão Dias",
      city: "Atibaia",
      state: "SP",
      cep: "12954-637",
      cnpj: "52.474.273/0001-71",
      phones: ["(11) 4412-4168", "(11) 4412-1916"],
      mapQuery: "Rua das Esmeraldas, 2260, Atibaia, SP",
    },
    braganca: {
      id: "braganca",
      title: "Bragança Paulista",
      role: "Filial",
      street: "Rua Oswaldo Russomano, 380",
      neighborhood: "Parque dos Estados",
      city: "Bragança Paulista",
      state: "SP",
      cep: "12922-150",
      cnpj: "52.474.273/0002-52",
      phones: ["(11) 4032-1916"],
      mapQuery: "Rua Oswaldo Russomano, 380, Parque dos Estados, Bragança Paulista, SP",
    },
  },
} as const;

export type StoreId = keyof typeof business.stores;
export type Store = (typeof business.stores)[StoreId];

export function storeAddress(store: Store) {
  return `${store.street} — ${store.neighborhood}, ${store.city}/${store.state}, CEP ${store.cep}`;
}

export function mapsUrl(store: Store) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.mapQuery)}`;
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${business.whatsapp.e164}?text=${encodeURIComponent(withHoursIfClosed(message))}`;
}

const weekdayMap: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/** Horário local de Atibaia / Bragança (America/Sao_Paulo). */
export function getSaoPauloNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const weekday = weekdayMap[get("weekday")] ?? 0;
  const hour = Number(get("hour"));
  const minute = Number(get("minute"));
  return { weekday, hour, minute, minutes: hour * 60 + minute };
}

/** Aberto: seg–sáb 07h–18h, domingo 07h–12h. Feriados não dá para detectar no site. */
export function isOpenNow(date = new Date()) {
  const { weekday, minutes } = getSaoPauloNow(date);
  const open = 7 * 60;
  if (weekday === 0) return minutes >= open && minutes < 12 * 60;
  return minutes >= open && minutes < 18 * 60;
}

export function withHoursIfClosed(message: string, date = new Date()) {
  if (isOpenNow(date)) return message;
  return [
    message,
    "",
    "———",
    "Estou mandando fora do horário de atendimento.",
    `Horário: ${business.hoursSummary}.`,
    "Podem responder quando a loja abrir, por favor.",
  ].join("\n");
}

export const messages = {
  general:
    "Olá, Irmãos Nascimento! Vim pelo site e quero atendimento na loja da Rua das Esmeraldas, 2260, em Atibaia.",
  quote:
    "Olá, Irmãos Nascimento! Quero um orçamento de materiais de construção para a loja da Rua das Esmeraldas, em Atibaia.",
  buy(product: string) {
    return `Olá, Irmãos Nascimento! Quero comprar: ${product}. Podem me passar valor, disponibilidade e entrega na loja da Rua das Esmeraldas, em Atibaia?`;
  },
  directions(store: Store) {
    return `Olá, Irmãos Nascimento! Quero a melhor rota até a loja de ${store.city}, em ${storeAddress(store)}.`;
  },
};

export const categories = [
  {
    title: "Materiais de construção",
    summary: "Cimento, areia, brita, cal, bloco, tijolo e telha.",
    image: "/images/concreto.jpg",
    items: ["Cimento", "Areia", "Brita", "Cal", "Bloco", "Tijolo", "Telha", "Argamassa"],
  },
  {
    title: "Material elétrico",
    summary: "Fios, cabos, disjuntores, tomadas e eletrodutos.",
    image: "/images/eletrico.jpg",
    items: ["Fios e cabos", "Disjuntores", "Tomadas", "Eletrodutos", "Caixas"],
  },
  {
    title: "Ferragens e ferramentas",
    summary: "Parafusos, fechaduras, dobradiças e o básico do canteiro.",
    image: "/images/ferramentas.jpg",
    items: ["Parafusos", "Fechaduras", "Dobradiças", "Ferramentas", "Brocas"],
  },
  {
    title: "Entrega e caminhão pipa",
    summary: "Leva o material até a obra e água sob consulta.",
    image: "/images/entrega.jpg",
    items: ["Entrega em Atibaia", "Entrega em Bragança", "Caminhão pipa"],
  },
] as const;

export const products = [
  { name: "Cimento", detail: "Para contrapiso, laje, reboco e estrutural.", image: "/images/concreto.jpg" },
  { name: "Areia", detail: "Areia para massa, contrapiso e concreto.", image: "/images/obra.jpg" },
  { name: "Brita", detail: "Brita para concreto e base da obra.", image: "/images/concreto.jpg" },
  { name: "Bloco de concreto", detail: "Blocos para alvenaria. Informe medida e quantidade.", image: "/images/tijolo.jpg" },
  { name: "Tijolo", detail: "Tijolo para vedação. Envie a metragem da parede.", image: "/images/tijolo.jpg" },
  { name: "Telha", detail: "Telhas para cobertura. Diga o modelo e a área.", image: "/images/madeira.jpg" },
  { name: "Fios e cabos", detail: "Cabos para instalação residencial e de obra.", image: "/images/eletrico.jpg" },
  { name: "Ferramentas manuais", detail: "Colher de pedreiro, nível, trena e martelo.", image: "/images/ferramentas.jpg" },
] as const;
