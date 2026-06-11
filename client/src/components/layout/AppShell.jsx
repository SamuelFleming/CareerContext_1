// client/src/components/layout/AppShell.jsx
import TopNav from "../navigation/TopNav";
import Sidebar from "../navigation/Sidebar";

export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-shell__content">
        <TopNav variant="protected" />

        <main className="app-shell__main">{children}</main>
      </div>
    </div>
  );
}