// server/src/services/coreContextService.js

const mongoose = require('mongoose');

const CoreContext = require('../models/CoreContext');
const User = require('../models/User');

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const toCoreContext = (coreContext) => ({
  fullName: coreContext.fullName || '',
  mobile: coreContext.mobile || '',
  location: coreContext.location || '',
  headline: coreContext.headline || '',
  rawSummaryMd: coreContext.rawSummaryMd || '',
  summaryUpdatedAt: coreContext.summaryUpdatedAt || null,
});

const getLegacyUserFields = async (userId) => {
  const rawUser = await User.collection.findOne({
    _id: new mongoose.Types.ObjectId(userId),
  });

  if (!rawUser) {
    return null;
  }

  return {
    name: rawUser.name || '',
    headline: rawUser.headline || '',
    coreContextMd: rawUser.coreContextMd || '',
    coreContextUpdatedAt: rawUser.coreContextUpdatedAt || null,
  };
};

const ensureForUser = async (user) => {
  let coreContext = await CoreContext.findOne({ userId: user._id });

  if (coreContext) {
    return coreContext;
  }

  const legacy = await getLegacyUserFields(user._id.toString());

  coreContext = await CoreContext.create({
    userId: user._id,
    fullName: legacy?.name || user.name || '',
    headline: legacy?.headline || '',
    rawSummaryMd: legacy?.coreContextMd || '',
    summaryUpdatedAt: legacy?.coreContextUpdatedAt || null,
  });

  return coreContext;
};

const findForUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw createServiceError(404, 'User not found');
  }

  return ensureForUser(user);
};

module.exports = {
  ensureForUser,
  findForUser,
  toCoreContext,
};
