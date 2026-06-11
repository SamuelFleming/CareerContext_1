// client/src/features/auth/RegisterPage.jsx
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function RegisterPage() {
  return (
    <div className="auth-page">
      <Card className="auth-card">
        <p className="eyebrow">Create your workspace</p>
        <h1>Register</h1>
        <p>Start capturing your career evidence.</p>

        <form className="form-stack">
          <Input id="name" label="Name" type="text" />
          <Input id="email" label="Email" type="email" />
          <Input id="password" label="Password" type="password" />

          <Button type="submit">Create account</Button>
        </form>
      </Card>
    </div>
  );
}