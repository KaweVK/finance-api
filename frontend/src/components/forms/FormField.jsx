export default function FormField({ label, children }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[color:var(--olive-900)]">
      <span>{label}</span>
      {children}
    </label>
  );
}
