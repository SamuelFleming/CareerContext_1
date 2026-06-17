// client/src/components/layout/AppShell.jsx
import { useState } from "react";
import TopNav from "../navigation/TopNav";
import Sidebar from "../navigation/Sidebar";
import JournalDrawer from "../navigation/JournalDrawer";
import { JournalDrawerProvider } from "../../contexts/JournalDrawerContext";

export default function AppShell({ children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <JournalDrawerProvider>
      <div className="grid min-h-screen grid-cols-1 bg-[var(--neutral-050)] md:grid-cols-[260px_1fr]">
        <Sidebar
          mobileOpen={mobileNavOpen}
          onMobileClose={() => setMobileNavOpen(false)}
        />

        <div className="flex min-w-0 flex-col">
          <TopNav
            variant="protected"
            onOpenMobileNav={() => setMobileNavOpen(true)}
          />

          <main className="flex-1 px-6 py-8 lg:px-10">
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </main>
        </div>

        <JournalDrawer />
      </div>
    </JournalDrawerProvider>
  );
}
