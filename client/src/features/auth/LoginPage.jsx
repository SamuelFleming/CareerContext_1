// client/src/features/auth/LoginPage.jsx
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function LoginPage() {
  return (
    <div className="auth-page">
      <Card className="auth-card">
        <p className="eyebrow">Welcome back</p>
        <h1>Login</h1>
        <p>Access your CareerContext workspace.</p>

        <form className="form-stack">
          <Input id="email" label="Email" type="email" />
          <Input id="password" label="Password" type="password" />

          <Button type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
}