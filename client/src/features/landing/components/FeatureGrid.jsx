// client/src/features/landing/components/FeatureGrid.jsx
import Card from "../../../components/ui/Card";

const features = [
  {
    title: "Core context",
    description: "Maintain your reusable profile, skills, and resume material.",
  },
  {
    title: "Experiences",
    description: "Organise projects, study, work, and volunteering evidence.",
  },
  {
    title: "Activities",
    description: "Break experience into reusable proof points and examples.",
  },
  {
    title: "Opportunities",
    description: "Evaluate jobs and match them against your evidence base.",
  },
  {
    title: "Documents",
    description: "Generate tailored resumes, cover letters, and responses.",
  },
  {
    title: "Journal",
    description: "Capture rough notes before they become structured evidence.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="feature-grid">
      {features.map((feature) => (
        <Card key={feature.title}>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </Card>
      ))}
    </section>
  );
}