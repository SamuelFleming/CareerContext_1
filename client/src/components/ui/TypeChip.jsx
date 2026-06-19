import { cn } from "../../utils/cn";

const base =
  "inline-flex shrink-0 items-center rounded-full border border-[var(--neutral-300)] " +
  "bg-[var(--neutral-100)] px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide " +
  "text-[var(--primary-600)]";

export default function TypeChip({ children, className = "", ...props }) {
  return (
    <span className={cn(base, className)} {...props}>
      {children}
    </span>
  );
}
