// client/src/features/dashboard/components/InteractiveCvCard.jsx
import { Link, useNavigate } from "react-router-dom";
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/Card";
import EvidenceCard from "../../../components/ui/EvidenceCard";
import SkillTechnologyChipList from "../../../components/ui/SkillTechnologyChipList";
import CompetencyScaffoldChip from "./CompetencyScaffoldChip";
import { EXPERIENCE_TYPE_ICONS } from "../../experiences/components/experienceUi";
import {
  toDisplayChip,
  toDisplayChips,
} from "../../../utils/skillTechnologyChipUtils";

function formatTimestamp(value) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(new Date(value));
}

function ContactStrip({ identity }) {
  const parts = [identity.email, identity.mobile, identity.location].filter(
    Boolean
  );

  if (parts.length === 0) {
    return null;
  }

  return (
    <p className="text-sm text-[var(--primary-600)]">{parts.join(" · ")}</p>
  );
}

function mapTopTermsToChips(terms = []) {
  return terms.map((term, index) =>
    toDisplayChip(term.label, term.kind, index)
  );
}

function highlightTags(experience) {
  return toDisplayChips(
    {
      technologies: experience.technologies,
      skills: experience.skills,
    },
    { limit: 4 }
  ).map((chip) => chip.label);
}

export default function InteractiveCvCard({ identity, interactiveCv = {} }) {
  const navigate = useNavigate();
  const updatedLabel = formatTimestamp(interactiveCv.summaryUpdatedAt);
  const highlightExperiences = interactiveCv.highlightExperiences || [];
  const topTerms = interactiveCv.topSkillsAndTechnologies || [];
  const coreCompetencies = interactiveCv.coreCompetencies;
  const isScaffoldCompetencies = coreCompetencies?.status === "scaffold";
  const scaffoldItems = coreCompetencies?.items || [];

  return (
    <Card className="flex flex-col gap-5 bg-gradient-to-br from-[var(--accent-100)] to-[var(--neutral-000)] p-6 shadow-[var(--shadow-lg)]">
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
          <h4 className="sr-only">Profile</h4>
          <Card variant="default" className="overflow-hidden p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--primary-500)]">
              Profile
            </p>
            {interactiveCv.summaryPreview ? (
              <>
                <p className="mt-1 line-clamp-3 text-xs leading-snug text-[var(--primary-700)]">
                  {interactiveCv.summaryPreview}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[10px] text-[var(--primary-600)]">
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
              <p className="mt-1 line-clamp-2 text-xs leading-snug text-[var(--primary-600)]">
                Your career summary will appear here.{" "}
                <Link to="/profile" className="font-medium text-[var(--accent-600)]">
                  Write your core context
                </Link>{" "}
                to power opportunity evaluation and document generation.
              </p>
            )}
          </Card>
        </section>

        <section className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--primary-800)]">
            Skills &amp; technologies
          </h4>
          {topTerms.length > 0 ? (
            <SkillTechnologyChipList chips={mapTopTermsToChips(topTerms)} />
          ) : (
            <p className="text-sm text-[var(--primary-600)]">
              Add skills and technologies on your experiences to see your top
              terms here.
            </p>
          )}
        </section>

        {isScaffoldCompetencies && (
          <section className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--primary-800)]">
                Core competencies
              </h4>
              <span className="rounded-full border border-dashed border-[var(--primary-400)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--primary-500)]">
                Preview
              </span>
            </div>
            {coreCompetencies.message && (
              <p className="text-xs text-[var(--primary-500)]">
                {coreCompetencies.message}
              </p>
            )}
            {scaffoldItems.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {scaffoldItems.map((item) => (
                  <CompetencyScaffoldChip
                    key={item.label}
                    label={item.label}
                    hint={coreCompetencies.message}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--primary-600)]">
                AI-derived profile competencies will appear here in a future
                phase.
              </p>
            )}
          </section>
        )}

        <section className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--primary-800)]">
            Experiences &amp; projects
          </h4>
          {highlightExperiences.length > 0 ? (
            <div className="flex flex-col gap-3">
              {highlightExperiences.map((experience) => (
                <EvidenceCard
                  key={experience.id}
                  icon={EXPERIENCE_TYPE_ICONS[experience.type]}
                  title={experience.title}
                  meta={experience.meta}
                  description={experience.descriptionPreview}
                  tags={highlightTags(experience)}
                  onClick={() => navigate(experience.href)}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--primary-600)]">
              Your most notable roles and projects will surface here after you
              add{" "}
              <Link
                to="/experiences"
                className="font-medium text-[var(--accent-600)] hover:text-[var(--accent-500)]"
              >
                experiences
              </Link>
              .
            </p>
          )}
        </section>
      </CardContent>
    </Card>
  );
}
