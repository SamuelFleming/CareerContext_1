// server/src/controllers/experienceController.js

const { notImplemented } = require('../utils/notImplemented');

const listExperiences = notImplemented(
  'GET /api/experiences',
  'List the current user’s experiences'
);

const createExperience = notImplemented(
  'POST /api/experiences',
  'Create a new experience'
);

const getExperienceById = notImplemented(
  'GET /api/experiences/:experienceId',
  'Load one experience by id'
);

const updateExperience = notImplemented(
  'PUT /api/experiences/:experienceId',
  'Update an existing experience'
);

const deleteExperience = notImplemented(
  'DELETE /api/experiences/:experienceId',
  'Delete or archive an experience'
);

const getExperienceWorkspace = notImplemented(
  'GET /api/experiences/:experienceId/workspace',
  'Load an experience workspace with related activities and journal entries'
);

const listActivitiesForExperience = notImplemented(
  'GET /api/experiences/:experienceId/activities',
  'List activities under a specific experience'
);

const createActivityForExperience = notImplemented(
  'POST /api/experiences/:experienceId/activities',
  'Create an activity under a specific experience'
);

const polishExperience = notImplemented(
  'POST /api/experiences/:experienceId/polish',
  'AI-polish an experience overview'
);

module.exports = {
  listExperiences,
  createExperience,
  getExperienceById,
  updateExperience,
  deleteExperience,
  getExperienceWorkspace,
  listActivitiesForExperience,
  createActivityForExperience,
  polishExperience,
};