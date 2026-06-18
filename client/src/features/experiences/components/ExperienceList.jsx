import Button from "../../../components/ui/Button";
import ExperienceListItem from "./ExperienceListItem";

export default function ExperienceList({
  experiences,
  onAddExperience,
  hasMore = false,
}) {
  if (experiences.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[var(--neutral-300)] bg-[var(--neutral-000)] px-6 py-8">
        <p className="text-sm text-[var(--primary-600)]">
          No experiences yet. Add a job, project, course, or other evidence
          container to start building your career record.
        </p>
        <div className="mt-6">
          <Button type="button" size="sm" onClick={onAddExperience}>
            Add your first experience
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-4">
        {experiences.map((experience) => (
          <li key={experience.id}>
            <ExperienceListItem experience={experience} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <p className="text-sm text-[var(--primary-600)]">
          Showing the first 20 experiences. Pagination will arrive in a later
          ticket.
        </p>
      )}
    </div>
  );
}
