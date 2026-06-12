// client/src/features/dashboard/components/InteractiveCvCard.jsx
import { Link } from "react-router-dom";
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/Card";
import SkillChip from "../../../components/ui/SkillChip";

function formatTimestamp(value) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(new Date(value));
}

function ContactStrip({ identity }) {
  const parts = [identity.email, identity.mobile, identity.location].filter(Boolean);

  if (parts.length === 0) {
    return null;
  }

  return (
    <p className="text-sm text-[var(--primary-600)]">{parts.join(" · ")}</p>
  );
}

export default function InteractiveCvCard({ identity, interactiveCv }) {
  const updatedLabel = formatTimestamp(interactiveCv.summaryUpdatedAt);

  return (
    <Card className="flex flex-col gap-5">
      <CardHeader className="mb-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-600)]">
          Interactive CV
        </p>
        <CardTitle className="text-2xl">
          {identity.fullName || "Your name"}
        </CardTitle>
        {identity.headline ? (
          <p className="text-sm text-[var(--primary-600)]">{identity.headline}</p>
        ) : (
          <p className="text-sm italic text-[var(--primary-500)]">
            Add a headline on your profile
          </p>
        )}
        <ContactStrip identity={identity} />
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <section className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--primary-800)]">
            Profile
          </h4>
          {interactiveCv.summaryPreview ? (
            <>
              <p className="text-sm leading-relaxed text-[var(--primary-700)]">
                {interactiveCv.summaryPreview}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--primary-600)]">
                {updatedLabel && <span>Updated {updatedLabel}</span>}
                {interactiveCv.reviewSuggested && (
                  <span className="font-medium text-[var(--warning-600)]">
                    Review suggested
                  </span>
                )}
                <Link
                  to="/profile"
                  className="font-medium text-[var(--accent-600)] hover:text-[var(--accent-500)]"
                >
                  Edit summary
                </Link>
              </div>
            </>
          ) : (
            <p className="text-sm text-[var(--primary-600)]">
              Your career summary will appear here.{" "}
              <Link to="/profile" className="font-medium text-[var(--accent-600)]">
                Write your core context
              </Link>{" "}
              to power opportunity evaluation and document generation.
            </p>
          )}
        </section>

        <section className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--primary-800)]">
            Core competencies
          </h4>
          {interactiveCv.coreCompetencies?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {interactiveCv.coreCompetencies.map((skill) => (
                <SkillChip key={skill}>{skill}</SkillChip>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--primary-600)]">
              Skills will be derived from your experiences once evidence is added.
            </p>
          )}
        </section>

        <section className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--primary-800)]">
            Experiences & projects
          </h4>
          {interactiveCv.highlightExperiences?.length > 0 ? (
            <p className="text-sm text-[var(--primary-600)]">
              Experience highlights will render here in a later phase.
            </p>
          ) : (
            <p className="text-sm text-[var(--primary-600)]">
              Your most notable roles and projects will surface here after you add
              experiences.
            </p>
          )}
        </section>
      </CardContent>
    </Card>
  );
}
