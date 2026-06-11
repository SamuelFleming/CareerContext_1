// client/src/features/auth/RegisterPage.jsx
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function RegisterPage() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <Card className="flex w-full max-w-md flex-col gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-600)]">
            Create your workspace
          </p>
          <h1 className="font-[var(--font-heading)] text-3xl font-bold text-[var(--primary-900)]">
            Register
          </h1>
          <p className="mt-1 text-sm text-[var(--primary-600)]">
            Start capturing your career evidence.
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <Input id="name" label="Name" type="text" />
          <Input id="email" label="Email" type="email" />
          <Input id="password" label="Password" type="password" />

          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>
      </Card>
    </div>
  );
}
