// client/src/components/ui/SkillChip.jsx
import { cn } from "../../utils/cn";

const base =
  "inline-flex items-center gap-2 rounded-full border text-sm font-medium " +
  "px-4 py-1.5 transition-all duration-200";

const interactive =
  "cursor-pointer hover:-translate-y-px focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-[var(--accent-200)]";

const variants = {
  accent:
    "text-[var(--accent-600)] bg-[var(--accent-100)] border-[var(--accent-200)] " +
    "hover:bg-[var(--accent-200)] hover:border-[var(--accent-300)]",
  neutral:
    "text-[var(--primary-700)] bg-[var(--neutral-100)] border-[var(--neutral-200)] " +
    "hover:bg-[var(--neutral-200)] hover:border-[var(--neutral-300)]",
  success:
    "text-[var(--success-600)] bg-[var(--success-100)] border-[var(--success-600)]/20 " +
    "hover:opacity-90",
  warning:
    "text-[var(--warning-600)] bg-[var(--warning-100)] border-[var(--warning-600)]/20 " +
    "hover:opacity-90",
};

export default function SkillChip({
  children,
  variant = "accent",
  className = "",
  onClick,
  ...props
}) {
  const isClickable = typeof onClick === "function";

  return (
    <span
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isClickable
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick(event);
              }
            }
          : undefined
      }
      className={cn(base, variants[variant], isClickable && interactive, className)}
      {...props}
    >
      {children}
    </span>
  );
}
