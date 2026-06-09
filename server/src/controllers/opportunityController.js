// server/src/controllers/opportunityController.js

const { notImplemented } = require('../utils/notImplemented');

const listOpportunities = notImplemented(
  'GET /api/opportunities',
  'List saved opportunities, optionally filtered by status, search, ids, or limit'
);

const createOpportunity = notImplemented(
  'POST /api/opportunities',
  'Create a new saved opportunity'
);

const compareOpportunities = notImplemented(
  'POST /api/opportunities/compare',
  'Compare selected opportunities using career context and available evaluations'
);

const getOpportunityById = notImplemented(
  'GET /api/opportunities/:opportunityId',
  'Load one opportunity by id'
);

const updateOpportunity = notImplemented(
  'PUT /api/opportunities/:opportunityId',
  'Update an existing opportunity'
);

const deleteOpportunity = notImplemented(
  'DELETE /api/opportunities/:opportunityId',
  'Delete or archive an opportunity'
);

const getOpportunityWorkspace = notImplemented(
  'GET /api/opportunities/:opportunityId/workspace',
  'Load an opportunity workspace with documents, evaluation, and context preview'
);

const extractOpportunity = notImplemented(
  'POST /api/opportunities/:opportunityId/extract',
  'AI-extract structured role information from an opportunity'
);

const evaluateOpportunity = notImplemented(
  'POST /api/opportunities/:opportunityId/evaluate',
  'AI-evaluate opportunity fit against user career context and evidence'
);

const generateCoverLetter = notImplemented(
  'POST /api/opportunities/:opportunityId/generate-cover-letter',
  'Generate a cover letter document for an opportunity'
);

module.exports = {
  listOpportunities,
  createOpportunity,
  compareOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
  getOpportunityWorkspace,
  extractOpportunity,
  evaluateOpportunity,
  generateCoverLetter,
};