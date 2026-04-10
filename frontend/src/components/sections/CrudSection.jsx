export default function CrudSection({
  eyebrow,
  title,
  description,
  actionLabel,
  onCreate,
  summary,
  columns,
  rows,
  renderActions,
  emptyTitle,
  emptyDescription
}) {
  return (
    <section className="panel-surface rounded-[2rem] px-5 py-6 text-[color:var(--ink)] shadow-[var(--shadow)] sm:px-7 sm:py-7">
      <div className="flex flex-col gap-5 border-b border-[color:var(--line)] pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="section-eyebrow">{eyebrow}</p>
          <h2 className="mt-3 text-3xl leading-tight text-[color:var(--ink)] sm:text-4xl">{title}</h2>
          <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{description}</p>
        </div>

        <button type="button" onClick={onCreate} className="primary-button">
          {actionLabel}
        </button>
      </div>

      {summary?.length ? (
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {summary.map((item) => (
            <div key={item.label} className="soft-panel rounded-[1.35rem] px-4 py-4">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[color:var(--muted)]">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-[color:var(--ink)]">{item.value}</p>
              {item.detail ? <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{item.detail}</p> : null}
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-6 overflow-hidden rounded-[1.6rem] border border-[color:var(--line)] bg-white">
        {rows.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead className="bg-[color:var(--surface-soft)] text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
                <tr>
                  {columns.map((column) => (
                    <th key={column.header} className={`px-5 py-4 ${column.className ?? ""}`}>
                      {column.header}
                    </th>
                  ))}
                  <th className="px-5 py-4 text-right">Acoes</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={row.id}
                    className={`border-t border-[color:var(--line)] ${
                      rowIndex % 2 === 0 ? "bg-white" : "bg-[color:var(--surface-soft)]/40"
                    }`}
                  >
                    {columns.map((column) => (
                      <td key={column.header} className={`px-5 py-4 align-top ${column.cellClassName ?? ""}`}>
                        {column.render(row)}
                      </td>
                    ))}
                    <td className="px-5 py-4 align-top">
                      <div className="flex flex-wrap items-center justify-end gap-2">{renderActions(row)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent-strong)]">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <h3 className="mt-5 text-2xl text-[color:var(--ink)]">{emptyTitle}</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-[color:var(--muted)]">{emptyDescription}</p>
          </div>
        )}
      </div>
    </section>
  );
}
