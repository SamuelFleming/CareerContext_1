// client/src/components/navigation/TopNav.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import Button from "../ui/Button";
import { useAuth } from "../../features/auth/authContext";
import { cn } from "../../utils/cn";

const protectedLinkClass = ({ isActive }) =>
  cn(
    "rounded-md px-2 py-1 text-sm font-medium transition-colors md:hidden",
    isActive
      ? "bg-[var(--accent-100)] text-[var(--accent-600)]"
      : "text-[var(--primary-700)] hover:text-[var(--accent-600)]"
  );

export default function TopNav({ variant = "public", onOpenMobileNav }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 flex min-h-[68px] items-center justify-between gap-4 border-b border-[var(--neutral-200)] bg-[var(--neutral-000)]/85 px-6 backdrop-blur-md lg:px-10">
      <div className="flex min-w-0 items-center gap-3">
        {variant === "protected" && (
          <button
            type="button"
            onClick={onOpenMobileNav}
            aria-label="Open navigation menu"
            className="rounded-md p-2 text-[var(--primary-700)] hover:bg-[var(--neutral-100)] md:hidden"
          >
            <Menu size={20} />
          </button>
        )}

        <Link
          to={variant === "protected" ? "/dashboard" : "/"}
          className="truncate font-[var(--font-heading)] text-xl font-bold tracking-tight text-[var(--primary-900)]"
        >
          CareerContext
        </Link>
      </div>

      <nav className="flex items-center gap-2 sm:gap-4">
        {variant === "public" ? (
          <>
            <Link
              to="/login"
              className="px-2 text-sm font-medium text-[var(--primary-700)] transition-colors hover:text-[var(--accent-600)]"
            >
              Login
            </Link>
            <Link to="/register">
              <Button size="sm">Register</Button>
            </Link>
          </>
        ) : (
          <>
            <NavLink to="/dashboard" className={protectedLinkClass} end>
              Dashboard
            </NavLink>
            <NavLink to="/profile" className={protectedLinkClass}>
              Profile
            </NavLink>

            {user && (
              <div className="hidden text-right sm:block">
                <p className="max-w-[180px] truncate text-sm font-medium text-[var(--primary-900)]">
                  {user.name}
                </p>
                <p className="max-w-[180px] truncate text-xs text-[var(--primary-600)]">
                  {user.email}
                </p>
              </div>
            )}

            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Log out
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
