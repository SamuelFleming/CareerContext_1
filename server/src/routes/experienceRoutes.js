// server/src/routes/experienceRoutes.js

const express = require('express');
const experienceController = require('../controllers/experienceController');
const authenticateWithJwt = require('../middleware/auth/authenticateWithJwt');
const mediaTypeValidator = require('../middleware/mediaTypeValidator');

const router = express.Router();

router.use(authenticateWithJwt);

router.get('/', experienceController.listExperiences);
router.post('/', mediaTypeValidator, experienceController.createExperience);

router.get('/:experienceId/workspace', experienceController.getExperienceWorkspace);
router.get('/:experienceId/activities', experienceController.listActivitiesForExperience);
router.post(
  '/:experienceId/activities',
  mediaTypeValidator,
  experienceController.createActivityForExperience
);
router.post('/:experienceId/polish', mediaTypeValidator, experienceController.polishExperience);

router.get('/:experienceId', experienceController.getExperienceById);
router.put('/:experienceId', mediaTypeValidator, experienceController.updateExperience);
router.delete('/:experienceId', experienceController.deleteExperience);

module.exports = router;
