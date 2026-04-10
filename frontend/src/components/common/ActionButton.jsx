export default function ActionButton({ label, onClick, danger = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition ${
        danger
          ? "border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
          : "secondary-button"
      }`}
    >
      {label}
    </button>
  );
}
