// server/src/controllers/profileController.js

const { notImplemented } = require('../utils/notImplemented');

const getProfile = notImplemented(
  'GET /api/profile',
  'Load profile, core context, and core resume content'
);

const updateProfile = notImplemented(
  'PUT /api/profile',
  'Update basic profile fields'
);

const updateCoreContext = notImplemented(
  'PUT /api/profile/core-context',
  'Update user core career context Markdown'
);

const updateCoreResume = notImplemented(
  'PUT /api/profile/core-resume',
  'Update user core resume Markdown'
);

module.exports = {
  getProfile,
  updateProfile,
  updateCoreContext,
  updateCoreResume,
};