// server/src/services/dashboardService.js

const User = require('../models/User');
const coreContextService = require('./coreContextService');

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

<<<<<<< Updated upstream
const buildSummaryPreview = (rawSummaryMd, maxLength = 200) => {
  const trimmed = (rawSummaryMd || '').trim();
=======
const COMPLETENESS_RULES = [
  { key: 'fullName', weight: 15, label: 'Add your full name', isComplete: (cc) => Boolean(cc.fullName?.trim()) },
  { key: 'headline', weight: 15, label: 'Add a headline', isComplete: (cc) => Boolean(cc.headline?.trim()) },
  { key: 'location', weight: 10, label: 'Add your location', isComplete: (cc) => Boolean(cc.location?.trim()) },
  {
    key: 'rawSummaryMd',
    weight: 30,
    label: 'Write your career summary',
    isComplete: (cc) => (cc.rawSummaryMd || '').trim().length >= 100,
  },
  {
    key: 'coreResumeMd',
    weight: 30,
    label: 'Add your core resume',
    isComplete: (_cc, user) => (user.coreResumeMd || '').trim().length >= 100,
  },
];

const buildPreview = (text, maxLength) => {
  const trimmed = (text || '').trim();
>>>>>>> Stashed changes

  if (!trimmed) {
    return null;
  }

  if (trimmed.length <= maxLength) {
    return trimmed;
  }

<<<<<<< Updated upstream
  return `${trimmed.slice(0, maxLength).trimEnd()}...`;
=======
  return `${trimmed.slice(0, maxLength).trimEnd()}…`;
};

const isReviewSuggested = (updatedAt, days = 30) => {
  if (!updatedAt) {
    return false;
  }

  const threshold = Date.now() - days * 24 * 60 * 60 * 1000;
  return new Date(updatedAt).getTime() < threshold;
};

const calculateProfileCompleteness = (coreContext, user) => {
  let score = 0;
  const missing = [];

  for (const rule of COMPLETENESS_RULES) {
    if (rule.isComplete(coreContext, user)) {
      score += rule.weight;
    } else {
      missing.push(rule.key === 'rawSummaryMd' ? 'rawSummaryMd' : rule.key);
    }
  }

  let status = 'empty';
  if (score >= 75) {
    status = 'ready';
  } else if (score >= 25) {
    status = 'in_progress';
  }

  const nextRule = COMPLETENESS_RULES.find((rule) => missing.includes(rule.key));

  return {
    score,
    status,
    showPrompt: status !== 'ready',
    missing,
    nextAction: nextRule
      ? {
          label: nextRule.label,
          to: '/profile',
        }
      : null,
  };
>>>>>>> Stashed changes
};

const getDashboard = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw createServiceError(404, 'User not found');
  }

  const coreContext = await coreContextService.ensureForUser(user);
<<<<<<< Updated upstream
  const rawSummary = coreContext.rawSummaryMd || '';

  return {
    profile: {
      fullName: coreContext.fullName || user.name || '',
      headline: coreContext.headline || '',
      hasCoreContext: Boolean(rawSummary.trim()),
      hasCoreResume: Boolean((user.coreResumeMd || '').trim()),
      summaryUpdatedAt: coreContext.summaryUpdatedAt || null,
      summaryPreview: buildSummaryPreview(rawSummary),
    },
    counts: {
      experiences: 0,
      activities: 0,
      opportunities: 0,
      documents: 0,
      journalEntries: 0,
    },
    recentExperiences: [],
    recentOpportunities: [],
    recentDocuments: [],
    recentJournalEntries: [],
=======
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
      coreCompetencies: [],
      highlightExperiences: [],
    },
    coreResumePreview: {
      exists: Boolean((user.coreResumeMd || '').trim()),
      previewMd: buildPreview(user.coreResumeMd, 200),
      updatedAt: user.coreResumeUpdatedAt || null,
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
    quickActions: [
      { label: 'Edit Core Context', to: '/profile', enabled: true },
      { label: 'Add Experience', to: '/experiences', enabled: false, badge: 'Coming soon' },
      { label: 'Add Opportunity', to: '/opportunities', enabled: false, badge: 'Coming soon' },
      { label: 'Open Journal', to: '/journal', enabled: false, badge: 'Coming soon' },
    ],
    phasePlaceholders: {
      experienceEvidence: 'planned',
      opportunities: 'planned',
      documents: 'planned',
    },
>>>>>>> Stashed changes
  };
};

module.exports = {
  getDashboard,
<<<<<<< Updated upstream
=======
  calculateProfileCompleteness,
  buildPreview,
  isReviewSuggested,
>>>>>>> Stashed changes
};
