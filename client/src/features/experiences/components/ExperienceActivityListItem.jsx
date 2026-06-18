import { useNavigate } from "react-router-dom";
import EvidenceCard from "../../../components/ui/EvidenceCard";
import { Activity } from "lucide-react";
import { truncateText } from "./experienceFormUtils";

function formatUpdatedAt(value) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(new Date(value));
}

export default function ExperienceActivityListItem({ activity }) {
  const navigate = useNavigate();
  const updatedLabel = formatUpdatedAt(activity.updatedAt);
  const description =
    truncateText(activity.rawDescription) || "No description yet";

  return (
    <EvidenceCard
      icon={Activity}
      title={activity.title}
      meta={updatedLabel ? `Updated ${updatedLabel}` : undefined}
      description={description}
      onClick={() => navigate(`/activities/${activity.id}`)}
    />
  );
}
