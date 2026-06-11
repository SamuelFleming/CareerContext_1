// client/src/components/navigation/Sidebar.jsx
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <p className="eyebrow">Workspace</p>
        <h2>CareerContext</h2>
      </div>

      <nav className="sidebar__nav">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/profile">Profile / Core Context</NavLink>
      </nav>

      <div className="sidebar__footer">
        <button className="journal-button" type="button">
          Open Journal
        </button>
      </div>
    </aside>
  );
}