import { useEffect, useMemo, useState, type FormEvent } from "react";
import { business } from "./data";
import {
  adminLogin,
  fetchConfig,
  fetchStats,
  getAdminToken,
  labelForSegment,
  resetStats,
  saveConfig,
  setAdminToken,
} from "./analytics";

type Stats = {
  visits: number;
  visitsToday: number;
  whatsappTotal: number;
  whatsappToday: number;
  whatsappBySegment: Record<string, number>;
  visitsByDay: Record<string, number>;
  updatedAt: string | null;
  ephemeral?: boolean;
  localOnly?: boolean;
};

export default function Admin() {
  const [token, setToken] = useState<string | null>(() => getAdminToken());
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [slogan, setSlogan] = useState<string>(business.slogan);
  const [tagline, setTagline] = useState<string>(business.tagline);
  const [whatsappDisplay, setWhatsappDisplay] = useState<string>(business.whatsapp.display);
  const [hoursSummary, setHoursSummary] = useState<string>(business.hoursSummary);
  const [savedMsg, setSavedMsg] = useState("");

  async function loadStats() {
    setLoading(true);
    setError("");
    try {
      const data = await fetchStats();
      setStats(data);
    } catch (err) {
      setToken(null);
      setAdminToken(null);
      setError(err instanceof Error ? err.message : "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  }

  async function loadConfig() {
    try {
      const data = await fetchConfig();
      const cfg = data.config || {};
      if (cfg.slogan) setSlogan(cfg.slogan);
      if (cfg.tagline) setTagline(cfg.tagline);
      if (cfg.whatsappDisplay) setWhatsappDisplay(cfg.whatsappDisplay);
      if (cfg.hoursSummary) setHoursSummary(cfg.hoursSummary);
    } catch {
      // mantém defaults
    }
  }

  useEffect(() => {
    if (!token) return;
    void loadStats();
    void loadConfig();
    const id = window.setInterval(() => void loadStats(), 15000);
    return () => window.clearInterval(id);
  }, [token]);

  const segmentRows = useMemo(() => {
    if (!stats) return [];
    return Object.entries(stats.whatsappBySegment)
      .map(([segment, count]) => ({ segment, count, label: labelForSegment(segment) }))
      .sort((a, b) => b.count - a.count);
  }, [stats]);

  const dayRows = useMemo(() => {
    if (!stats) return [];
    return Object.entries(stats.visitsByDay)
      .map(([day, count]) => ({ day, count }))
      .sort((a, b) => (a.day < b.day ? 1 : -1))
      .slice(0, 14);
  }, [stats]);

  async function onLogin(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const next = await adminLogin(password);
      setToken(next);
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Senha incorreta");
    } finally {
      setLoading(false);
    }
  }

  async function onReset() {
    if (!window.confirm("Zerar todos os contadores? Isso não apaga o conteúdo do site.")) return;
    setLoading(true);
    try {
      const data = await resetStats();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao zerar");
    } finally {
      setLoading(false);
    }
  }

  async function onSaveConfig(event: FormEvent) {
    event.preventDefault();
    setSavedMsg("");
    setError("");
    try {
      const result = await saveConfig({
        slogan,
        tagline,
        whatsappDisplay,
        hoursSummary,
      });
      if (result?.config?.skipped || result?.config?.localOnly) {
        setSavedMsg("Na Vercel o salvamento ainda não grava. Use o admin no ambiente local (npm start).");
      } else {
        setSavedMsg("Alterações salvas em .data/analytics.json. O site local já pode usar esses textos.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    }
  }

  if (!token) {
    return (
      <div className="min-h-svh bg-[#f6f4ef] text-stone-900">
        <div className="mx-auto flex min-h-svh max-w-md flex-col justify-center px-4 py-10">
          <p className="w-fit bg-signal px-2 py-1 text-xs font-semibold tracking-[0.18em] text-navy uppercase">
            Administração
          </p>
          <h1 className="mt-3 font-heading text-3xl tracking-wide text-navy uppercase">
            Irmãos Nascimento
          </h1>
          <p className="mt-2 text-sm text-stone-600">Entre para ver visitas, WhatsApp por seção e editar textos.</p>
          <form onSubmit={onLogin} className="mt-8 grid gap-4 border border-stone-200 bg-white p-6">
            <label className="grid gap-1 text-sm font-medium text-navy">
              Senha
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-stone-300 px-3 py-2 text-base font-normal outline-none focus:border-navy"
                autoComplete="current-password"
                required
              />
            </label>
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="bg-navy px-5 py-3 text-sm font-semibold tracking-wide text-white uppercase hover:bg-navy-mid disabled:opacity-60"
            >
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </form>
          <a href="/" className="mt-6 text-sm font-semibold text-navy underline underline-offset-4">
            Voltar ao site
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-[#f6f4ef] text-stone-900">
      <header className="border-b border-white/10 bg-navy text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs tracking-[0.18em] text-signal uppercase">Admin</p>
            <h1 className="font-heading text-2xl tracking-wide uppercase">Painel Irmãos Nascimento</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/" className="border border-white/30 px-4 py-2 text-sm font-semibold uppercase hover:bg-white/10">
              Ver site
            </a>
            <button
              type="button"
              onClick={() => {
                setAdminToken(null);
                setToken(null);
              }}
              className="bg-signal px-4 py-2 text-sm font-semibold text-navy uppercase"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6">
        {stats?.localOnly || stats?.ephemeral ? (
          <p className="border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            Contadores e alterações ficam salvos <strong>só no ambiente local</strong> (
            <code>.data/analytics.json</code>). Na Vercel ainda não há banco — quando migrarmos o site com
            banco de dados, ligamos o contador permanente.
          </p>
        ) : (
          <p className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-950">
            Dados salvos localmente em <code>.data/analytics.json</code>.
          </p>
        )}

        {error ? <p className="text-sm text-red-700">{error}</p> : null}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Visitas totais", value: stats?.visits ?? "—" },
            { label: "Visitas hoje", value: stats?.visitsToday ?? "—" },
            { label: "WhatsApp total", value: stats?.whatsappTotal ?? "—" },
            { label: "WhatsApp hoje", value: stats?.whatsappToday ?? "—" },
          ].map((card) => (
            <article key={card.label} className="border border-stone-200 bg-white p-5">
              <p className="text-xs font-semibold tracking-[0.16em] text-stone-500 uppercase">{card.label}</p>
              <p className="mt-2 font-heading text-4xl text-navy">{card.value}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="border border-stone-200 bg-white p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-heading text-xl tracking-wide text-navy uppercase">WhatsApp por seção</h2>
              <button
                type="button"
                onClick={() => void loadStats()}
                className="text-sm font-semibold text-navy underline underline-offset-4"
              >
                Atualizar
              </button>
            </div>
            {segmentRows.length === 0 ? (
              <p className="mt-4 text-sm text-stone-600">Ainda não há cliques registrados.</p>
            ) : (
              <ul className="mt-4 divide-y divide-stone-100">
                {segmentRows.map((row) => (
                  <li key={row.segment} className="flex items-center justify-between gap-3 py-3 text-sm">
                    <span className="text-stone-700">{row.label}</span>
                    <strong className="text-navy">{row.count}</strong>
                  </li>
                ))}
              </ul>
            )}
          </article>

          <article className="border border-stone-200 bg-white p-6">
            <h2 className="font-heading text-xl tracking-wide text-navy uppercase">Visitas por dia</h2>
            {dayRows.length === 0 ? (
              <p className="mt-4 text-sm text-stone-600">Sem visitas ainda.</p>
            ) : (
              <ul className="mt-4 divide-y divide-stone-100">
                {dayRows.map((row) => (
                  <li key={row.day} className="flex items-center justify-between gap-3 py-3 text-sm">
                    <span className="text-stone-700">{row.day}</span>
                    <strong className="text-navy">{row.count}</strong>
                  </li>
                ))}
              </ul>
            )}
            <button
              type="button"
              onClick={() => void onReset()}
              className="mt-6 border border-red-300 px-4 py-2 text-sm font-semibold text-red-800 uppercase hover:bg-red-50"
            >
              Zerar contadores
            </button>
          </article>
        </section>

        <section className="border border-stone-200 bg-white p-6">
          <h2 className="font-heading text-xl tracking-wide text-navy uppercase">Alterar textos do site</h2>
          <p className="mt-2 text-sm text-stone-600">
            Mudanças entram no ar para quem abrir o site depois de salvar. Horário detalhado e feriados continuam em{" "}
            <code>src/data.ts</code> no código.
          </p>
          <form onSubmit={onSaveConfig} className="mt-6 grid gap-4">
            <label className="grid gap-1 text-sm font-medium text-navy">
              Slogan
              <input
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                className="border border-stone-300 px-3 py-2 font-normal outline-none focus:border-navy"
              />
            </label>
            <label className="grid gap-1 text-sm font-medium text-navy">
              Texto de apoio
              <textarea
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                rows={3}
                className="border border-stone-300 px-3 py-2 font-normal outline-none focus:border-navy"
              />
            </label>
            <label className="grid gap-1 text-sm font-medium text-navy">
              WhatsApp (exibição)
              <input
                value={whatsappDisplay}
                onChange={(e) => setWhatsappDisplay(e.target.value)}
                className="border border-stone-300 px-3 py-2 font-normal outline-none focus:border-navy"
              />
            </label>
            <label className="grid gap-1 text-sm font-medium text-navy">
              Resumo do horário
              <input
                value={hoursSummary}
                onChange={(e) => setHoursSummary(e.target.value)}
                className="border border-stone-300 px-3 py-2 font-normal outline-none focus:border-navy"
              />
            </label>
            {savedMsg ? <p className="text-sm text-emerald-800">{savedMsg}</p> : null}
            <button
              type="submit"
              className="w-fit bg-signal px-5 py-3 text-sm font-semibold tracking-wide text-navy uppercase hover:brightness-95"
            >
              Salvar alterações
            </button>
          </form>
        </section>

        <p className="text-xs text-stone-500">
          Última atualização dos contadores: {stats?.updatedAt ? new Date(stats.updatedAt).toLocaleString("pt-BR") : "—"}
          {loading ? " · atualizando…" : ""}
        </p>
      </main>
    </div>
  );
}
