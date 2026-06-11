// client/src/components/navigation/Sidebar.jsx
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserCircle,
  Briefcase,
  Target,
  FileText,
} from "lucide-react";
import { cn } from "../../utils/cn";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/profile", label: "Profile / Core Context", icon: UserCircle },
  { to: "/experiences", label: "Experiences", icon: Briefcase, soon: true },
  { to: "/opportunities", label: "Opportunities", icon: Target, soon: true },
  { to: "/documents", label: "Documents", icon: FileText, soon: true },
];

function linkClass({ isActive }) {
  return cn(
    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
    isActive
      ? "bg-white/10 text-white"
      : "text-white/70 hover:bg-white/10 hover:text-white"
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden flex-col gap-8 bg-[var(--primary-900)] p-6 text-white md:flex">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-300)]">
          Workspace
        </p>
        <h2 className="mt-1 font-[var(--font-heading)] text-2xl font-bold text-white">
          CareerContext
        </h2>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon, soon }) =>
          soon ? (
            <span
              key={to}
              className="flex cursor-default items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/35"
            >
              <Icon size={18} aria-hidden="true" />
              <span className="flex-1">{label}</span>
              <span className="text-[10px] uppercase tracking-wide">Soon</span>
            </span>
          ) : (
            <NavLink key={to} to={to} className={linkClass}>
              <Icon size={18} aria-hidden="true" />
              {label}
            </NavLink>
          )
        )}
      </nav>

      <div className="mt-auto rounded-lg border border-white/15 bg-white/5 p-4">
        <p className="text-sm font-medium text-white">Capture evidence</p>
        <p className="mt-1 text-xs text-white/60">
          Use the journal spine on the right to jot notes anytime.
        </p>
      </div>
    </aside>
  );
}
