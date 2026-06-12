// server/src/services/profileCompletenessService.js
// Shared profile completion rules — used by dashboard and profile endpoints.

const COMPLETENESS_CHECKS = [
  {
    key: 'fullName',
    label: 'Full name',
    nextActionLabel: 'Add your full name',
    isComplete: (coreContext) => Boolean(coreContext.fullName?.trim()),
  },
  {
    key: 'headline',
    label: 'Headline',
    nextActionLabel: 'Add a headline',
    isComplete: (coreContext) => Boolean(coreContext.headline?.trim()),
  },
  {
    key: 'location',
    label: 'Location',
    nextActionLabel: 'Add your location',
    isComplete: (coreContext) => Boolean(coreContext.location?.trim()),
  },
  {
    key: 'rawSummaryMd',
    label: 'Career summary',
    nextActionLabel: 'Write your career summary',
    isComplete: (coreContext) => Boolean(coreContext.rawSummaryMd?.trim()),
  },
  {
    key: 'coreResumeMd',
    label: 'Core resume',
    nextActionLabel: 'Add your core resume',
    isComplete: (_coreContext, user) => Boolean((user.coreResumeMd || '').trim()),
  },
];

const calculateProfileCompleteness = (coreContext, user) => {
  const checks = COMPLETENESS_CHECKS.map((check) => ({
    key: check.key,
    label: check.label,
    done: check.isComplete(coreContext, user),
  }));

  const completed = checks.filter((check) => check.done).length;
  const total = checks.length;
  const score = Math.round((completed / total) * 100);
  const missing = checks.filter((check) => !check.done).map((check) => check.key);
  const nextCheck = COMPLETENESS_CHECKS.find((check) => missing.includes(check.key));

  let status = 'in_progress';
  if (completed === 0) {
    status = 'empty';
  } else if (completed === total) {
    status = 'ready';
  }

  return {
    score,
    completed,
    total,
    status,
    showPrompt: completed < total,
    checks,
    missing,
    nextAction: nextCheck
      ? {
          label: nextCheck.nextActionLabel,
          to: '/profile',
        }
      : null,
  };
};

module.exports = {
  calculateProfileCompleteness,
  COMPLETENESS_CHECKS,
};
