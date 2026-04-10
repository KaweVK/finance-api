export default function AppHeader({ meta, topStats }) {
  return (
    <section className="top-shell rounded-[2rem] px-6 py-6 shadow-[var(--shadow)] sm:px-8 sm:py-8">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr] xl:items-start">
        <div className="max-w-3xl">
          <p className="section-eyebrow">{meta.eyebrow}</p>
          <h1 className="mt-3 text-3xl leading-tight text-[color:var(--ink)] sm:text-4xl">{meta.title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--muted)]">{meta.description}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          {topStats.map((item) => (
            <div key={item.label} className="soft-panel rounded-[1.3rem] px-4 py-4">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[color:var(--muted)]">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-[color:var(--ink)]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
