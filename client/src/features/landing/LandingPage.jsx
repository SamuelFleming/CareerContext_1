// client/src/features/landing/LandingPage.jsx
import { Link } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import ProductThesisCard from "./components/ProductThesisCard";
import FeatureGrid from "./components/FeatureGrid";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <HeroSection />
      <ProductThesisCard />
      <FeatureGrid />

      <section className="cta-section">
        <h2>Start building your reusable career context.</h2>
        <p>
          Capture your evidence once, then reuse it across opportunities,
          resumes, cover letters, and selection criteria.
        </p>

        <div className="button-row">
          <Link className="button button--primary" to="/register">
            Create account
          </Link>
          <Link className="button button--secondary" to="/login">
            Login
          </Link>
        </div>
      </section>
    </div>
  );
}