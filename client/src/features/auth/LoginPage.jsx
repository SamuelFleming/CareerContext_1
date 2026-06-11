// client/src/features/auth/LoginPage.jsx
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function LoginPage() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <Card className="flex w-full max-w-md flex-col gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-600)]">
            Welcome back
          </p>
          <h1 className="font-[var(--font-heading)] text-3xl font-bold text-[var(--primary-900)]">
            Login
          </h1>
          <p className="mt-1 text-sm text-[var(--primary-600)]">
            Access your CareerContext workspace.
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <Input id="email" label="Email" type="email" />
          <Input id="password" label="Password" type="password" />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
