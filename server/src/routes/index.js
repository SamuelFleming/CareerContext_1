// server/src/routes/index.js

const express = require("express");

const authRoutes = require('./authRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const profileRoutes = require('./profileRoutes');
const experienceRoutes = require('./experienceRoutes');
const activityRoutes = require('./activityRoutes');
//const journalRoutes = require('./journalRoutes');
const opportunityRoutes = require('./opportunityRoutes');
const documentRoutes = require('./documentRoutes');
//const aiRunRoutes = require('./aiRunRoutes');

const router = express.Router();

const getAPI = async (req, res) => {
    res.status(200).json({ message: "CareerContext API running" });
};


router.get("/", getAPI);

//Health Check
router.get('/health', (req, res) => {
  res.json({
    message: 'CareerContext API health check',
    status: 'ok',
    service: "careerContext-api"
  });
});

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/profile', profileRoutes);
router.use('/experiences', experienceRoutes);
router.use('/activities', activityRoutes);
//router.use('/journal', journalRoutes);
router.use('/opportunities', opportunityRoutes);
router.use('/documents', documentRoutes);
//router.use('/ai-runs', aiRunRoutes);

module.exports = router;