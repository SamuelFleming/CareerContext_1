// client/src/components/layout/PublicLayout.jsx
import { Outlet } from "react-router-dom";
import TopNav from "../navigation/TopNav";

export default function PublicLayout() {
  return (
    <div className="app-root">
      <TopNav variant="public" />

      <main className="public-main">
        <Outlet />
      </main>
    </div>
  );
}