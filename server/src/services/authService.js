// server/src/services/authService.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const SALT_ROUNDS = 10;

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const normaliseEmail = (email) => email.trim().toLowerCase();

const validateRegisterInput = ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw createServiceError(400, 'Name, email, and password are required');
  }

  if (typeof name !== 'string' || !name.trim()) {
    throw createServiceError(400, 'Name is required');
  }

  if (typeof email !== 'string' || !email.trim()) {
    throw createServiceError(400, 'Email is required');
  }

  if (typeof password !== 'string' || password.length < 6) {
    throw createServiceError(400, 'Password must be at least 6 characters');
  }
};

const validateLoginInput = ({ email, password }) => {
  if (!email || !password) {
    throw createServiceError(400, 'Email and password are required');
  }

  if (typeof email !== 'string' || !email.trim()) {
    throw createServiceError(400, 'Email is required');
  }

  if (typeof password !== 'string') {
    throw createServiceError(400, 'Password is required');
  }
};

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw createServiceError(500, 'JWT_SECRET is not configured');
  }

  return process.env.JWT_SECRET;
};

const buildTokenPayload = (user) => ({
  userId: user._id.toString(),
  email: user.email,
});

const generateToken = (user) => {
  return jwt.sign(buildTokenPayload(user), getJwtSecret(), {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
};

const toSafeUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  coreContextMd: user.coreContextMd,
  coreResumeMd: user.coreResumeMd,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const toAuthUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
});

const register = async ({ name, email, password }) => {
  validateRegisterInput({ name, email, password });

  const normalisedEmail = normaliseEmail(email);

  const existingUser = await User.findOne({ email: normalisedEmail });
  if (existingUser) {
    throw createServiceError(409, 'A user with this email already exists');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  try {
    const user = await User.create({
      name: name.trim(),
      email: normalisedEmail,
      passwordHash,
      coreContextMd: '',
      coreResumeMd: '',
    });

    return {
      token: generateToken(user),
      user: toAuthUser(user),
    };
  } catch (error) {
    if (error.code === 11000) {
      throw createServiceError(409, 'A user with this email already exists');
    }

    throw error;
  }
};

const login = async ({ email, password }) => {
  validateLoginInput({ email, password });

  const normalisedEmail = normaliseEmail(email);

  const user = await User.findOne({ email: normalisedEmail }).select('+passwordHash');

  if (!user) {
    throw createServiceError(401, 'Invalid email or password');
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    throw createServiceError(401, 'Invalid email or password');
  }

  return {
    token: generateToken(user),
    user: toAuthUser(user),
  };
};

const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw createServiceError(404, 'User not found');
  }

  return {
    user: toSafeUser(user),
  };
};

module.exports = {
  register,
  login,
  getCurrentUser,
  toSafeUser,
};