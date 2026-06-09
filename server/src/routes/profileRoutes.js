// server/src/routes/profileRoutes.js

const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

router.get('/', profileController.getProfile);
router.put('/', profileController.updateProfile);
router.put('/core-context', profileController.updateCoreContext);
router.put('/core-resume', profileController.updateCoreResume);

module.exports = router;