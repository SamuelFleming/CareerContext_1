// server/src/services/dashboardService.js

const User = require('../models/User');
const coreContextService = require('./coreContextService');

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const buildSummaryPreview = (rawSummaryMd, maxLength = 200) => {
  const trimmed = (rawSummaryMd || '').trim();

  if (!trimmed) {
    return null;
  }

  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  return `${trimmed.slice(0, maxLength).trimEnd()}...`;
};

const getDashboard = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw createServiceError(404, 'User not found');
  }

  const coreContext = await coreContextService.ensureForUser(user);
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
  };
};

module.exports = {
  getDashboard,
};
