// server/src/routes/activityRoutes.js

const express = require('express');
const activityController = require('../controllers/activityController');
const authenticateWithJwt = require('../middleware/auth/authenticateWithJwt');
const mediaTypeValidator = require('../middleware/mediaTypeValidator');
const validateObjectIdParam = require('../middleware/validateObjectIdParam');
const loadOwnedActivity = require('../middleware/evidence/loadOwnedActivity');
const validateActivityBody = require('../middleware/evidence/validateActivityBody');

const router = express.Router();

router.use(authenticateWithJwt);

router.get(
  '/:activityId',
  validateObjectIdParam('activityId', 'activity ID'),
  loadOwnedActivity,
  activityController.getActivityById
);
router.put(
  '/:activityId',
  validateObjectIdParam('activityId', 'activity ID'),
  loadOwnedActivity,
  mediaTypeValidator,
  validateActivityBody('update'),
  activityController.updateActivity
);
router.delete(
  '/:activityId',
  validateObjectIdParam('activityId', 'activity ID'),
  loadOwnedActivity,
  activityController.deleteActivity
);
router.post(
  '/:activityId/polish',
  validateObjectIdParam('activityId', 'activity ID'),
  loadOwnedActivity,
  mediaTypeValidator,
  activityController.polishActivity
);

module.exports = router;
