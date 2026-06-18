// server/src/services/dashboardService.js

const User = require('../models/User');
const Experience = require('../models/Experience');
const Activity = require('../models/Activity');
const coreContextService = require('./coreContextService');
const { calculateProfileCompleteness } = require('./profileCompletenessService');
const {
  PHASE1_CORE_COMPETENCIES,
  PHASE1_HIGHLIGHT_EXPERIENCES,
} = require('../constants/phase1DashboardMocks');

const RECENT_ACTIVITY_LIMIT = 10;

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
    defaultView: 'evidenceSummary',
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
  const evidencePanel = await buildEvidencePanel(userId);

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
      coreCompetencies: PHASE1_CORE_COMPETENCIES,
      highlightExperiences: PHASE1_HIGHLIGHT_EXPERIENCES,
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
};
