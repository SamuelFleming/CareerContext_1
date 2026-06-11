// client/src/components/navigation/TopNav.jsx
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useAuth } from "../../features/auth/authContext";

export default function TopNav({ variant = "public" }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
  return (
    <header className="sticky top-0 z-30 flex min-h-[68px] items-center justify-between border-b border-[var(--neutral-200)] bg-[var(--neutral-000)]/85 px-6 backdrop-blur-md lg:px-10">
      <Link
        to="/"
        className="font-[var(--font-heading)] text-xl font-bold tracking-tight text-[var(--primary-900)]"
      >
        CareerContext
      </Link>

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
            <Link
              to="/dashboard"
              className="px-2 text-sm font-medium text-[var(--primary-700)] transition-colors hover:text-[var(--accent-600)]"
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="px-2 text-sm font-medium text-[var(--primary-700)] transition-colors hover:text-[var(--accent-600)]"
            >
              Profile
            </Link>
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Log out
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
