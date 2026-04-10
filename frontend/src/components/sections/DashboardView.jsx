import { useEffect, useState } from "react";
import { DASHBOARD_MODES } from "../../constants";
import {
  formatCurrency,
  formatDate,
  formatMonthLabel,
  isDateInRange,
  labelFor,
  percentage,
  resolveDashboardRange,
  sortByDateDesc,
  sumValues,
  toNumber
} from "../../utils/finance";

function currentMonthValue() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export default function DashboardView({ ganhos, gastos, cartoes }) {
  const [mode, setMode] = useState("month");
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    month: currentMonthValue(),
    invoiceMonth: currentMonthValue(),
    cardId: ""
  });

  useEffect(() => {
    if (!filters.cardId && cartoes[0]?.id) {
      setFilters((current) => ({ ...current, cardId: String(cartoes[0].id) }));
    }
  }, [cartoes, filters.cardId]);

  const range = resolveDashboardRange(mode, filters, cartoes);
  const filteredGanhos = range ? ganhos.filter((item) => isDateInRange(item.data, range)) : ganhos;
  let filteredGastos = range ? gastos.filter((item) => isDateInRange(item.data, range)) : gastos;

  if (mode === "invoice" && range?.card) {
    filteredGastos = filteredGastos.filter(
      (item) => item.cartao && String(item.cartao.id) === String(range.card.id)
    );
  }

  const totalGanhos = sumValues(filteredGanhos, (item) => item.valor);
  const totalGastos = sumValues(filteredGastos, (item) => item.valor);
  const saldo = totalGanhos - totalGastos;

  const movements = sortByDateDesc(
    [
      ...filteredGanhos.map((item) => ({ ...item, movementType: "ganho" })),
      ...filteredGastos.map((item) => ({ ...item, movementType: "gasto" }))
    ],
    (item) => item.data
  ).slice(0, 7);

  const groupedTypes = Object.entries(
    filteredGastos.reduce((accumulator, item) => {
      const key = item.tipoGasto ?? "OUTRO";
      accumulator[key] = (accumulator[key] ?? 0) + toNumber(item.valor);
      return accumulator;
    }, {})
  )
    .map(([key, value]) => ({ key, value }))
    .sort((first, second) => second.value - first.value)
    .slice(0, 5);

  const spotlightExpenses = sortByDateDesc(filteredGastos, (item) => item.data).slice(0, 6);

  return (
    <section className="grid gap-6">
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <div className="panel-surface rounded-[2rem] px-6 py-6 shadow-[var(--shadow)] sm:px-8 sm:py-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <p className="section-eyebrow">Dashboard</p>
                <h2 className="mt-3 text-3xl leading-tight text-[color:var(--ink)] sm:text-4xl">
                  Leitura clara do caixa e das faturas.
                </h2>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                  Alterne entre periodo livre, mes fechado ou ciclo de cartao para entender melhor o que entrou,
                  o que saiu e onde a conta apertou.
                </p>
              </div>

              <div className="accent-panel min-w-[14rem] rounded-[1.4rem] px-5 py-4 lg:max-w-[16rem]">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[color:var(--accent-strong)]/72">
                  Saldo do recorte
                </p>
                <p className="mt-2 text-3xl font-semibold text-[color:var(--ink)]">{formatCurrency(saldo)}</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  {saldo >= 0 ? "Periodo respirando bem." : "Periodo pedindo ajuste."}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {DASHBOARD_MODES.map((item) => {
                const isActive = item.value === mode;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setMode(item.value)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive ? "bg-[color:var(--ink)] text-white" : "secondary-button"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <StatPanel label="Ganhos" value={formatCurrency(totalGanhos)} detail={`${filteredGanhos.length} entradas`} />
              <StatPanel label="Gastos" value={formatCurrency(totalGastos)} detail={`${filteredGastos.length} saidas`} />
              <StatPanel
                label="Recorte"
                value={mode === "invoice" && range?.card ? range.card.nome : range?.label ?? "Completo"}
                detail={
                  range?.start || range?.end
                    ? `${range?.start ? formatDate(range.start) : "Sem inicio"} ate ${
                        range?.end ? formatDate(range.end) : "sem fim"
                      }`
                    : "Sem filtro aplicado"
                }
              />
            </div>
          </div>
        </div>

        <div className="panel-surface rounded-[2rem] px-6 py-6 shadow-[var(--shadow)] sm:px-7 sm:py-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-eyebrow">Filtro</p>
              <h3 className="mt-3 text-2xl text-[color:var(--ink)]">Defina o recorte</h3>
            </div>
            <span className="status-pill bg-[color:var(--accent-soft)] text-[color:var(--accent-strong)]">
              {range?.label ?? "Historico"}
            </span>
          </div>

          <div className="mt-6 grid gap-4">
            {mode === "custom" ? (
              <>
                <Field label="Data inicial">
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(event) => setFilters((current) => ({ ...current, startDate: event.target.value }))}
                    className="filter-input"
                  />
                </Field>
                <Field label="Data final">
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(event) => setFilters((current) => ({ ...current, endDate: event.target.value }))}
                    className="filter-input"
                  />
                </Field>
              </>
            ) : null}

            {mode === "month" ? (
              <Field label="Mes desejado">
                <input
                  type="month"
                  value={filters.month}
                  onChange={(event) => setFilters((current) => ({ ...current, month: event.target.value }))}
                  className="filter-input"
                />
              </Field>
            ) : null}

            {mode === "invoice" ? (
              <>
                <Field label="Cartao">
                  <select
                    value={filters.cardId}
                    onChange={(event) => setFilters((current) => ({ ...current, cardId: event.target.value }))}
                    className="filter-input"
                  >
                    <option value="">Selecione um cartao</option>
                    {cartoes.map((cartao) => (
                      <option key={cartao.id} value={cartao.id}>
                        {cartao.nome}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Mes da fatura">
                  <input
                    type="month"
                    value={filters.invoiceMonth}
                    onChange={(event) =>
                      setFilters((current) => ({ ...current, invoiceMonth: event.target.value }))
                    }
                    className="filter-input"
                  />
                </Field>
              </>
            ) : null}

            <div className="rounded-[1.35rem] border border-dashed border-[color:var(--line)] bg-[color:var(--surface-soft)] px-4 py-4">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[color:var(--muted)]">
                Observacao
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                Na leitura por fatura, o painel isola apenas compras do cartao escolhido dentro do ciclo salvo.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="panel-surface rounded-[2rem] px-6 py-6 shadow-[var(--shadow)] sm:px-7 sm:py-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-eyebrow">Categorias</p>
              <h3 className="mt-3 text-2xl text-[color:var(--ink)]">Distribuicao dos gastos</h3>
            </div>
            <span className="status-pill bg-[color:var(--surface-soft)] text-[color:var(--muted)]">
              {filteredGastos.length} itens
            </span>
          </div>

          <div className="mt-6 grid gap-4">
            {groupedTypes.length ? (
              groupedTypes.map((item) => (
                <ProgressRow
                  key={item.key}
                  label={labelFor(item.key)}
                  value={item.value}
                  total={totalGastos}
                />
              ))
            ) : (
              <EmptyDashState message="Nao ha gastos nesse recorte." />
            )}
          </div>
        </div>

        <div className="panel-surface rounded-[2rem] px-6 py-6 shadow-[var(--shadow)] sm:px-7 sm:py-7">
          <div>
            <p className="section-eyebrow">Movimentacoes</p>
            <h3 className="mt-3 text-2xl text-[color:var(--ink)]">Ultimos lancamentos</h3>
          </div>

          <div className="mt-6 grid gap-3">
            {movements.length ? (
              movements.map((item) => (
                <div
                  key={`${item.movementType}-${item.id}`}
                  className="soft-panel flex flex-col gap-3 rounded-[1.25rem] px-4 py-4 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[color:var(--ink)]">{item.nome}</p>
                    <p className="mt-1 text-sm text-[color:var(--muted)]">
                      {item.movementType === "gasto" ? labelFor(item.tipoGasto) : "Ganho"} · {formatDate(item.data)}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm font-semibold text-[color:var(--ink)]">
                      {item.movementType === "gasto" ? "-" : "+"}
                      {formatCurrency(item.valor)}
                    </p>
                    <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                      {item.movementType === "gasto" ? "Saida" : "Entrada"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <EmptyDashState message="Sem movimentacoes para mostrar." />
            )}
          </div>
        </div>
      </div>

      <div className="panel-surface rounded-[2rem] px-6 py-6 shadow-[var(--shadow)] sm:px-7 sm:py-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-eyebrow">{mode === "invoice" ? "Fatura" : "Saidas em destaque"}</p>
            <h3 className="mt-3 text-2xl text-[color:var(--ink)]">
              {mode === "invoice" ? "Compras do ciclo selecionado" : "Despesas mais recentes do recorte"}
            </h3>
          </div>
          {range?.dueDate ? (
            <span className="status-pill bg-[color:var(--accent-soft)] text-[color:var(--accent-strong)]">
              Vencimento {formatDate(range.dueDate)}
            </span>
          ) : null}
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {spotlightExpenses.length ? (
            spotlightExpenses.map((item) => (
              <div key={item.id} className="soft-panel rounded-[1.3rem] px-4 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[color:var(--ink)]">{item.nome}</p>
                    <p className="mt-1 text-sm text-[color:var(--muted)]">{labelFor(item.tipoGasto)}</p>
                  </div>
                  <span className="text-sm font-semibold text-[color:var(--ink)]">{formatCurrency(item.valor)}</span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  <span>{formatDate(item.data)}</span>
                  {item.cartao?.nome ? <span>{item.cartao.nome}</span> : null}
                  <span>{labelFor(item.metodoPagamento)}</span>
                </div>
              </div>
            ))
          ) : (
            <EmptyDashState message="Nenhum gasto encontrado para este filtro." />
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[color:var(--ink)]">
      <span>{label}</span>
      {children}
    </label>
  );
}

function StatPanel({ label, value, detail }) {
  return (
    <div className="soft-panel rounded-[1.35rem] px-4 py-4">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[color:var(--muted)]">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-[color:var(--ink)]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{detail}</p>
    </div>
  );
}

function ProgressRow({ label, value, total }) {
  return (
    <div className="soft-panel rounded-[1.3rem] px-4 py-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-[color:var(--ink)]">{label}</p>
        <p className="text-sm font-semibold text-[color:var(--ink)]">{formatCurrency(value)}</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[color:var(--surface-soft)]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent-strong),var(--accent))]"
          style={{ width: `${Math.max(percentage(value, total), 6)}%` }}
        />
      </div>
      <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
        {percentage(value, total)}% do recorte
      </p>
    </div>
  );
}

function EmptyDashState({ message }) {
  return (
    <div className="rounded-[1.35rem] border border-dashed border-[color:var(--line)] bg-[color:var(--surface-soft)] px-5 py-10 text-sm text-[color:var(--muted)]">
      {message}
    </div>
  );
}
