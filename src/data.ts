export const business = {
  name: "Irmãos Nascimento",
  legalName: "Nascimento Marques e Ferreira Material de Construção Ltda",
  slogan: "Aqui você encontra o que precisa, é bem atendido e sai feliz.",
  tagline:
    "Casa de material de construção na Rua das Esmeraldas, em Atibaia: atendimento de verdade, o item certo para a obra e a paz de resolver tudo no mesmo lugar.",
  instagram: "https://www.instagram.com/irmaosnasc_26",
  instagramHandle: "@irmaosnasc_26",
  logo: "/images/logo-irmaos-nascimento.png",
  email: "alonsomarques1@gmail.com",
  whatsapp: {
    e164: "5511975004168",
    display: "(11) 97500-4168",
  },
  hours: [
    { days: "Segunda a sábado", time: "07h30 às 17h30" },
    { days: "Domingo", time: "07h30 às 12h" },
    { days: "Feriados", time: "07h30 às 12h" },
  ],
  /** Texto pronto para Mensagem de ausência no WhatsApp Business. */
  awayAutoReply: [
    "Olá! Obrigado por falar com a *Irmãos Nascimento*.",
    "",
    "No momento estamos *fora do horário de atendimento*.",
    "",
    "Nosso horário de funcionamento:",
    "• Segunda a sábado: 07h30 às 17h30",
    "• Domingo: 07h30 às 12h",
    "• Feriados: 07h30 às 12h",
    "",
    "Deixe sua mensagem com nome, o que precisa e a cidade da obra.",
    "Assim que a loja abrir, retornamos por aqui.",
  ].join("\n"),
  hoursSummary:
    "Segunda a sábado: 07h30 às 17h30 · Domingo: 07h30 às 12h · Feriados: 07h30 às 12h",
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

const OPEN_MINUTES = 7 * 60 + 30;
const NOON_MINUTES = 12 * 60;
const WEEKDAY_CLOSE_MINUTES = 17 * 60 + 30;

/** Feriados nacionais e de SP (mês-dia). */
const FIXED_HOLIDAYS_MMDD = [
  "01-01", // Confraternização Universal
  "04-21", // Tiradentes
  "05-01", // Dia do Trabalho
  "07-09", // Revolução Constitucionalista (SP)
  "09-07", // Independência
  "10-12", // Nossa Senhora Aparecida
  "11-02", // Finados
  "11-15", // Proclamação da República
  "11-20", // Consciência Negra
  "12-25", // Natal
] as const;

/** Feriados municipais de Bragança Paulista (e região — confirme anualmente na prefeitura). */
const BRAGANCA_HOLIDAYS_MMDD = [
  "12-18", // Aniversário de Bragança Paulista
] as const;

/** Cache por ano civil para não recalcular Páscoa a cada clique. */
const holidayCache = new Map<number, Set<string>>();

/** Páscoa (algoritmo de Meeus) — base de Carnaval, Sexta Santa e Corpus Christi. */
function easterDate(year: number) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return { month, day };
}

function addDays(year: number, month: number, day: number, delta: number) {
  const dt = new Date(Date.UTC(year, month - 1, day + delta));
  return {
    year: dt.getUTCFullYear(),
    month: dt.getUTCMonth() + 1,
    day: dt.getUTCDate(),
  };
}

function ymdKey(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function holidaySetForYear(year: number) {
  const cached = holidayCache.get(year);
  if (cached) return cached;

  const set = new Set<string>();
  for (const mmdd of [...FIXED_HOLIDAYS_MMDD, ...BRAGANCA_HOLIDAYS_MMDD]) {
    set.add(`${year}-${mmdd}`);
  }

  const easter = easterDate(year);
  const carnivalMon = addDays(year, easter.month, easter.day, -48);
  const carnivalTue = addDays(year, easter.month, easter.day, -47);
  const goodFriday = addDays(year, easter.month, easter.day, -2);
  const corpusChristi = addDays(year, easter.month, easter.day, 60);

  for (const d of [carnivalMon, carnivalTue, goodFriday, corpusChristi]) {
    set.add(ymdKey(d.year, d.month, d.day));
  }

  holidayCache.set(year, set);
  return set;
}

function saoPauloDateKey(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return {
    year: Number(get("year")),
    key: `${get("year")}-${get("month")}-${get("day")}`,
  };
}

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

/** Feriados nacionais, de SP e principais de Bragança Paulista (timezone SP). */
export function isHoliday(date = new Date()) {
  const { year, key } = saoPauloDateKey(date);
  return holidaySetForYear(year).has(key);
}

/**
 * Aberto: seg–sáb 07h30–17h30; domingo e feriados 07h30–12h.
 * Feriados: nacionais, SP (9/jul) e aniversário de Bragança (18/dez), mais móveis via Páscoa.
 */
export function isOpenNow(date = new Date()) {
  const { weekday, minutes } = getSaoPauloNow(date);
  if (isHoliday(date) || weekday === 0) {
    return minutes >= OPEN_MINUTES && minutes < NOON_MINUTES;
  }
  return minutes >= OPEN_MINUTES && minutes < WEEKDAY_CLOSE_MINUTES;
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
