// server/src/routes/opportuniutyRoutes.js

const express = require('express');
const opportunityController = require('../controllers/opportunityController');

const router = express.Router();

router.get('/', opportunityController.listOpportunities);
router.post('/', opportunityController.createOpportunity);

// Keep this before /:opportunityId so Express does not treat "compare" as an id.
router.post('/compare', opportunityController.compareOpportunities);

router.get('/:opportunityId/workspace', opportunityController.getOpportunityWorkspace);
router.post('/:opportunityId/extract', opportunityController.extractOpportunity);
router.post('/:opportunityId/evaluate', opportunityController.evaluateOpportunity);
router.post(
  '/:opportunityId/generate-cover-letter',
  opportunityController.generateCoverLetter
);

router.get('/:opportunityId', opportunityController.getOpportunityById);
router.put('/:opportunityId', opportunityController.updateOpportunity);
router.delete('/:opportunityId', opportunityController.deleteOpportunity);

module.exports = router;