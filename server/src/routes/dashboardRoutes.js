// server/src/routes/dashboardRoutes.js

const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authenticateWithJwt = require('../middleware/auth/authenticateWithJwt');

const router = express.Router();

router.get('/', authenticateWithJwt, dashboardController.getDashboard);

module.exports = router;
