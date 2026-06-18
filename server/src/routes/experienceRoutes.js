// server/src/routes/experienceRoutes.js

const express = require('express');
const experienceController = require('../controllers/experienceController');
const authenticateWithJwt = require('../middleware/auth/authenticateWithJwt');
const mediaTypeValidator = require('../middleware/mediaTypeValidator');
const validateObjectIdParam = require('../middleware/validateObjectIdParam');
const loadOwnedExperience = require('../middleware/evidence/loadOwnedExperience');
const validateExperienceBody = require('../middleware/evidence/validateExperienceBody');
const validateActivityBody = require('../middleware/evidence/validateActivityBody');

const router = express.Router();

router.use(authenticateWithJwt);

router.get('/', experienceController.listExperiences);
router.post(
  '/',
  mediaTypeValidator,
  validateExperienceBody('create'),
  experienceController.createExperience
);

router.get(
  '/:experienceId/workspace',
  validateObjectIdParam('experienceId', 'experience ID'),
  loadOwnedExperience,
  experienceController.getExperienceWorkspace
);
router.get(
  '/:experienceId/activities',
  validateObjectIdParam('experienceId', 'experience ID'),
  loadOwnedExperience,
  experienceController.listActivitiesForExperience
);
router.post(
  '/:experienceId/activities',
  validateObjectIdParam('experienceId', 'experience ID'),
  loadOwnedExperience,
  mediaTypeValidator,
  validateActivityBody('create'),
  experienceController.createActivityForExperience
);
router.post(
  '/:experienceId/polish',
  validateObjectIdParam('experienceId', 'experience ID'),
  loadOwnedExperience,
  mediaTypeValidator,
  experienceController.polishExperience
);

router.get(
  '/:experienceId',
  validateObjectIdParam('experienceId', 'experience ID'),
  loadOwnedExperience,
  experienceController.getExperienceById
);
router.put(
  '/:experienceId',
  validateObjectIdParam('experienceId', 'experience ID'),
  loadOwnedExperience,
  mediaTypeValidator,
  validateExperienceBody('update'),
  experienceController.updateExperience
);
router.delete(
  '/:experienceId',
  validateObjectIdParam('experienceId', 'experience ID'),
  loadOwnedExperience,
  experienceController.deleteExperience
);

module.exports = router;
