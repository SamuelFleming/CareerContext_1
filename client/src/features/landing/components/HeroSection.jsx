// client/src/features/landing/components/HeroSection.jsx
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div>
        <p className="eyebrow">AI-assisted career evidence workspace</p>
        <h1>Build a living career context, not just another document.</h1>
        <p>
          CareerContext helps you capture, organise, retrieve, and reuse your
          professional, academic, and project experience.
        </p>

        <div className="button-row">
          <Link className="button button--primary" to="/register">
            Get started
          </Link>
          <Link className="button button--secondary" to="/login">
            Login
          </Link>
        </div>
      </div>

      <div className="hero-preview-card">
        <p className="eyebrow">Interactive CV Preview</p>
        <h2>Your Career Context</h2>
        <ul>
          <li>Core profile</li>
          <li>Experiences</li>
          <li>Reusable activities</li>
          <li>Target opportunities</li>
          <li>Generated documents</li>
        </ul>
      </div>
    </section>
  );
}