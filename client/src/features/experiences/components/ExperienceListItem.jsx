import { useNavigate } from "react-router-dom";
import EvidenceCard from "../../../components/ui/EvidenceCard";
import SkillChip from "../../../components/ui/SkillChip";
import {
  EXPERIENCE_TYPE_ICONS,
  formatExperienceDescription,
  formatExperienceMeta,
  formatExperienceType,
} from "./experienceUi";

export default function ExperienceListItem({ experience }) {
  const navigate = useNavigate();
  const Icon = EXPERIENCE_TYPE_ICONS[experience.type] || EXPERIENCE_TYPE_ICONS.job;

  return (
    <div className="flex flex-col gap-2">
      <EvidenceCard
        icon={Icon}
        title={experience.title}
        meta={formatExperienceMeta(experience)}
        description={formatExperienceDescription(experience)}
        onClick={() => navigate(`/experiences/${experience.id}`)}
      />
      <div className="pl-1">
        <SkillChip variant="neutral">{formatExperienceType(experience.type)}</SkillChip>
      </div>
    </div>
  );
}
