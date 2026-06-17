// server/src/middleware/evidence/validateExperienceBody.js

const Experience = require('../../models/Experience');
const { parseOptionalDate, parseStringArray } = require('../../utils/parseRequestFields');

const { EXPERIENCE_TYPES } = Experience;

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

const validateExperienceBody = (mode) => (req, res, next) => {
  try {
    const body = req.body || {};

    if (mode === 'create') {
      const { type, title } = body;

      if (!type || typeof type !== 'string') {
        return res.status(400).json({ message: 'type is required' });
      }

      if (!EXPERIENCE_TYPES.includes(type)) {
        return res.status(400).json({ message: 'Invalid experience type' });
      }

      if (!title || typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ message: 'title is required' });
      }

      req.validatedBody = {
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
      };

      return next();
    }

    if (mode === 'update') {
      const hasUpdate = UPDATABLE_FIELDS.some((field) => body[field] !== undefined);

      if (!hasUpdate) {
        return res.status(400).json({ message: 'At least one updatable field is required' });
      }

      const validatedBody = {};

      if (body.type !== undefined) {
        if (typeof body.type !== 'string' || !EXPERIENCE_TYPES.includes(body.type)) {
          return res.status(400).json({ message: 'Invalid experience type' });
        }

        validatedBody.type = body.type;
      }

      if (body.title !== undefined) {
        if (typeof body.title !== 'string' || !body.title.trim()) {
          return res.status(400).json({ message: 'title must be a non-empty string' });
        }

        validatedBody.title = body.title.trim();
      }

      if (body.organisation !== undefined) {
        if (typeof body.organisation !== 'string') {
          return res.status(400).json({ message: 'organisation must be a string' });
        }

        validatedBody.organisation = body.organisation.trim();
      }

      if (body.role !== undefined) {
        if (typeof body.role !== 'string') {
          return res.status(400).json({ message: 'role must be a string' });
        }

        validatedBody.role = body.role.trim();
      }

      if (body.dateStart !== undefined) {
        validatedBody.dateStart = parseOptionalDate(body.dateStart, 'dateStart');
      }

      if (body.dateEnd !== undefined) {
        validatedBody.dateEnd = parseOptionalDate(body.dateEnd, 'dateEnd');
      }

      if (body.isCurrent !== undefined) {
        if (typeof body.isCurrent !== 'boolean') {
          return res.status(400).json({ message: 'isCurrent must be a boolean' });
        }

        validatedBody.isCurrent = body.isCurrent;
      }

      if (body.overviewRaw !== undefined) {
        if (typeof body.overviewRaw !== 'string') {
          return res.status(400).json({ message: 'overviewRaw must be a string' });
        }

        validatedBody.overviewRaw = body.overviewRaw;
      }

      if (body.overviewPolished !== undefined) {
        if (typeof body.overviewPolished !== 'string') {
          return res.status(400).json({ message: 'overviewPolished must be a string' });
        }

        validatedBody.overviewPolished = body.overviewPolished;
      }

      if (body.technologies !== undefined) {
        validatedBody.technologies = parseStringArray(body.technologies, 'technologies');
      }

      if (body.skills !== undefined) {
        validatedBody.skills = parseStringArray(body.skills, 'skills');
      }

      req.validatedBody = validatedBody;
      return next();
    }

    return res.status(500).json({ message: 'Invalid experience validation mode' });
  } catch (error) {
    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      message: error.message || 'Experience validation error',
    });
  }
};

module.exports = validateExperienceBody;
