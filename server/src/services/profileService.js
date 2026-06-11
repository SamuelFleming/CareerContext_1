// server/src/services/profileService.js

const User = require('../models/User');

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const toProfile = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  headline: user.headline || '',
  coreContextMd: user.coreContextMd || '',
  coreContextUpdatedAt: user.coreContextUpdatedAt || null,
  coreResumeMd: user.coreResumeMd || '',
  coreResumeUpdatedAt: user.coreResumeUpdatedAt || null,
});

const findUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw createServiceError(404, 'User not found');
  }

  return user;
};

const getProfile = async (userId) => {
  const user = await findUserById(userId);

  return toProfile(user);
};

const updateProfile = async (userId, { name, headline }) => {
  if (name === undefined && headline === undefined) {
    throw createServiceError(400, 'At least one of name or headline is required');
  }

  const user = await findUserById(userId);

  if (name !== undefined) {
    if (typeof name !== 'string' || !name.trim()) {
      throw createServiceError(400, 'Name must be a non-empty string');
    }

    user.name = name.trim();
  }

  if (headline !== undefined) {
    if (typeof headline !== 'string') {
      throw createServiceError(400, 'Headline must be a string');
    }

    user.headline = headline.trim();
  }

  await user.save();

  return toProfile(user);
};

const updateCoreContext = async (userId, { coreContextMd }) => {
  if (coreContextMd === undefined) {
    throw createServiceError(400, 'coreContextMd is required');
  }

  if (typeof coreContextMd !== 'string') {
    throw createServiceError(400, 'coreContextMd must be a string');
  }

  const user = await findUserById(userId);

  user.coreContextMd = coreContextMd;
  user.coreContextUpdatedAt = new Date();

  await user.save();

  return {
    coreContextMd: user.coreContextMd,
    coreContextUpdatedAt: user.coreContextUpdatedAt,
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
  toProfile,
};
