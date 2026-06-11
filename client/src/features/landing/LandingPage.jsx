// client/src/features/landing/LandingPage.jsx
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import HeroSection from "./components/HeroSection";
import ProductThesisCard from "./components/ProductThesisCard";
import InteractiveCvPreview from "./components/InteractiveCvPreview";
import FeatureGrid from "./components/FeatureGrid";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-12">
      <section className="grid items-start gap-8 py-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-8">
        <div className="flex flex-col gap-6">
          <HeroSection />
          <ProductThesisCard />
        </div>

        <InteractiveCvPreview />
      </section>

      <FeatureGrid />

      <section className="rounded-xl bg-[var(--primary-900)] p-8 text-white lg:p-12">
        <h2 className="font-[var(--font-heading)] text-2xl font-bold text-white sm:text-3xl">
          Start building your reusable career context.
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Capture your evidence once, then reuse it across opportunities,
          resumes, cover letters, and selection criteria.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/register">
            <Button size="lg">Create account</Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
              Login
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
