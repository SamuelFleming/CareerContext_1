// server/src/middleware/evidence/loadOwnedActivity.js

const Activity = require('../../models/Activity');

const loadOwnedActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findOne({
      _id: req.params.activityId,
      userId: req.user.userId,
      isArchived: false,
    });

    if (!activity) {
      return res.status(404).json({
        message: 'Activity not found',
      });
    }

    req.activity = activity;
    return next();
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Activity error',
    });
  }
};

module.exports = loadOwnedActivity;
