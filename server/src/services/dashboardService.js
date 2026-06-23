// server/src/services/dashboardService.js

const User = require('../models/User');
const Experience = require('../models/Experience');
const Activity = require('../models/Activity');
const coreContextService = require('./coreContextService');
const { calculateProfileCompleteness } = require('./profileCompletenessService');
const { PHASE1_CORE_COMPETENCIES } = require('../constants/phase1DashboardMocks');

const HIGHLIGHT_EXPERIENCE_LIMIT = 3;
const DESCRIPTION_PREVIEW_LENGTH = 120;
const TOP_TERMS_LIMIT = 5;
const RECENT_ACTIVITY_LIMIT = 4;

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const buildPreview = (text, maxLength) => {
  const trimmed = (text || '').trim();

  if (!trimmed) {
    return null;
  }

  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  return `${trimmed.slice(0, maxLength).trimEnd()}…`;
};

const isReviewSuggested = (updatedAt, days = 30) => {
  if (!updatedAt) {
    return false;
  }

  const threshold = Date.now() - days * 24 * 60 * 60 * 1000;
  return new Date(updatedAt).getTime() < threshold;
};

const formatDatePart = (value) => {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat('en-AU', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
};

const formatExperienceDateRange = ({ dateStart, dateEnd, isCurrent }) => {
  const start = formatDatePart(dateStart);
  const end = isCurrent ? 'Present' : formatDatePart(dateEnd);

  if (start && end) {
    return `${start} – ${end}`;
  }

  if (start) {
    return start;
  }

  if (end) {
    return end;
  }

  return null;
};

const formatHighlightMeta = (experience) => {
  const organisation = (experience.organisation || '').trim();
  const dateRange = formatExperienceDateRange(experience);

  return [organisation, dateRange].filter(Boolean).join(' · ') || null;
};

const buildCoreCompetenciesScaffold = () => ({
  status: 'scaffold',
  source: 'dashboard_mock',
  message: 'Profile-level competencies will be AI-derived in a future phase.',
  items: PHASE1_CORE_COMPETENCIES.map((label) => ({ label })),
});

const buildHighlightExperiences = async (userId) => {
  const experiences = await Experience.find({ userId, isArchived: false })
    .sort({ updatedAt: -1 })
    .limit(HIGHLIGHT_EXPERIENCE_LIMIT)
    .select(
      'type title organisation dateStart dateEnd isCurrent overviewRaw overviewPolished skills technologies'
    );

  return experiences.map((experience) => {
    const id = experience._id.toString();
    const descriptionSource = (
      experience.overviewPolished ||
      experience.overviewRaw ||
      ''
    ).trim();

    return {
      id,
      type: experience.type,
      title: experience.title,
      meta: formatHighlightMeta(experience),
      descriptionPreview: buildPreview(
        descriptionSource,
        DESCRIPTION_PREVIEW_LENGTH
      ),
      skills: experience.skills || [],
      technologies: experience.technologies || [],
      href: `/experiences/${id}`,
    };
  });
};

const aggregateTopSkillsAndTechnologies = (entities) => {
  const termMap = new Map();

  const addTerms = (terms, kind) => {
    for (const raw of terms || []) {
      const trimmed = raw.trim();

      if (!trimmed) {
        continue;
      }

      const key = trimmed.toLowerCase();
      const existing = termMap.get(key);

      if (existing) {
        existing.count += 1;
      } else {
        termMap.set(key, { label: trimmed, kind, count: 1 });
      }
    }
  };

  for (const entity of entities) {
    addTerms(entity.skills, 'skill');
    addTerms(entity.technologies, 'technology');
  }

  return [...termMap.values()]
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }

      return a.label.localeCompare(b.label, undefined, { sensitivity: 'base' });
    })
    .slice(0, TOP_TERMS_LIMIT)
    .map(({ label, kind }) => ({ label, kind }));
};

const buildTopSkillsAndTechnologies = async (userId) => {
  const activeFilter = { userId, isArchived: false };

  const [experiences, activities] = await Promise.all([
    Experience.find(activeFilter).select('skills technologies'),
    Activity.find(activeFilter).select('skills technologies'),
  ]);

  return aggregateTopSkillsAndTechnologies([...experiences, ...activities]);
};

const buildEvidencePanel = async (userId) => {
  const activeFilter = { userId, isArchived: false };

  const [experienceCount, activityCount, recentExperiences, recentActivities] =
    await Promise.all([
      Experience.countDocuments(activeFilter),
      Activity.countDocuments(activeFilter),
      Experience.find(activeFilter)
        .sort({ updatedAt: -1 })
        .limit(RECENT_ACTIVITY_LIMIT)
        .select('title updatedAt'),
      Activity.find(activeFilter)
        .sort({ updatedAt: -1 })
        .limit(RECENT_ACTIVITY_LIMIT)
        .select('title updatedAt'),
    ]);

  const counts = {
    experiences: experienceCount,
    activities: activityCount,
    journalEntries: 0,
  };

  const hasEvidence = experienceCount > 0 || activityCount > 0;

  const recentItems = [
    ...recentExperiences.map((experience) => ({
      id: experience._id.toString(),
      entityType: 'experience',
      title: experience.title,
      updatedAt: experience.updatedAt,
      href: `/experiences/${experience._id.toString()}`,
    })),
    ...recentActivities.map((activity) => ({
      id: activity._id.toString(),
      entityType: 'activity',
      title: activity.title,
      updatedAt: activity.updatedAt,
      href: `/activities/${activity._id.toString()}`,
    })),
  ]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, RECENT_ACTIVITY_LIMIT);

  return {
    defaultView: 'recentActivity',
    evidenceSummary: {
      status: hasEvidence ? 'ready' : 'empty',
      message: hasEvidence
        ? null
        : 'No experiences yet. Add evidence from the Experiences workspace.',
      counts,
    },
    recentActivity: {
      status: recentItems.length > 0 ? 'ready' : 'empty',
      message:
        recentItems.length > 0
          ? null
          : 'Your latest captured evidence will appear here.',
      items: recentItems,
    },
    recentOpportunities: {
      status: 'not_implemented',
      message: 'Opportunity tracking arrives in Phase 3.',
      items: [],
    },
  };
};

const getDashboard = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw createServiceError(404, 'User not found');
  }

  const coreContext = await coreContextService.ensureForUser(user);
  const profileCompleteness = calculateProfileCompleteness(coreContext, user);
  const summaryPreview = buildPreview(coreContext.rawSummaryMd, 350);

  const [evidencePanel, highlightExperiences, topSkillsAndTechnologies] =
    await Promise.all([
      buildEvidencePanel(userId),
      buildHighlightExperiences(userId),
      buildTopSkillsAndTechnologies(userId),
    ]);

  return {
    identity: {
      fullName: coreContext.fullName || user.name || '',
      headline: coreContext.headline || '',
      email: user.email,
      mobile: coreContext.mobile || '',
      location: coreContext.location || '',
    },
    profileCompleteness,
    interactiveCv: {
      summaryPreview,
      summaryUpdatedAt: coreContext.summaryUpdatedAt || null,
      reviewSuggested: isReviewSuggested(coreContext.summaryUpdatedAt),
      coreCompetencies: buildCoreCompetenciesScaffold(),
      topSkillsAndTechnologies,
      highlightExperiences,
    },
    evidencePanel,
    phasePlaceholders: {
      experienceEvidence: 'available',
      opportunities: 'planned',
      documents: 'planned',
    },
  };
};

module.exports = {
  getDashboard,
  buildPreview,
  isReviewSuggested,
  buildEvidencePanel,
  buildHighlightExperiences,
  buildTopSkillsAndTechnologies,
  buildCoreCompetenciesScaffold,
};
