// client/src/components/layout/AppShell.jsx
import TopNav from "../navigation/TopNav";
import Sidebar from "../navigation/Sidebar";
import JournalDrawer from "../navigation/JournalDrawer";

export default function AppShell({ children }) {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[260px_1fr] bg-[var(--neutral-050)]">
      <Sidebar />

      <div className="flex min-w-0 flex-col">
        <TopNav variant="protected" />

        <main className="flex-1 px-6 py-8 lg:px-10">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>

      {/* Globally available inside the protected workspace only. */}
      <JournalDrawer />
    </div>
  );
}
