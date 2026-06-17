// client/src/components/navigation/NavItem.jsx
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";

const baseClass =
  "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors";

const variants = {
  sidebar: {
    active: "bg-white/10 text-white",
    inactive: "text-white/70 hover:bg-white/10 hover:text-white",
    soon: "text-white/50 hover:bg-white/5 hover:text-white/70",
    journal: "text-white/70 hover:bg-white/10 hover:text-white",
  },
};

export function sidebarNavClass({ isActive }, tone = "inactive") {
  return cn(
    baseClass,
    isActive ? variants.sidebar.active : variants.sidebar[tone]
  );
}

export default function NavItem({
  to,
  label,
  icon: Icon,
  onClick,
  onNavigate,
  soon = false,
  end = false,
  tone = "inactive",
  className,
}) {
  const iconEl = <Icon size={18} aria-hidden="true" className="shrink-0" />;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(baseClass, variants.sidebar[tone], className)}
      >
        {iconEl}
        <span className="flex-1 text-left">{label}</span>
      </button>
    );
  }

  return (
    <NavLink
      to={to}
      end={end}
      onClick={() => onNavigate?.()}
      className={({ isActive }) =>
        cn(sidebarNavClass({ isActive }, tone), className)
      }
    >
      {iconEl}
      <span className="flex-1">{label}</span>
      {soon && (
        <span className="text-[10px] font-medium uppercase tracking-wide text-white/40">
          Soon
        </span>
      )}
    </NavLink>
  );
}
