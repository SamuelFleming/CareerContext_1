// server/src/services/profileService.js

const User = require('../models/User');
const coreContextService = require('./coreContextService');

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const findUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw createServiceError(404, 'User not found');
  }

  return user;
};

const toProfileResponse = (user, coreContext) => ({
  user: {
    id: user._id.toString(),
    email: user.email,
  },
  coreContext: coreContextService.toCoreContext(coreContext),
  coreResumeMd: user.coreResumeMd || '',
  coreResumeUpdatedAt: user.coreResumeUpdatedAt || null,
});

const getProfile = async (userId) => {
  const user = await findUserById(userId);
  const coreContext = await coreContextService.ensureForUser(user);

  return toProfileResponse(user, coreContext);
};

const updateProfile = async (userId, { fullName, mobile, location, headline }) => {
  if (
    fullName === undefined &&
    mobile === undefined &&
    location === undefined &&
    headline === undefined
  ) {
    throw createServiceError(
      400,
      'At least one of fullName, mobile, location, or headline is required'
    );
  }

  const user = await findUserById(userId);
  const coreContext = await coreContextService.ensureForUser(user);

  if (fullName !== undefined) {
    if (typeof fullName !== 'string' || !fullName.trim()) {
      throw createServiceError(400, 'fullName must be a non-empty string');
    }

    coreContext.fullName = fullName.trim();
  }

  if (mobile !== undefined) {
    if (typeof mobile !== 'string') {
      throw createServiceError(400, 'mobile must be a string');
    }

    coreContext.mobile = mobile.trim();
  }

  if (location !== undefined) {
    if (typeof location !== 'string') {
      throw createServiceError(400, 'location must be a string');
    }

    coreContext.location = location.trim();
  }

  if (headline !== undefined) {
    if (typeof headline !== 'string') {
      throw createServiceError(400, 'headline must be a string');
    }

    coreContext.headline = headline.trim();
  }

  await coreContext.save();

  return coreContextService.toCoreContext(coreContext);
};

const updateCoreContext = async (userId, body) => {
  const rawSummaryMd = body.rawSummaryMd ?? body.coreContextMd;

  if (rawSummaryMd === undefined) {
    throw createServiceError(400, 'rawSummaryMd is required');
  }

  if (typeof rawSummaryMd !== 'string') {
    throw createServiceError(400, 'rawSummaryMd must be a string');
  }

  const user = await findUserById(userId);
  const coreContext = await coreContextService.ensureForUser(user);

  coreContext.rawSummaryMd = rawSummaryMd;
  coreContext.summaryUpdatedAt = new Date();

  await coreContext.save();

  return {
    rawSummaryMd: coreContext.rawSummaryMd,
    summaryUpdatedAt: coreContext.summaryUpdatedAt,
  };
};

const updateCoreResume = async (userId, { coreResumeMd }) => {
  if (coreResumeMd === undefined) {
    throw createServiceError(400, 'coreResumeMd is required');
  }

  if (typeof coreResumeMd !== 'string') {
    throw createServiceError(400, 'coreResumeMd must be a string');
  }

  const user = await findUserById(userId);

  user.coreResumeMd = coreResumeMd;
  user.coreResumeUpdatedAt = new Date();

  await user.save();

  return {
    coreResumeMd: user.coreResumeMd,
    coreResumeUpdatedAt: user.coreResumeUpdatedAt,
  };
};

module.exports = {
  getProfile,
  updateProfile,
  updateCoreContext,
  updateCoreResume,
  toProfileResponse,
};
