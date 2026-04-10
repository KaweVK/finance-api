export default function Banner({ tone, title, message, detail, actionLabel, onAction }) {
  const toneClass =
    tone === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : "border-amber-200 bg-amber-50 text-amber-950";

  return (
    <div className={`rounded-[1.4rem] border px-5 py-4 shadow-sm ${toneClass}`}>
      {title ? <p className="text-sm font-semibold">{title}</p> : null}
      <p className={`${title ? "mt-1" : ""} text-sm leading-6`}>{message}</p>
      {detail ? <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] opacity-70">{detail}</p> : null}
      {actionLabel && onAction ? (
        <div className="mt-3">
          <button type="button" onClick={onAction} className="secondary-button">
            {actionLabel}
          </button>
        </div>
      ) : null}
    </div>
  );
}
