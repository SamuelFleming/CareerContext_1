// server/src/controllers/experienceController.js

const experienceService = require('../services/experienceService');
const activityService = require('../services/activityService');
const { notImplemented } = require('../utils/notImplemented');

const handleExperienceError = (res, error) => {
  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    message: error.message || 'Experience error',
  });
};

const listExperiences = async (req, res) => {
  try {
    const data = await experienceService.listExperiences(req.user.userId, req.query);

    return res.status(200).json({
      data,
      meta: { count: data.length },
    });
  } catch (error) {
    return handleExperienceError(res, error);
  }
};

const createExperience = async (req, res) => {
  try {
    const experience = await experienceService.createExperience(
      req.user.userId,
      req.validatedBody
    );

    return res.status(201).json({
      message: 'Experience created',
      data: {
        experience: {
          id: experience.id,
        },
      },
    });
  } catch (error) {
    return handleExperienceError(res, error);
  }
};

const getExperienceById = async (req, res) => {
  try {
    const experience = await experienceService.getExperienceById(req.experience);

    return res.status(200).json({
      data: { experience },
    });
  } catch (error) {
    return handleExperienceError(res, error);
  }
};

const updateExperience = async (req, res) => {
  try {
    const experience = await experienceService.updateExperience(
      req.experience,
      req.validatedBody
    );

    return res.status(200).json({
      message: 'Experience updated',
      data: { experience },
    });
  } catch (error) {
    return handleExperienceError(res, error);
  }
};

const deleteExperience = async (req, res) => {
  try {
    await experienceService.archiveExperience(req.experience);

    return res.status(200).json({
      message: 'Experience archived',
    });
  } catch (error) {
    return handleExperienceError(res, error);
  }
};

const getExperienceWorkspace = async (req, res) => {
  try {
    const workspace = await experienceService.getExperienceWorkspace(req.experience);

    return res.status(200).json({
      data: workspace,
    });
  } catch (error) {
    return handleExperienceError(res, error);
  }
};

const listActivitiesForExperience = async (req, res) => {
  try {
    const data = await activityService.listActivitiesForExperience(req.experience);

    return res.status(200).json({
      data,
      meta: { count: data.length },
    });
  } catch (error) {
    return handleExperienceError(res, error);
  }
};

const createActivityForExperience = async (req, res) => {
  try {
    const activity = await activityService.createActivityForExperience(
      req.experience,
      req.validatedBody
    );

    return res.status(201).json({
      message: 'Activity created',
      data: {
        activity: {
          id: activity.id,
        },
      },
    });
  } catch (error) {
    return handleExperienceError(res, error);
  }
};

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
