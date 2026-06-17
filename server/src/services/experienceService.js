// server/src/services/experienceService.js

const mongoose = require('mongoose');
const Experience = require('../models/Experience');
const Activity = require('../models/Activity');

const { EXPERIENCE_TYPES } = Experience;

const DEFAULT_LIST_LIMIT = 50;
const MAX_LIST_LIMIT = 100;

const UPDATABLE_FIELDS = [
  'type',
  'title',
  'organisation',
  'role',
  'dateStart',
  'dateEnd',
  'isCurrent',
  'overviewRaw',
  'overviewPolished',
  'technologies',
  'skills',
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

const parseOptionalDate = (value, fieldName) => {
  if (value === undefined) {
    return undefined;
  }

  if (value === null || value === '') {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw createServiceError(400, `${fieldName} must be a valid date`);
  }

  return date;
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

const toExperience = (experience) => experience.toJSON();

const toListItem = (experience, activityCount = 0) => {
  const json = toExperience(experience);

  return {
    id: json.id,
    type: json.type,
    title: json.title,
    organisation: json.organisation,
    role: json.role,
    dateStart: json.dateStart,
    dateEnd: json.dateEnd,
    isCurrent: json.isCurrent,
    activityCount,
    updatedAt: json.updatedAt,
  };
};

const buildOwnedExperienceQuery = (userId, experienceId) => {
  assertValidObjectId(userId, 'user ID');
  assertValidObjectId(experienceId, 'experience ID');

  return {
    _id: experienceId,
    userId,
    isArchived: false,
  };
};

const findOwnedExperience = async (userId, experienceId) => {
  const experience = await Experience.findOne(buildOwnedExperienceQuery(userId, experienceId));

  if (!experience) {
    throw createServiceError(404, 'Experience not found');
  }

  return experience;
};

const getActivityCountsByExperienceIds = async (experienceIds) => {
  if (!experienceIds.length) {
    return new Map();
  }

  const counts = await Activity.aggregate([
    {
      $match: {
        experienceId: { $in: experienceIds },
        isArchived: false,
      },
    },
    {
      $group: {
        _id: '$experienceId',
        count: { $sum: 1 },
      },
    },
  ]);

  return new Map(counts.map(({ _id, count }) => [_id.toString(), count]));
};

const listExperiences = async (userId, { type, search, limit } = {}) => {
  assertValidObjectId(userId, 'user ID');

  const filter = {
    userId,
    isArchived: false,
  };

  if (type !== undefined && type !== '') {
    if (!EXPERIENCE_TYPES.includes(type)) {
      throw createServiceError(400, 'Invalid experience type');
    }

    filter.type = type;
  }

  if (search !== undefined && search.trim() !== '') {
    const pattern = new RegExp(search.trim(), 'i');
    filter.$or = [{ title: pattern }, { organisation: pattern }, { role: pattern }];
  }

  let parsedLimit = DEFAULT_LIST_LIMIT;

  if (limit !== undefined && limit !== '') {
    parsedLimit = Number.parseInt(limit, 10);

    if (Number.isNaN(parsedLimit) || parsedLimit < 1) {
      throw createServiceError(400, 'limit must be a positive integer');
    }

    parsedLimit = Math.min(parsedLimit, MAX_LIST_LIMIT);
  }

  const experiences = await Experience.find(filter)
    .sort({ updatedAt: -1 })
    .limit(parsedLimit);

  const activityCounts = await getActivityCountsByExperienceIds(
    experiences.map((experience) => experience._id)
  );

  return experiences.map((experience) =>
    toListItem(experience, activityCounts.get(experience._id.toString()) || 0)
  );
};

const createExperience = async (userId, body) => {
  assertValidObjectId(userId, 'user ID');

  const { type, title } = body;

  if (!type || typeof type !== 'string') {
    throw createServiceError(400, 'type is required');
  }

  if (!EXPERIENCE_TYPES.includes(type)) {
    throw createServiceError(400, 'Invalid experience type');
  }

  if (!title || typeof title !== 'string' || !title.trim()) {
    throw createServiceError(400, 'title is required');
  }

  const experience = new Experience({
    userId,
    type,
    title: title.trim(),
    organisation: typeof body.organisation === 'string' ? body.organisation.trim() : '',
    role: typeof body.role === 'string' ? body.role.trim() : '',
    dateStart: parseOptionalDate(body.dateStart, 'dateStart') ?? null,
    dateEnd: parseOptionalDate(body.dateEnd, 'dateEnd') ?? null,
    isCurrent: body.isCurrent === true,
    overviewRaw: typeof body.overviewRaw === 'string' ? body.overviewRaw : '',
    overviewPolished:
      typeof body.overviewPolished === 'string' ? body.overviewPolished : '',
    technologies: parseStringArray(body.technologies, 'technologies') ?? [],
    skills: parseStringArray(body.skills, 'skills') ?? [],
  });

  await experience.save();

  return toExperience(experience);
};

const getExperienceById = async (userId, experienceId) => {
  const experience = await findOwnedExperience(userId, experienceId);
  return toExperience(experience);
};

const updateExperience = async (userId, experienceId, body) => {
  const experience = await findOwnedExperience(userId, experienceId);

  const hasUpdate = UPDATABLE_FIELDS.some((field) => body[field] !== undefined);

  if (!hasUpdate) {
    throw createServiceError(400, 'At least one updatable field is required');
  }

  if (body.type !== undefined) {
    if (typeof body.type !== 'string' || !EXPERIENCE_TYPES.includes(body.type)) {
      throw createServiceError(400, 'Invalid experience type');
    }

    experience.type = body.type;
  }

  if (body.title !== undefined) {
    if (typeof body.title !== 'string' || !body.title.trim()) {
      throw createServiceError(400, 'title must be a non-empty string');
    }

    experience.title = body.title.trim();
  }

  if (body.organisation !== undefined) {
    if (typeof body.organisation !== 'string') {
      throw createServiceError(400, 'organisation must be a string');
    }

    experience.organisation = body.organisation.trim();
  }

  if (body.role !== undefined) {
    if (typeof body.role !== 'string') {
      throw createServiceError(400, 'role must be a string');
    }

    experience.role = body.role.trim();
  }

  if (body.dateStart !== undefined) {
    experience.dateStart = parseOptionalDate(body.dateStart, 'dateStart');
  }

  if (body.dateEnd !== undefined) {
    experience.dateEnd = parseOptionalDate(body.dateEnd, 'dateEnd');
  }

  if (body.isCurrent !== undefined) {
    if (typeof body.isCurrent !== 'boolean') {
      throw createServiceError(400, 'isCurrent must be a boolean');
    }

    experience.isCurrent = body.isCurrent;
  }

  if (body.overviewRaw !== undefined) {
    if (typeof body.overviewRaw !== 'string') {
      throw createServiceError(400, 'overviewRaw must be a string');
    }

    experience.overviewRaw = body.overviewRaw;
  }

  if (body.overviewPolished !== undefined) {
    if (typeof body.overviewPolished !== 'string') {
      throw createServiceError(400, 'overviewPolished must be a string');
    }

    experience.overviewPolished = body.overviewPolished;
  }

  if (body.technologies !== undefined) {
    experience.technologies = parseStringArray(body.technologies, 'technologies');
  }

  if (body.skills !== undefined) {
    experience.skills = parseStringArray(body.skills, 'skills');
  }

  await experience.save();

  return toExperience(experience);
};

const archiveExperience = async (userId, experienceId) => {
  const experience = await findOwnedExperience(userId, experienceId);

  experience.isArchived = true;
  experience.archivedAt = new Date();

  await experience.save();
};

module.exports = {
  listExperiences,
  createExperience,
  getExperienceById,
  updateExperience,
  archiveExperience,
};
