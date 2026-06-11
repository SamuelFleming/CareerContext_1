// client/src/features/dashboard/DashboardPage.jsx
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";

export default function DashboardPage() {
  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Dashboard"
        title="Your Career Context"
        description="A living overview of your profile, evidence, opportunities, and generated documents."
      />

      <section className="dashboard-grid">
        <Card className="cv-panel">
          <p className="eyebrow">Interactive CV</p>
          <h2>Samuel Example</h2>
          <p>Software Developer | Project Lead | Computing Student</p>

          <div className="cv-section-list">
            <button>Core Profile</button>
            <button>Skills Evidence</button>
            <button>Project Experience</button>
            <button>Generated Documents</button>
          </div>
        </Card>

        <Card>
          <h3>Evidence Summary</h3>
          <p>Experiences, activities, and journal entries will appear here.</p>
        </Card>

        <Card>
          <h3>Recent Activity</h3>
          <p>Your latest captured evidence will appear here.</p>
        </Card>
      </section>
    </div>
  );
}