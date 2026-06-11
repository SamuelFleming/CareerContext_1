// client/src/features/profile/ProfilePage.jsx
import PageHeader from "../../components/ui/PageHeader";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import TextArea from "../../components/ui/TextArea";
import Button from "../../components/ui/Button";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Profile"
        title="Core Context"
        description="The reusable foundation of your career evidence — used across opportunities and generated documents."
        actions={<Button>Save changes</Button>}
      />

      <Card className="flex flex-col gap-6">
        <CardHeader>
          <CardTitle>Identity</CardTitle>
          <CardDescription>Basic details that head your living CV.</CardDescription>
        </CardHeader>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Full name" placeholder="Alex Morgan" />
          <Input label="Headline" placeholder="Software Developer · Project Lead" />
          <Input label="Email" type="email" placeholder="alex@example.com" />
          <Input label="Location" placeholder="Brisbane, AU" />
        </div>
      </Card>

      <Card className="flex flex-col gap-6">
        <CardHeader>
          <CardTitle>Professional summary</CardTitle>
          <CardDescription>
            A concise core narrative you can reuse and tailor per opportunity.
          </CardDescription>
        </CardHeader>

        <TextArea
          label="Summary"
          placeholder="Full-stack developer who turns ambiguous problems into shipped products..."
          helperText="Markdown supported (placeholder)."
        />
      </Card>
    </div>
  );
}
