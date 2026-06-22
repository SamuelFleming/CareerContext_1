// client/src/components/ui/Card.jsx
import { cn } from "../../utils/cn";

const base = "rounded-lg p-6 transition-all duration-200";

const variants = {
  default:
    "bg-[var(--neutral-000)] border border-[var(--neutral-200)] shadow-[var(--shadow-sm)] " +
    "hover:border-[var(--neutral-300)] hover:shadow-[var(--shadow-md)]",
  evidence:
    "bg-[var(--evidence-warm)] border border-[var(--evidence-border)] " +
    "border-l-4 border-l-[var(--accent-600)] shadow-[var(--shadow-xs)]",
  accentSoft:
    "bg-gradient-to-br from-[var(--accent-100)] to-[var(--neutral-000)] " +
    "border border-[var(--accent-200)] border-l-4 border-l-[var(--accent-500)] " +
    "shadow-[var(--shadow-xs)]",
  interactive:
    "bg-[var(--neutral-000)] border border-[var(--neutral-200)] shadow-[var(--shadow-sm)] cursor-pointer " +
    "hover:border-[var(--accent-400)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-200)]",
};

export default function Card({
  children,
  variant = "default",
  className = "",
  ...props
}) {
  return (
    <section className={cn(base, variants[variant], className)} {...props}>
      {children}
    </section>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <header className={cn("mb-4 flex flex-col gap-1", className)} {...props}>
      {children}
    </header>
  );
}

export function CardTitle({ children, className = "", ...props }) {
  return (
    <h3
      className={cn(
        "font-[var(--font-heading)] text-xl font-semibold text-[var(--primary-900)]",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = "", ...props }) {
  return (
    <p
      className={cn("text-sm text-[var(--primary-600)]", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div
      className={cn("text-base text-[var(--primary-700)]", className)}
      {...props}
    >
      {children}
    </div>
  );
}
