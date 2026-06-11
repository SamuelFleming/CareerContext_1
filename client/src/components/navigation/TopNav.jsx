// client/src/components/navigation/TopNav.jsx
import { Link } from "react-router-dom";

export default function TopNav({ variant = "public" }) {
  return (
    <header className="top-nav">
      <Link to="/" className="top-nav__brand">
        CareerContext
      </Link>

      <nav className="top-nav__links">
        {variant === "public" ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="nav-cta">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
          </>
        )}
      </nav>
    </header>
  );
}