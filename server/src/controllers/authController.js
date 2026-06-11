// server/src/controllers/authController.js

const authService = require('../services/authService');

const handleAuthError = (res, error) => {
  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    message: error.message || 'Authentication error',
  });
};

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);

    return res.status(201).json(result);
  } catch (error) {
    return handleAuthError(res, error);
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    return res.status(200).json(result);
  } catch (error) {
    return handleAuthError(res, error);
  }
};

const getMe = async (req, res) => {
  try {
    const result = await authService.getCurrentUser(req.user._id);

    return res.status(200).json(result);
  } catch (error) {
    return handleAuthError(res, error);
  }
};

module.exports = {
  register,
  login,
  getMe,
};