import { NAV_ITEMS } from "../../constants";
import { formatCurrency, toNumber } from "../../utils/finance";

export default function Sidebar({
  activeView,
  onNavigate,
  ganhos,
  gastos,
  cartoes,
  apiStatus
}) {
  const totalGanhos = ganhos.reduce((total, item) => total + toNumber(item.valor), 0);
  const totalGastos = gastos.reduce((total, item) => total + toNumber(item.valor), 0);
  const saldo = totalGanhos - totalGastos;

  return (
    <aside className="w-full shrink-0 lg:sticky lg:top-6 lg:w-[18.75rem] lg:self-start">
      <div className="sidebar-shell flex flex-col gap-6 rounded-[2rem] p-5 lg:p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="status-pill bg-[color:var(--surface-soft)] text-[color:var(--muted)]">Finance</span>
            <span
              className={`status-pill ${
                apiStatus === "online"
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                  : apiStatus === "offline"
                    ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                    : "bg-[color:var(--surface-soft)] text-[color:var(--muted)] ring-1 ring-[color:var(--line)]"
              }`}
            >
              {apiStatus === "online" ? "API online" : apiStatus === "offline" ? "API offline" : "API pendente"}
            </span>
          </div>

          <div className="brand-panel rounded-[1.6rem] p-5">
            <h1 className="text-2xl leading-tight">Painel financeiro</h1>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Navegacao simples, indicadores claros e separacao melhor entre cada area da aplicacao.
            </p>
          </div>
        </div>

        <nav className="grid gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeView;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`group rounded-[1.35rem] px-4 py-3 text-left transition ${
                  isActive
                    ? "bg-[color:var(--accent-soft)] text-[color:var(--ink)] ring-1 ring-[color:var(--line)]"
                    : "bg-[color:var(--surface-soft)]/75 text-[color:var(--ink)] hover:bg-[color:var(--surface-soft)]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p
                      className={`text-[0.68rem] font-semibold uppercase tracking-[0.28em] ${
                        isActive ? "text-[color:var(--accent-strong)]/78" : "text-[color:var(--muted)]"
                      }`}
                    >
                      {item.eyebrow}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{item.label}</p>
                  </div>
                  <span
                    className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-xs font-semibold ${
                      isActive
                        ? "bg-[color:var(--accent-soft)] text-[color:var(--accent-strong)]"
                        : "bg-white text-[color:var(--muted)] ring-1 ring-[color:var(--line)]"
                    }`}
                  >
                    {String(item.label).slice(0, 1)}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="soft-panel rounded-[1.4rem] px-4 py-4">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[color:var(--muted)]">{label}</p>
      <p className="mt-2 text-lg font-semibold text-[color:var(--ink)]">{value}</p>
    </div>
  );
}
