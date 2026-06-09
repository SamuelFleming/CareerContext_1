// server/src/controllers/activityController.js

const { notImplemented } = require('../utils/notImplemented');

const getActivityById = notImplemented(
  'GET /api/activities/:activityId',
  'Load one activity by id'
);

const updateActivity = notImplemented(
  'PUT /api/activities/:activityId',
  'Update an existing activity'
);

const deleteActivity = notImplemented(
  'DELETE /api/activities/:activityId',
  'Delete or archive an activity'
);

const polishActivity = notImplemented(
  'POST /api/activities/:activityId/polish',
  'AI-polish activity content into reusable career evidence'
);

module.exports = {
  getActivityById,
  updateActivity,
  deleteActivity,
  polishActivity,
};