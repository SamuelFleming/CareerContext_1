// server/src/middleware/evidence/validateActivityBody.js

const Activity = require('../../models/Activity');
const { parseStringArray } = require('../../utils/parseRequestFields');

const { EVIDENCE_STRENGTHS } = Activity;

const UPDATABLE_FIELDS = [
  'title',
  'rawDescription',
  'polishedSummary',
  'technologies',
  'skills',
  'outcomes',
  'evidenceStrength',
];

const validateEvidenceStrength = (value) => {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  if (typeof value !== 'string' || !EVIDENCE_STRENGTHS.includes(value)) {
    const error = new Error('Invalid evidence strength');
    error.statusCode = 400;
    throw error;
  }

  return value;
};

const validateActivityBody = (mode) => (req, res, next) => {
  try {
    const body = req.body || {};

    if (mode === 'create') {
      const { title } = body;

      if (!title || typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ message: 'title is required' });
      }

      req.validatedBody = {
        title: title.trim(),
        rawDescription: typeof body.rawDescription === 'string' ? body.rawDescription : '',
        polishedSummary: typeof body.polishedSummary === 'string' ? body.polishedSummary : '',
        technologies: parseStringArray(body.technologies, 'technologies') ?? [],
        skills: parseStringArray(body.skills, 'skills') ?? [],
        outcomes: typeof body.outcomes === 'string' ? body.outcomes : '',
        evidenceStrength: validateEvidenceStrength(body.evidenceStrength),
      };

      return next();
    }

    if (mode === 'update') {
      const hasUpdate = UPDATABLE_FIELDS.some((field) => body[field] !== undefined);

      if (!hasUpdate) {
        return res.status(400).json({ message: 'At least one updatable field is required' });
      }

      const validatedBody = {};

      if (body.title !== undefined) {
        if (typeof body.title !== 'string' || !body.title.trim()) {
          return res.status(400).json({ message: 'title must be a non-empty string' });
        }

        validatedBody.title = body.title.trim();
      }

      if (body.rawDescription !== undefined) {
        if (typeof body.rawDescription !== 'string') {
          return res.status(400).json({ message: 'rawDescription must be a string' });
        }

        validatedBody.rawDescription = body.rawDescription;
      }

      if (body.polishedSummary !== undefined) {
        if (typeof body.polishedSummary !== 'string') {
          return res.status(400).json({ message: 'polishedSummary must be a string' });
        }

        validatedBody.polishedSummary = body.polishedSummary;
      }

      if (body.technologies !== undefined) {
        validatedBody.technologies = parseStringArray(body.technologies, 'technologies');
      }

      if (body.skills !== undefined) {
        validatedBody.skills = parseStringArray(body.skills, 'skills');
      }

      if (body.outcomes !== undefined) {
        if (typeof body.outcomes !== 'string') {
          return res.status(400).json({ message: 'outcomes must be a string' });
        }

        validatedBody.outcomes = body.outcomes;
      }

      if (body.evidenceStrength !== undefined) {
        validatedBody.evidenceStrength = validateEvidenceStrength(body.evidenceStrength);
      }

      req.validatedBody = validatedBody;
      return next();
    }

    return res.status(500).json({ message: 'Invalid activity validation mode' });
  } catch (error) {
    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      message: error.message || 'Activity validation error',
    });
  }
};

module.exports = validateActivityBody;
