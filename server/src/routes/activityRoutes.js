// server/src/routes/activityRoutes.js

const express = require('express');
const activityController = require('../controllers/activityController');

const router = express.Router();

router.get('/:activityId', activityController.getActivityById);
router.put('/:activityId', activityController.updateActivity);
router.delete('/:activityId', activityController.deleteActivity);
router.post('/:activityId/polish', activityController.polishActivity);

module.exports = router;