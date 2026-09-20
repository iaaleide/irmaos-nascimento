export const business = {
  name: "Irmãos Nascimento",
  legalName: "Nascimento Marques e Ferreira Material de Construção Ltda",
  slogan: "Aqui você encontra o que precisa, é bem atendido e sai feliz.",
  tagline:
    "Casa de material de construção na Rua das Esmeraldas, em Atibaia: atendimento de verdade, o item certo para a obra e a paz de resolver tudo no mesmo lugar.",
  foundedOn: "2023-10-09",
  foundedYear: 2023,
  instagram: "https://www.instagram.com/irmaosnascimento2023",
  instagramHandle: "@irmaosnascimento2023",
  email: "alonsomarques1@gmail.com",
  whatsapp: {
    e164: "5511975004168",
    display: "(11) 97500-4168",
    national: "11975004168",
  },
  owners: ["Alonso do Nascimento Marques", "Aline dos Santos Ferreira"],
  hours: [
    { days: "Segunda a sábado", time: "07h às 18h" },
    { days: "Domingo", time: "07h às 12h" },
    { days: "Feriados", time: "Fechado" },
  ],
  hoursNote:
    "Horário publicado da empresa. Confirme o atendimento da loja da Rua das Esmeraldas no WhatsApp antes de sair de casa.",
  stores: {
    braganca: {
      id: "braganca",
      title: "Bragança Paulista",
      role: "Filial",
      highlight: false,
      street: "Rua Oswaldo Russomano, 380",
      neighborhood: "Parque dos Estados",
      city: "Bragança Paulista",
      state: "SP",
      cep: "12922-150",
      cnpj: "52.474.273/0002-52",
      openedOn: "2025-05-15",
      lat: -22.915232,
      lng: -46.5541735,
      mapQuery: "Rua Oswaldo Russomano, 380, Parque dos Estados, Bragança Paulista, SP",
    },
    atibaia: {
      id: "atibaia",
      title: "Atibaia",
      role: "Loja",
      highlight: true,
      street: "Rua das Esmeraldas, 2260",
      neighborhood: "Chácaras Fernão Dias",
      city: "Atibaia",
      state: "SP",
      cep: "12954-637",
      cnpj: "52.474.273/0001-71",
      openedOn: "2023-10-09",
      lat: -23.0280555,
      lng: -46.5367736,
      mapQuery: "Rua das Esmeraldas, 2260, Chácaras Fernão Dias, Atibaia, SP",
    },
  },
} as const;

export type StoreId = keyof typeof business.stores;
export type Store = (typeof business.stores)[StoreId];

export function storeAddress(store: Store) {
  return `${store.street} — ${store.neighborhood}, ${store.city}/${store.state}, CEP ${store.cep}`;
}

export const categories = [
  {
    slug: "construcao",
    title: "Materiais de construção",
    summary: "Cimento, areia, brita, cal, bloco, tijolo e telha para alicerce e alvenaria.",
    tone: "from-[#0b1f3a] to-[#1e4d8c]",
    image: "/images/concreto.jpg",
    items: [
      "Cimento",
      "Areia",
      "Brita",
      "Cal",
      "Bloco de concreto",
      "Tijolo",
      "Telha",
      "Argamassa",
    ],
  },
  {
    slug: "eletrico",
    title: "Material elétrico",
    summary: "Fios, cabos, disjuntores, tomadas e o básico para a instalação da obra.",
    tone: "from-[#14345c] to-[#f5c400]",
    image: "/images/eletrico.jpg",
    items: [
      "Fios e cabos",
      "Disjuntores",
      "Tomadas e interruptores",
      "Eletrodutos",
      "Caixas de passagem",
      "Fita isolante",
    ],
  },
  {
    slug: "ferragens",
    title: "Ferragens e ferramentas",
    summary: "Parafusos, fechaduras, dobradiças e ferramentas de uso diário no canteiro.",
    tone: "from-[#0b1f3a] to-[#2457a6]",
    image: "/images/ferramentas.jpg",
    items: [
      "Parafusos e pregos",
      "Fechaduras",
      "Dobradiças",
      "Ferramentas manuais",
      "Brocas",
      "Equipamentos de uso geral",
    ],
  },
  {
    slug: "entrega",
    title: "Entrega na obra",
    summary: "Transporte de carga municipal e intermunicipal para deixar o material no endereço.",
    tone: "from-[#14345c] to-[#0b1f3a]",
    image: "/images/entrega.jpg",
    items: [
      "Entrega em Bragança Paulista",
      "Entrega em Atibaia e região",
      "Carga para obra",
      "Combinar horário no WhatsApp",
    ],
  },
  {
    slug: "agua",
    title: "Caminhão pipa",
    summary: "Distribuição de água por caminhão, cadastrada na matriz da empresa.",
    tone: "from-[#164e73] to-[#0b1f3a]",
    image: "/images/obra.jpg",
    items: ["Água para obra", "Abastecimento sob consulta", "Agendamento pelo WhatsApp"],
  },
] as const;

export const products = [
  {
    name: "Cimento",
    category: "Materiais de construção",
    detail: "Para contrapiso, laje, reboco e estrutural. Informe a quantidade de sacos.",
    image: "/images/concreto.jpg",
  },
  {
    name: "Areia",
    category: "Materiais de construção",
    detail: "Areia para massa, contrapiso e concreto. Combinamos o volume na conversa.",
    image: "/images/obra.jpg",
  },
  {
    name: "Brita",
    category: "Materiais de construção",
    detail: "Brita para concreto e base. Diga o tipo e o metro cúbico que precisa.",
    image: "/images/concreto.jpg",
  },
  {
    name: "Cal hidratada",
    category: "Materiais de construção",
    detail: "Para argamassa e pintura. Peça o valor atualizado no WhatsApp.",
    image: "/images/reforma.jpg",
  },
  {
    name: "Bloco de concreto",
    category: "Materiais de construção",
    detail: "Blocos para alvenaria. Informe medida e quantidade de peças.",
    image: "/images/tijolo.jpg",
  },
  {
    name: "Tijolo",
    category: "Materiais de construção",
    detail: "Tijolo para vedação. Envie a metragem da parede que estamos orçando.",
    image: "/images/tijolo.jpg",
  },
  {
    name: "Telha",
    category: "Materiais de construção",
    detail: "Telhas para cobertura. Diga o modelo e a área do telhado.",
    image: "/images/madeira.jpg",
  },
  {
    name: "Argamassa",
    category: "Materiais de construção",
    detail: "Argamassa para assentar e rebocar. Informe o uso para indicar o tipo.",
    image: "/images/concreto.jpg",
  },
  {
    name: "Fios e cabos",
    category: "Material elétrico",
    detail: "Cabos para instalação residencial e de obra. Informe bitola e metragem.",
    image: "/images/eletrico.jpg",
  },
  {
    name: "Disjuntores",
    category: "Material elétrico",
    detail: "Disjuntores e proteção do quadro. Envie a amperagem se já souber.",
    image: "/images/eletrico.jpg",
  },
  {
    name: "Tomadas e interruptores",
    category: "Material elétrico",
    detail: "Linha básica para conclusão da instalação elétrica.",
    image: "/images/eletrico.jpg",
  },
  {
    name: "Eletrodutos e conexões",
    category: "Material elétrico",
    detail: "Tubos, curvas e caixas para passar a fiação com segurança.",
    image: "/images/eletrico.jpg",
  },
  {
    name: "Parafusos, pregos e buchas",
    category: "Ferragens e ferramentas",
    detail: "Kit de fixação para madeira, alvenaria e estrutura metálica.",
    image: "/images/ferramentas.jpg",
  },
  {
    name: "Fechaduras e dobradiças",
    category: "Ferragens e ferramentas",
    detail: "Ferragens para porta, portão e esquadria. Envie foto se quiser equivalente.",
    image: "/images/ferramentas.jpg",
  },
  {
    name: "Ferramentas manuais",
    category: "Ferragens e ferramentas",
    detail: "Colher de pedreiro, nível, trena, martelo e o básico do pedreiro.",
    image: "/images/ferramentas.jpg",
  },
  {
    name: "Entrega na obra",
    category: "Entrega",
    detail: "Combinamos o endereço, o volume e o melhor horário pelo WhatsApp.",
    image: "/images/entrega.jpg",
  },
  {
    name: "Caminhão pipa",
    category: "Água",
    detail: "Água para obra sob consulta. Diga o endereço e a quantidade.",
    image: "/images/obra.jpg",
  },
] as const;

export const gallery = [
  { src: "/images/hero.jpg", alt: "Canteiro de obra em andamento" },
  { src: "/images/concreto.jpg", alt: "Concreto e material estrutural" },
  { src: "/images/tijolo.jpg", alt: "Alvenaria e tijolo" },
  { src: "/images/ferramentas.jpg", alt: "Ferramentas de canteiro" },
  { src: "/images/eletrico.jpg", alt: "Material elétrico" },
  { src: "/images/entrega.jpg", alt: "Entrega de material" },
  { src: "/images/madeira.jpg", alt: "Madeira para obra" },
  { src: "/images/reforma.jpg", alt: "Reforma residencial" },
  { src: "/images/balcao.jpg", alt: "Atendimento na casa" },
] as const;
