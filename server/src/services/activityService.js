// server/src/services/activityService.js

const mongoose = require('mongoose');
const Activity = require('../models/Activity');
const { EVIDENCE_STRENGTHS } = Activity;
const { findOwnedExperience } = require('./experienceService');

const UPDATABLE_FIELDS = [
  'title',
  'rawDescription',
  'polishedSummary',
  'technologies',
  'skills',
  'outcomes',
  'evidenceStrength',
];

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const assertValidObjectId = (id, label = 'ID') => {
  if (!mongoose.isValidObjectId(id)) {
    throw createServiceError(400, `Invalid ${label}`);
  }
};

const parseStringArray = (value, fieldName) => {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    throw createServiceError(400, `${fieldName} must be an array`);
  }

  return value.map((item) => {
    if (typeof item !== 'string') {
      throw createServiceError(400, `${fieldName} must contain strings`);
    }

    return item.trim();
  });
};

const toActivity = (activity) => activity.toJSON();

const toParentExperience = (experience) => ({
  id: experience._id.toString(),
  title: experience.title,
});

const findOwnedActivity = async (userId, activityId) => {
  assertValidObjectId(userId, 'user ID');
  assertValidObjectId(activityId, 'activity ID');

  const activity = await Activity.findOne({
    _id: activityId,
    userId,
    isArchived: false,
  });

  if (!activity) {
    throw createServiceError(404, 'Activity not found');
  }

  return activity;
};

const listActivitiesForExperience = async (userId, experienceId) => {
  await findOwnedExperience(userId, experienceId);

  const activities = await Activity.find({
    userId,
    experienceId,
    isArchived: false,
  }).sort({ updatedAt: -1 });

  return activities.map(toActivity);
};

const createActivityForExperience = async (userId, experienceId, body) => {
  const experience = await findOwnedExperience(userId, experienceId);

  const { title } = body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    throw createServiceError(400, 'title is required');
  }

  if (body.evidenceStrength !== undefined && body.evidenceStrength !== null) {
    if (
      typeof body.evidenceStrength !== 'string' ||
      !EVIDENCE_STRENGTHS.includes(body.evidenceStrength)
    ) {
      throw createServiceError(400, 'Invalid evidence strength');
    }
  }

  const activity = new Activity({
    userId,
    experienceId: experience._id,
    title: title.trim(),
    rawDescription: typeof body.rawDescription === 'string' ? body.rawDescription : '',
    polishedSummary: typeof body.polishedSummary === 'string' ? body.polishedSummary : '',
    technologies: parseStringArray(body.technologies, 'technologies') ?? [],
    skills: parseStringArray(body.skills, 'skills') ?? [],
    outcomes: typeof body.outcomes === 'string' ? body.outcomes : '',
    evidenceStrength: body.evidenceStrength ?? null,
  });

  await activity.save();

  return toActivity(activity);
};

const getActivityById = async (userId, activityId) => {
  const activity = await findOwnedActivity(userId, activityId);
  const experience = await findOwnedExperience(userId, activity.experienceId.toString());

  return {
    activity: toActivity(activity),
    parentExperience: toParentExperience(experience),
  };
};

const updateActivity = async (userId, activityId, body) => {
  const activity = await findOwnedActivity(userId, activityId);

  const hasUpdate = UPDATABLE_FIELDS.some((field) => body[field] !== undefined);

  if (!hasUpdate) {
    throw createServiceError(400, 'At least one updatable field is required');
  }

  if (body.title !== undefined) {
    if (typeof body.title !== 'string' || !body.title.trim()) {
      throw createServiceError(400, 'title must be a non-empty string');
    }

    activity.title = body.title.trim();
  }

  if (body.rawDescription !== undefined) {
    if (typeof body.rawDescription !== 'string') {
      throw createServiceError(400, 'rawDescription must be a string');
    }

    activity.rawDescription = body.rawDescription;
  }

  if (body.polishedSummary !== undefined) {
    if (typeof body.polishedSummary !== 'string') {
      throw createServiceError(400, 'polishedSummary must be a string');
    }

    activity.polishedSummary = body.polishedSummary;
  }

  if (body.technologies !== undefined) {
    activity.technologies = parseStringArray(body.technologies, 'technologies');
  }

  if (body.skills !== undefined) {
    activity.skills = parseStringArray(body.skills, 'skills');
  }

  if (body.outcomes !== undefined) {
    if (typeof body.outcomes !== 'string') {
      throw createServiceError(400, 'outcomes must be a string');
    }

    activity.outcomes = body.outcomes;
  }

  if (body.evidenceStrength !== undefined) {
    if (body.evidenceStrength === null || body.evidenceStrength === '') {
      activity.evidenceStrength = null;
    } else if (
      typeof body.evidenceStrength !== 'string' ||
      !EVIDENCE_STRENGTHS.includes(body.evidenceStrength)
    ) {
      throw createServiceError(400, 'Invalid evidence strength');
    } else {
      activity.evidenceStrength = body.evidenceStrength;
    }
  }

  await activity.save();

  return toActivity(activity);
};

const archiveActivity = async (userId, activityId) => {
  const activity = await findOwnedActivity(userId, activityId);

  activity.isArchived = true;
  activity.archivedAt = new Date();

  await activity.save();
};

module.exports = {
  listActivitiesForExperience,
  createActivityForExperience,
  getActivityById,
  updateActivity,
  archiveActivity,
};
