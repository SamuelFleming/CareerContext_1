// client/src/features/profile/ProfilePage.jsx
import { useCallback, useEffect, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import {
  getProfile,
  updateProfile,
  updateCoreContext,
  updateCoreResume,
} from "../../services/profileService";
import ProfileSummaryForm from "./components/ProfileSummaryForm";
import CoreContextEditor from "./components/CoreContextEditor";
import CoreResumeEditor from "./components/CoreResumeEditor";
import ProfileFreshnessWidget from "./components/ProfileFreshnessWidget";

const emptyProfile = {
  user: { id: "", email: "" },
  coreContext: {
    fullName: "",
    mobile: "",
    location: "",
    headline: "",
    rawSummaryMd: "",
    summaryUpdatedAt: null,
  },
  coreResumeMd: "",
  coreResumeUpdatedAt: null,
};

function useSaveStatus() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const resetSaved = useCallback(() => {
    const timer = setTimeout(() => setStatus("idle"), 2500);
    return () => clearTimeout(timer);
  }, []);

  const runSave = useCallback(async (saveFn) => {
    setStatus("saving");
    setError("");

    try {
      await saveFn();
      setStatus("saved");
      return true;
    } catch (saveError) {
      setStatus("error");
      setError(saveError.message || "Unable to save changes.");
      return false;
    }
  }, []);

  return { status, error, runSave, resetSaved };
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(emptyProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const basicSave = useSaveStatus();
  const contextSave = useSaveStatus();
  const resumeSave = useSaveStatus();

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");

    try {
      const response = await getProfile();
      setProfile({
        ...emptyProfile,
        ...response.data,
        user: { ...emptyProfile.user, ...response.data.user },
        coreContext: {
          ...emptyProfile.coreContext,
          ...response.data.coreContext,
        },
      });
    } catch (error) {
      setLoadError(error.message || "Unable to load profile.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    if (basicSave.status === "saved") {
      return basicSave.resetSaved();
    }
  }, [basicSave.status, basicSave.resetSaved]);

  useEffect(() => {
    if (contextSave.status === "saved") {
      return contextSave.resetSaved();
    }
  }, [contextSave.status, contextSave.resetSaved]);

  useEffect(() => {
    if (resumeSave.status === "saved") {
      return resumeSave.resetSaved();
    }
  }, [resumeSave.status, resumeSave.resetSaved]);

  const handleCoreContextFieldChange = (field, value) => {
    setProfile((current) => ({
      ...current,
      coreContext: {
        ...current.coreContext,
        [field]: value,
      },
    }));
  };

  const handleSaveProfile = async () => {
    const { coreContext } = profile;

    const saved = await basicSave.runSave(async () => {
      const response = await updateProfile({
        fullName: coreContext.fullName,
        mobile: coreContext.mobile,
        location: coreContext.location,
        headline: coreContext.headline,
      });

      setProfile((current) => ({
        ...current,
        coreContext: {
          ...current.coreContext,
          ...response.data.coreContext,
        },
      }));
    });

    return saved;
  };

  const handleSaveContext = async () => {
    const saved = await contextSave.runSave(async () => {
      const response = await updateCoreContext(profile.coreContext.rawSummaryMd);

      setProfile((current) => ({
        ...current,
        coreContext: {
          ...current.coreContext,
          rawSummaryMd: response.data.rawSummaryMd,
          summaryUpdatedAt: response.data.summaryUpdatedAt,
        },
      }));
    });

    return saved;
  };

  const handleSaveResume = async () => {
    const saved = await resumeSave.runSave(async () => {
      const response = await updateCoreResume(profile.coreResumeMd);

      setProfile((current) => ({
        ...current,
        coreResumeMd: response.data.coreResumeMd,
        coreResumeUpdatedAt: response.data.coreResumeUpdatedAt,
      }));
    });

    return saved;
  };

  const handleSaveAll = async () => {
    await handleSaveProfile();
    await handleSaveContext();
    await handleSaveResume();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          eyebrow="Profile"
          title="Core Context"
          description="Loading your profile..."
        />
        <p className="text-sm text-[var(--primary-600)]">Loading profile data…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          eyebrow="Profile"
          title="Core Context"
          description="The reusable foundation of your career evidence."
        />
        <div
          role="alert"
          className="rounded-md border border-[var(--error-100)] bg-[var(--error-100)]/40 px-4 py-3 text-sm text-[var(--error-600)]"
        >
          {loadError}
        </div>
        <Button type="button" onClick={loadProfile}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Profile"
        title="Core Context"
        description="The reusable foundation of your career evidence — used across opportunities and generated documents."
        actions={
          <Button type="button" variant="secondary" onClick={handleSaveAll}>
            Save all sections
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6">
          <ProfileSummaryForm
            email={profile.user.email}
            fullName={profile.coreContext.fullName}
            mobile={profile.coreContext.mobile}
            location={profile.coreContext.location}
            headline={profile.coreContext.headline}
            onChange={handleCoreContextFieldChange}
            onSave={handleSaveProfile}
            saveStatus={basicSave.status}
            saveError={basicSave.error}
          />

          <CoreContextEditor
            rawSummaryMd={profile.coreContext.rawSummaryMd}
            onChange={(value) => handleCoreContextFieldChange("rawSummaryMd", value)}
            onSave={handleSaveContext}
            saveStatus={contextSave.status}
            saveError={contextSave.error}
          />
        </div>

        <div className="flex flex-col gap-6">
          <ProfileFreshnessWidget profile={profile} />

          <CoreResumeEditor
            coreResumeMd={profile.coreResumeMd}
            onChange={(value) =>
              setProfile((current) => ({ ...current, coreResumeMd: value }))
            }
            onSave={handleSaveResume}
            saveStatus={resumeSave.status}
            saveError={resumeSave.error}
          />
        </div>
      </div>
    </div>
  );
}
