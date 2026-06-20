import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import SkillTechnologyChipList from "../../../components/ui/SkillTechnologyChipList";
import { hasSkillTechnologyTerms } from "../../../utils/skillTechnologyChipUtils";

export default function ActivitySkillsTechnologiesSummary({ activity }) {
  if (!hasSkillTechnologyTerms(activity)) {
    return null;
  }

  return (
    <Card variant="evidence" className="flex flex-col gap-4">
      <CardHeader className="mb-0">
        <CardTitle className="text-lg">Skills &amp; technologies</CardTitle>
        <CardDescription>
          Tagged on this activity. Edit in the form below to update.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SkillTechnologyChipList
          technologies={activity.technologies}
          skills={activity.skills}
        />
      </CardContent>
    </Card>
  );
}
