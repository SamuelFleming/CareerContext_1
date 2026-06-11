// client/src/features/landing/components/ProductThesisCard.jsx
import { useState } from "react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function ProductThesisCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="flex flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-600)]">
        Product thesis
      </p>
      <h2 className="font-[var(--font-heading)] text-2xl font-bold text-[var(--primary-900)]">
        Not merely a cover letter generator.
      </h2>
      <p className="max-w-3xl leading-relaxed text-[var(--primary-700)]">
        CareerContext is a lightweight career evidence system. It helps you
        structure the raw materials of a job search — projects, responsibilities,
        achievements, skills, and stories — into reusable professional context.
      </p>

      {isExpanded && (
        <div className="flex flex-col gap-4 text-[var(--primary-700)]">
          <p className="max-w-3xl leading-relaxed">
            Built with developers in mind — but applicable across professions — it
            recognises that in 2026 both applicants and employers use AI. The
            challenge is keeping applications truthful while surfacing the
            information that best serves each opportunity.
          </p>
          <p className="max-w-3xl leading-relaxed">
            That is what a career evidence system targets: capturing and
            organising your career context once, in a workspace designed for ease
            of use and AI assistance.
          </p>
          <p className="max-w-3xl leading-relaxed">
            No more hunting for that MERN project from a year ago, re-describing
            past responsibilities, or pasting everything into a chatbot each time
            you evaluate a role or draft a cover letter.
          </p>
        </div>
      )}

      <div>
        <Button
          variant="ghost"
          size="sm"
          className="px-0"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Read less" : "Read more"}
        </Button>
      </div>
    </Card>
  );
}
