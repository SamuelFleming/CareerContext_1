// server/src/controllers/profileController.js

const profileService = require('../services/profileService');

const handleProfileError = (res, error) => {
  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    message: error.message || 'Profile error',
  });
};

const getProfile = async (req, res) => {
  try {
    const profile = await profileService.getProfile(req.user.userId);

    return res.status(200).json({ data: profile });
  } catch (error) {
    return handleProfileError(res, error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const profile = await profileService.updateProfile(req.user.userId, req.body);

    return res.status(200).json({
      message: 'Profile updated',
      data: { profile },
    });
  } catch (error) {
    return handleProfileError(res, error);
  }
};

const updateCoreContext = async (req, res) => {
  try {
    const result = await profileService.updateCoreContext(req.user.userId, req.body);

    return res.status(200).json({
      message: 'Core context updated',
      data: result,
    });
  } catch (error) {
    return handleProfileError(res, error);
  }
};

const updateCoreResume = async (req, res) => {
  try {
    const result = await profileService.updateCoreResume(req.user.userId, req.body);

    return res.status(200).json({
      message: 'Core resume updated',
      data: result,
    });
  } catch (error) {
    return handleProfileError(res, error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateCoreContext,
  updateCoreResume,
};
