export default function Tag({ children, subtle = false }) {
  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${
        subtle
          ? "bg-white text-[color:var(--muted)] ring-1 ring-[color:var(--line)]"
          : "bg-[color:var(--accent-soft)] text-[color:var(--accent-strong)]"
      }`}
    >
      {children}
    </span>
  );
}
