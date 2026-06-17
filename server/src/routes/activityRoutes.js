// server/src/routes/activityRoutes.js

const express = require('express');
const activityController = require('../controllers/activityController');
const authenticateWithJwt = require('../middleware/auth/authenticateWithJwt');
const mediaTypeValidator = require('../middleware/mediaTypeValidator');

const router = express.Router();

router.use(authenticateWithJwt);

router.get('/:activityId', activityController.getActivityById);
router.put('/:activityId', mediaTypeValidator, activityController.updateActivity);
router.delete('/:activityId', activityController.deleteActivity);
router.post('/:activityId/polish', mediaTypeValidator, activityController.polishActivity);

module.exports = router;
