import { useNavigate } from "react-router-dom";
import EvidenceCard from "../../../components/ui/EvidenceCard";
import { Activity } from "lucide-react";
import { truncateText } from "./experienceFormUtils";
import { normalizeTermList } from "../../../utils/skillTechnologyChipUtils";

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
  const technologyTags = normalizeTermList(activity.technologies).slice(0, 3);

  return (
    <EvidenceCard
      icon={Activity}
      title={activity.title}
      meta={updatedLabel ? `Updated ${updatedLabel}` : undefined}
      description={description}
      tags={technologyTags}
      onClick={() => navigate(`/activities/${activity.id}`)}
    />
  );
}
