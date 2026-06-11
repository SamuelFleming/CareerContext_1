// client/src/components/layout/PublicLayout.jsx
import { Outlet } from "react-router-dom";
import TopNav from "../navigation/TopNav";

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--neutral-050)]">
      <TopNav variant="public" />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
