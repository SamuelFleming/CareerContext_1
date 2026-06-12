// server/src/routes/profileRoutes.js

const express = require('express');
const profileController = require('../controllers/profileController');
const authenticateWithJwt = require('../middleware/auth/authenticateWithJwt');
const mediaTypeValidator = require('../middleware/mediaTypeValidator');

const router = express.Router();

router.use(authenticateWithJwt);

router.get('/', profileController.getProfile);
router.put('/', mediaTypeValidator, profileController.updateProfile);
router.put('/core-context', mediaTypeValidator, profileController.updateCoreContext);
router.put('/core-resume', mediaTypeValidator, profileController.updateCoreResume);

module.exports = router;
