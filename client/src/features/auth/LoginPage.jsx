// client/src/features/auth/LoginPage.jsx
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "./authContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const validate = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login({ email, password });

      const redirectTo = location.state?.from?.pathname || "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setFormError(error.message || "Unable to log in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

        {formError && (
          <div
            role="alert"
            className="rounded-md border border-[var(--error-100)] bg-[var(--error-100)]/40 px-4 py-3 text-sm text-[var(--error-600)]"
          >
            {formError}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <Input
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={fieldErrors.email}
            disabled={isSubmitting}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={fieldErrors.password}
            disabled={isSubmitting}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-sm text-[var(--primary-600)]">
          New here?{" "}
          <Link
            to="/register"
            className="font-medium text-[var(--accent-600)] hover:text-[var(--accent-500)]"
          >
            Create an account
          </Link>
        </p>
      </Card>
    </div>
  );
}
