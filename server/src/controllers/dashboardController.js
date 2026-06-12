// server/src/controllers/dashboardController.js

const dashboardService = require('../services/dashboardService');

const handleDashboardError = (res, error) => {
  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    message: error.message || 'Dashboard error',
  });
};

const getDashboard = async (req, res) => {
  try {
    const data = await dashboardService.getDashboard(req.user.userId);

    return res.status(200).json({ data });
  } catch (error) {
    return handleDashboardError(res, error);
  }
};

module.exports = {
  getDashboard,
};
