// server/src/services/dashboardService.js

const User = require('../models/User');
const coreContextService = require('./coreContextService');
const { calculateProfileCompleteness } = require('./profileCompletenessService');
const {
  PHASE1_CORE_COMPETENCIES,
  PHASE1_HIGHLIGHT_EXPERIENCES,
} = require('../constants/phase1DashboardMocks');

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

const getDashboard = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw createServiceError(404, 'User not found');
  }

  const coreContext = await coreContextService.ensureForUser(user);
  const profileCompleteness = calculateProfileCompleteness(coreContext, user);
  const summaryPreview = buildPreview(coreContext.rawSummaryMd, 350);

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
    evidencePanel: {
      defaultView: 'evidenceSummary',
      evidenceSummary: {
        status: 'placeholder',
        message: 'Experience evidence comes next.',
        counts: {
          experiences: 0,
          activities: 0,
          journalEntries: 0,
        },
      },
      recentActivity: {
        status: 'placeholder',
        message: 'Your latest captured evidence will appear here.',
        items: [],
      },
    },
    phasePlaceholders: {
      experienceEvidence: 'planned',
      opportunities: 'planned',
      documents: 'planned',
    },
  };
};

module.exports = {
  getDashboard,
  buildPreview,
  isReviewSuggested,
};
