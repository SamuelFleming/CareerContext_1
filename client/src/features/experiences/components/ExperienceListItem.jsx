import { useNavigate } from "react-router-dom";
import ExperienceSummaryCard from "./ExperienceSummaryCard";

export default function ExperienceListItem({ experience }) {
  const navigate = useNavigate();

  return (
    <ExperienceSummaryCard
      experience={experience}
      onClick={() => navigate(`/experiences/${experience.id}`)}
    />
  );
}
