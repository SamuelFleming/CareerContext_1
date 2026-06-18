import Button from "../../../components/ui/Button";
import Card, { CardHeader, CardTitle, CardDescription } from "../../../components/ui/Card";
import ExperienceActivityListItem from "./ExperienceActivityListItem";
import CreateActivityPanel from "./CreateActivityPanel";

export default function ExperienceActivitySection({
  activities,
  hasMore = false,
  isCreateOpen,
  createForm,
  onCreateFieldChange,
  onOpenCreate,
  onCloseCreate,
  onCreateSubmit,
  isCreating = false,
  createError = "",
}) {
  return (
    <section className="flex flex-col gap-4">
      <Card className="flex flex-col gap-4">
        <CardHeader className="mb-0 flex-row items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <CardTitle>Activities</CardTitle>
            <CardDescription>
              Reusable evidence items linked to this experience.
            </CardDescription>
          </div>
          {!isCreateOpen && (
            <Button type="button" size="sm" onClick={onOpenCreate}>
              Add activity
            </Button>
          )}
        </CardHeader>
      </Card>

      {isCreateOpen && (
        <CreateActivityPanel
          form={createForm}
          onChange={onCreateFieldChange}
          onSubmit={onCreateSubmit}
          onCancel={onCloseCreate}
          isSubmitting={isCreating}
          submitError={createError}
        />
      )}

      {activities.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[var(--neutral-300)] bg-[var(--neutral-000)] px-6 py-8">
          <p className="text-sm text-[var(--primary-600)]">
            No activities yet. Add achievements, responsibilities, or project
            work as reusable evidence.
          </p>
          {!isCreateOpen && (
            <div className="mt-6">
              <Button type="button" size="sm" onClick={onOpenCreate}>
                Add your first activity
              </Button>
            </div>
          )}
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {activities.map((activity) => (
            <li key={activity.id}>
              <ExperienceActivityListItem activity={activity} />
            </li>
          ))}
        </ul>
      )}

      {hasMore && (
        <p className="text-sm text-[var(--primary-600)]">
          Showing the first 20 activities. Pagination will arrive in a later
          ticket.
        </p>
      )}
    </section>
  );
}
