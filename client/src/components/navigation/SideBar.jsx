// client/src/components/navigation/Sidebar.jsx
import { X } from "lucide-react";
import NavItem from "./NavItem";
import { PRIMARY_NAV } from "./navConfig";
import { useJournalDrawer } from "../../contexts/JournalDrawerContext";
import { cn } from "../../utils/cn";

function SidebarNav({ onNavigate }) {
  const { openJournal } = useJournalDrawer();

  const handleJournal = () => {
    openJournal();
    onNavigate?.();
  };

  return (
    <nav className="flex flex-col gap-1" aria-label="Primary workspace">
      {PRIMARY_NAV.map((item) => {
        if (item.kind === "journal") {
          return (
            <NavItem
              key={item.id}
              label={item.label}
              icon={item.icon}
              tone="journal"
              onClick={handleJournal}
            />
          );
        }

        return (
          <NavItem
            key={item.id}
            to={item.to}
            label={item.label}
            icon={item.icon}
            soon={item.soon}
            tone={item.soon ? "soon" : "inactive"}
            end={item.to === "/dashboard"}
            onNavigate={onNavigate}
          />
        );
      })}
    </nav>
  );
}

export default function Sidebar({ mobileOpen = false, onMobileClose }) {
  const panel = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-300)]">
            Workspace
          </p>
          <h2 className="mt-1 font-[var(--font-heading)] text-2xl font-bold text-white">
            CareerContext
          </h2>
        </div>
        {onMobileClose && (
          <button
            type="button"
            onClick={onMobileClose}
            aria-label="Close navigation menu"
            className="rounded-md p-1 text-white/70 hover:bg-white/10 hover:text-white md:hidden"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <SidebarNav onNavigate={onMobileClose} />

      <div className="mt-auto rounded-lg border border-white/15 bg-white/5 p-4">
        <p className="text-sm font-medium text-white">Capture evidence</p>
        <p className="mt-1 text-xs text-white/60">
          Use Journal in the menu or the spine on the right for quick notes.
        </p>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden flex-col gap-8 bg-[var(--primary-900)] p-6 text-white md:flex">
        {panel}
      </aside>

      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onMobileClose}
          className={cn(
            "absolute inset-0 bg-[var(--primary-900)]/40 transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
        />
        <aside
          className={cn(
            "absolute left-0 top-0 flex h-full w-[min(100vw,280px)] flex-col gap-8 bg-[var(--primary-900)] p-6 text-white shadow-[var(--shadow-lg)] transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
          aria-label="Mobile navigation"
        >
          {panel}
        </aside>
      </div>
    </>
  );
}
