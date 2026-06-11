// client/src/features/landing/components/HeroSection.jsx
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";

export default function HeroSection() {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-600)]">
        AI-assisted career evidence workspace
      </p>

      <h1 className="font-[var(--font-heading)] text-4xl font-bold leading-tight text-[var(--primary-900)] sm:text-5xl">
        A living record of your career — not just another document.
      </h1>

      <p className="max-w-xl text-lg leading-relaxed text-[var(--primary-600)]">
        CareerContext is a career evidence system. Build your core context,
        capture experiences and activities, evaluate opportunities, and
        generate tailored documents — all from one workspace.
      </p>

      <div className="flex flex-wrap gap-3">
        <Link to="/register">
          <Button size="lg">Get started</Button>
        </Link>
        <Link to="/login">
          <Button variant="secondary" size="lg">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
