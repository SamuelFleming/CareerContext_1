// server/src/routes/experienceRoutes.js

const express = require('express');
const experienceController = require('../controllers/experienceController');

const router = express.Router();

router.get('/', experienceController.listExperiences);
router.post('/', experienceController.createExperience);

router.get('/:experienceId/workspace', experienceController.getExperienceWorkspace);
router.get('/:experienceId/activities', experienceController.listActivitiesForExperience);
router.post('/:experienceId/activities', experienceController.createActivityForExperience);
router.post('/:experienceId/polish', experienceController.polishExperience);

router.get('/:experienceId', experienceController.getExperienceById);
router.put('/:experienceId', experienceController.updateExperience);
router.delete('/:experienceId', experienceController.deleteExperience);

module.exports = router;