export default function LoadingPanel() {
  return (
    <section className="panel-surface rounded-[2rem] px-6 py-6 shadow-[var(--shadow)] sm:px-7 sm:py-7">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-28 animate-pulse rounded-[1.35rem] bg-[color:var(--surface-soft)]" />
        ))}
      </div>
    </section>
  );
}
