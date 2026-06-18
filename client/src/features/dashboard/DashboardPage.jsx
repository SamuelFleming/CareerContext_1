// client/src/features/dashboard/DashboardPage.jsx
import { useCallback, useEffect, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import { getDashboard } from "../../services/dashboardService";
import InteractiveCvCard from "./components/InteractiveCvCard";
import ProfileCompletenessPrompt from "./components/ProfileCompletenessPrompt";
import EvidencePanel from "./components/EvidencePanel";

const emptyDashboard = {
  identity: {
    fullName: "",
    headline: "",
    email: "",
    mobile: "",
    location: "",
  },
  profileCompleteness: {
    score: 0,
    completed: 0,
    total: 5,
    status: "empty",
    showPrompt: true,
    checks: [],
    missing: [],
    nextAction: null,
  },
  interactiveCv: {
    summaryPreview: null,
    summaryUpdatedAt: null,
    reviewSuggested: false,
    coreCompetencies: [],
    highlightExperiences: [],
  },
  evidencePanel: {
    defaultView: "evidenceSummary",
    evidenceSummary: {
      status: "empty",
      message: "No experiences yet. Add evidence from the Experiences workspace.",
      counts: { experiences: 0, activities: 0, journalEntries: 0 },
    },
    recentActivity: {
      status: "empty",
      message: "Your latest captured evidence will appear here.",
      items: [],
    },
  },
};

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(emptyDashboard);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");

    try {
      const response = await getDashboard();
      const data = response.data || {};

      setDashboard({
        ...emptyDashboard,
        ...data,
        identity: { ...emptyDashboard.identity, ...data.identity },
        profileCompleteness: {
          ...emptyDashboard.profileCompleteness,
          ...data.profileCompleteness,
        },
        interactiveCv: {
          ...emptyDashboard.interactiveCv,
          ...data.interactiveCv,
        },
        evidencePanel: {
          ...emptyDashboard.evidencePanel,
          ...data.evidencePanel,
          evidenceSummary: {
            ...emptyDashboard.evidencePanel.evidenceSummary,
            ...data.evidencePanel?.evidenceSummary,
          },
          recentActivity: {
            ...emptyDashboard.evidencePanel.recentActivity,
            ...data.evidencePanel?.recentActivity,
          },
        },
      });
    } catch (error) {
      setLoadError(error.message || "Unable to load dashboard.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          eyebrow="Dashboard"
          title="Your Career Context"
          description="Loading your workspace overview..."
        />
        <p className="text-sm text-[var(--primary-600)]">Loading dashboard…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          eyebrow="Dashboard"
          title="Your Career Context"
          description="A living overview of your profile, evidence, opportunities, and generated documents."
        />
        <div
          role="alert"
          className="rounded-md border border-[var(--error-100)] bg-[var(--error-100)]/40 px-4 py-3 text-sm text-[var(--error-600)]"
        >
          {loadError}
        </div>
        <Button type="button" onClick={loadDashboard}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Dashboard"
        title="Your Career Context"
        description="A living overview of your profile, evidence, opportunities, and generated documents."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <InteractiveCvCard
          identity={dashboard.identity}
          interactiveCv={dashboard.interactiveCv}
        />

        <div className="flex flex-col gap-6">
          <ProfileCompletenessPrompt
            profileCompleteness={dashboard.profileCompleteness}
          />
          <EvidencePanel evidencePanel={dashboard.evidencePanel} />
        </div>
      </div>
    </div>
  );
}
