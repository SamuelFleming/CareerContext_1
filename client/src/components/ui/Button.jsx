// client/src/components/ui/Button.jsx
import { cn } from "../../utils/cn";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-md " +
  "transition-all duration-200 select-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "focus-visible:ring-[var(--accent-200)] " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-[var(--accent-600)] text-white border border-transparent " +
    "hover:bg-[var(--accent-500)] hover:-translate-y-px hover:shadow-[var(--shadow-accent)]",
  secondary:
    "bg-[var(--neutral-000)] text-[var(--primary-800)] border border-[var(--neutral-300)] " +
    "hover:bg-[var(--neutral-100)] hover:border-[var(--neutral-400)]",
  ghost:
    "bg-transparent text-[var(--accent-600)] border border-transparent " +
    "hover:bg-[var(--accent-100)] hover:text-[var(--accent-500)]",
  destructive:
    "bg-[var(--error-600)] text-white border border-transparent " +
    "hover:opacity-90 focus-visible:ring-[var(--error-100)]",
};

const sizes = {
  sm: "text-sm px-3 py-1.5 min-h-9",
  default: "text-base px-6 py-3 min-h-11",
  lg: "text-lg px-8 py-3.5 min-h-12",
};

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "default",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
