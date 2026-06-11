// client/src/components/layout/ProtectedLayout.jsx
import { Outlet } from "react-router-dom";
import AppShell from "./AppShell";

export default function ProtectedLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}