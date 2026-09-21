const TOKEN_KEY = "irmaos_admin_token";
const VISIT_KEY = "irmaos_visit_session";

async function postJson(url: string, body: unknown, token?: string | null) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    keepalive: true,
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `Erro ${response.status}`);
  }
  return response.json();
}

export async function trackVisit() {
  // Contadores só no ambiente local até migrar com banco de dados
  if (typeof window !== "undefined" && /\.vercel\.app$/i.test(window.location.hostname)) return;
  try {
    if (sessionStorage.getItem(VISIT_KEY)) return;
    sessionStorage.setItem(VISIT_KEY, "1");
    await postJson("/api/track", { type: "visit" });
  } catch {
    // silencioso — analytics não pode quebrar o site
  }
}

export async function trackWhatsApp(segment: string) {
  if (typeof window !== "undefined" && /\.vercel\.app$/i.test(window.location.hostname)) return;
  try {
    await postJson("/api/track", { type: "whatsapp", segment });
  } catch {
    // silencioso
  }
}

export function getAdminToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string | null) {
  if (!token) sessionStorage.removeItem(TOKEN_KEY);
  else sessionStorage.setItem(TOKEN_KEY, token);
}

export async function adminLogin(password: string) {
  const data = await postJson("/api/login", { password });
  setAdminToken(data.token);
  return data.token as string;
}

export async function fetchStats() {
  const token = getAdminToken();
  const response = await fetch("/api/stats", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (response.status === 401) {
    setAdminToken(null);
    throw new Error("Sessão expirada");
  }
  if (!response.ok) throw new Error("Não foi possível carregar as estatísticas");
  return response.json();
}

export async function resetStats() {
  const token = getAdminToken();
  return postJson("/api/stats-reset", {}, token);
}

export async function fetchConfig() {
  const response = await fetch("/api/config");
  if (!response.ok) return { config: {} };
  return response.json();
}

export async function saveConfig(config: Record<string, unknown>) {
  const token = getAdminToken();
  const response = await fetch("/api/config", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ config }),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Erro ao salvar");
  }
  return response.json();
}

export const segmentLabels: Record<string, string> = {
  hero_cta: "Banner — Peça o Orçamento",
  nav_desktop: "Menu desktop",
  nav_mobile: "Menu celular",
  floating: "Botão flutuante WhatsApp",
  footer: "Rodapé",
  quote_form: "Formulário de orçamento",
  category: "Categorias de produtos",
  product: "Produtos individuais",
  directions_atibaia: "Como chegar — Atibaia",
  directions_braganca: "Como chegar — Bragança",
};

export function labelForSegment(segment: string) {
  if (segmentLabels[segment]) return segmentLabels[segment];
  if (segment.startsWith("category:")) return `Categoria: ${segment.slice(9)}`;
  if (segment.startsWith("product:")) return `Produto: ${segment.slice(8)}`;
  return segment;
}
