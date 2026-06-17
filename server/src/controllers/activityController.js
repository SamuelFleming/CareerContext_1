// server/src/controllers/activityController.js

const activityService = require('../services/activityService');
const { notImplemented } = require('../utils/notImplemented');

const handleActivityError = (res, error) => {
  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    message: error.message || 'Activity error',
  });
};

const getActivityById = async (req, res) => {
  try {
    const data = await activityService.getActivityById(req.user.userId, req.params.activityId);

    return res.status(200).json({ data });
  } catch (error) {
    return handleActivityError(res, error);
  }
};

const updateActivity = async (req, res) => {
  try {
    const activity = await activityService.updateActivity(
      req.user.userId,
      req.params.activityId,
      req.body
    );

    return res.status(200).json({
      message: 'Activity updated',
      data: { activity },
    });
  } catch (error) {
    return handleActivityError(res, error);
  }
};

const deleteActivity = async (req, res) => {
  try {
    await activityService.archiveActivity(req.user.userId, req.params.activityId);

    return res.status(200).json({
      message: 'Activity archived',
    });
  } catch (error) {
    return handleActivityError(res, error);
  }
};

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
