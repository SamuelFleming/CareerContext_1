// server/src/controllers/authController.js

const { notImplemented } = require('../utils/notImplemented');

const register = notImplemented(
  'POST /api/auth/register',
  'Register a new user account'
);

const login = notImplemented(
  'POST /api/auth/login',
  'Authenticate an existing user and return a JWT/user payload'
);

const getMe = notImplemented(
  'GET /api/auth/me',
  'Return the currently authenticated user'
);

module.exports = {
  register,
  login,
  getMe,
};