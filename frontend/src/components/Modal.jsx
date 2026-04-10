import { useEffect } from "react";

export default function Modal({
  open,
  title,
  subtitle,
  onClose,
  children,
  footer,
  wide = false
}) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(28,39,58,0.24)] px-4 py-8 backdrop-blur-sm">
      <button
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-label="Fechar modal"
        type="button"
      />

      <div
        className={`panel-surface relative z-10 w-full overflow-hidden rounded-[2rem] border border-white/60 ${
          wide ? "max-w-4xl" : "max-w-2xl"
        }`}
      >
        <div className="border-b border-[color:var(--border)] px-6 py-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--olive-700)]">
                Formulario
              </p>
              <h2 className="mt-2 text-3xl text-[color:var(--olive-900)]">{title}</h2>
              {subtitle ? (
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
                  {subtitle}
                </p>
              ) : null}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-soft)] text-[color:var(--olive-900)] transition hover:-translate-y-0.5 hover:bg-white"
              aria-label="Fechar"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-6 sm:px-8">{children}</div>

        {footer ? (
          <div className="border-t border-[color:var(--border)] bg-[color:var(--surface-soft)]/70 px-6 py-4 sm:px-8">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
