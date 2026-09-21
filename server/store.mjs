import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = process.env.VERCEL
  ? path.join("/tmp", "irmaos-nascimento-data")
  : path.join(root, ".data");
const storePath = path.join(dataDir, "analytics.json");
const ephemeral = Boolean(process.env.VERCEL);

const DEFAULT_PASSWORD = "irmaos2026";

export const SEGMENTS = [
  { id: "hero_cta", label: "Banner — Peça o Orçamento" },
  { id: "nav_desktop", label: "Menu desktop" },
  { id: "nav_mobile", label: "Menu celular" },
  { id: "floating", label: "Botão flutuante WhatsApp" },
  { id: "footer", label: "Rodapé" },
  { id: "quote_form", label: "Formulário de orçamento" },
  { id: "category", label: "Categorias de produtos" },
  { id: "product", label: "Produtos individuais" },
  { id: "directions_atibaia", label: "Como chegar — Atibaia" },
  { id: "directions_braganca", label: "Como chegar — Bragança" },
];

function emptyStore() {
  return {
    visits: 0,
    visitsByDay: {},
    whatsapp: {},
    whatsappByDay: {},
    updatedAt: null,
    config: {
      slogan: null,
      tagline: null,
      whatsappDisplay: null,
      whatsappE164: null,
      hoursSummary: null,
      hours: null,
    },
  };
}

function ensureStore() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(storePath)) {
    fs.writeFileSync(storePath, JSON.stringify(emptyStore(), null, 2));
  }
}

function readStore() {
  ensureStore();
  try {
    const raw = JSON.parse(fs.readFileSync(storePath, "utf8"));
    return { ...emptyStore(), ...raw, config: { ...emptyStore().config, ...(raw.config || {}) } };
  } catch {
    return emptyStore();
  }
}

function writeStore(data) {
  ensureStore();
  data.updatedAt = new Date().toISOString();
  fs.writeFileSync(storePath, JSON.stringify(data, null, 2));
  return data;
}

function todayKey() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

export function issueToken(password) {
  const secret = process.env.ADMIN_SECRET || getAdminPassword();
  return crypto.createHmac("sha256", secret).update(`admin:${password}`).digest("hex");
}

export function isValidToken(token) {
  if (!token) return false;
  return token === issueToken(getAdminPassword());
}

export function login(password) {
  if (password !== getAdminPassword()) return null;
  return issueToken(password);
}

export function trackVisit() {
  const data = readStore();
  const day = todayKey();
  data.visits += 1;
  data.visitsByDay[day] = (data.visitsByDay[day] || 0) + 1;
  writeStore(data);
  return { visits: data.visits };
}

export function trackWhatsApp(segment) {
  const key = String(segment || "outros").slice(0, 80);
  const data = readStore();
  const day = todayKey();
  data.whatsapp[key] = (data.whatsapp[key] || 0) + 1;
  if (!data.whatsappByDay[day]) data.whatsappByDay[day] = {};
  data.whatsappByDay[day][key] = (data.whatsappByDay[day][key] || 0) + 1;
  writeStore(data);
  return { segment: key, count: data.whatsapp[key] };
}

export function getStats() {
  const data = readStore();
  const whatsappTotal = Object.values(data.whatsapp).reduce((sum, n) => sum + n, 0);
  const day = todayKey();
  return {
    visits: data.visits,
    visitsToday: data.visitsByDay[day] || 0,
    whatsappTotal,
    whatsappToday: Object.values(data.whatsappByDay[day] || {}).reduce((sum, n) => sum + n, 0),
    whatsappBySegment: data.whatsapp,
    visitsByDay: data.visitsByDay,
    whatsappByDay: data.whatsappByDay,
    updatedAt: data.updatedAt,
    segments: SEGMENTS,
    ephemeral,
  };
}

export function resetStats() {
  const data = readStore();
  data.visits = 0;
  data.visitsByDay = {};
  data.whatsapp = {};
  data.whatsappByDay = {};
  writeStore(data);
  return getStats();
}

export function getConfig() {
  return readStore().config;
}

export function saveConfig(partial) {
  const data = readStore();
  data.config = { ...data.config, ...partial };
  writeStore(data);
  return data.config;
}

export function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

export function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
  });
  res.end(payload);
}

export function getBearer(req) {
  const header = req.headers.authorization || req.headers.Authorization || "";
  const match = String(header).match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || "";
}

export async function handleApi(req, res, urlPath) {
  if (req.method === "OPTIONS") {
    return json(res, 204, {});
  }

  try {
    if (urlPath === "/api/track" && req.method === "POST") {
      const body = await readBody(req);
      if (body.type === "visit") {
        return json(res, 200, trackVisit());
      }
      if (body.type === "whatsapp") {
        return json(res, 200, trackWhatsApp(body.segment));
      }
      return json(res, 400, { error: "type inválido" });
    }

    if (urlPath === "/api/login" && req.method === "POST") {
      const body = await readBody(req);
      const token = login(String(body.password || ""));
      if (!token) return json(res, 401, { error: "Senha incorreta" });
      return json(res, 200, { token });
    }

    if (urlPath === "/api/stats" && req.method === "GET") {
      if (!isValidToken(getBearer(req))) return json(res, 401, { error: "Não autorizado" });
      return json(res, 200, getStats());
    }

    if (urlPath === "/api/stats/reset" && req.method === "POST") {
      if (!isValidToken(getBearer(req))) return json(res, 401, { error: "Não autorizado" });
      return json(res, 200, resetStats());
    }

    // Alias used by Vercel serverless filename api/stats-reset.js
    if (urlPath === "/api/stats-reset" && req.method === "POST") {
      if (!isValidToken(getBearer(req))) return json(res, 401, { error: "Não autorizado" });
      return json(res, 200, resetStats());
    }

    if (urlPath === "/api/config" && req.method === "GET") {
      return json(res, 200, { config: getConfig() });
    }

    if (urlPath === "/api/config" && req.method === "PUT") {
      if (!isValidToken(getBearer(req))) return json(res, 401, { error: "Não autorizado" });
      const body = await readBody(req);
      return json(res, 200, { config: saveConfig(body.config || body) });
    }

    return json(res, 404, { error: "Rota não encontrada" });
  } catch (error) {
    return json(res, 500, { error: error instanceof Error ? error.message : "Erro interno" });
  }
}
